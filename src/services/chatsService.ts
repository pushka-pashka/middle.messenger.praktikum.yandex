import { chatsAPI } from "api/chatsApi";
import { Dispatch } from "core/Store";
import { apiHasError } from "utils/apiHasError";
import { cloneDeep } from "utils/cloneDeep";
import set from "utils/set";
import {
  transformChats,
  transformMessage,
  transformMessages
} from "utils/transformers";
import { getWebSocket } from "./getWebSocket";
import { sortMessages } from "./messageService";

export const selectChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  chatId
) => {
  dispatch({ isCreatingChat: false, currentChatId: chatId });

  await getWebSocket(chatId);
};

export const sendMessage = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  { text, chatId }
) => {
  const ws = await getWebSocket(chatId);

  if (!ws) {
    return;
  }

  ws.sendMessage(text);
};

export const addMessagesToChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  { messages, chatId }
) => {
  const chatsData = cloneDeep(window.store.getState().chatsData);
  const chatData = chatsData[chatId] || [];

  //TODO: вызывать Transformmessages
  let messagesToAdd;

  if (Array.isArray(messages)) {
    messagesToAdd = transformMessages(messages);

    if (chatData.length) {
      messagesToAdd = messages.filter((item) => !chatData.includes(item));
    }
  } else if (messages.type === "message") {
    messagesToAdd = [transformMessage(messages)];
  } else {
    return;
  }

  chatData.push(...messagesToAdd);

  const chatMessages = set(
    { chatsData: {} },
    `chatsData.${chatId}`,
    sortMessages(chatData)
  );

  dispatch({ ...chatMessages });
};

//сортировка чатов по дате самого свежего сообщения
export const sortChats = (chats: Chat[]) => {
  return chats.sort(
    (a, b) => new Date(b.lastMessage.time) - new Date(a.lastMessage.time)
  );
};

// создание нового чата с добавлением пользователей
export const createChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  chatName: Object
) => {
  dispatch({ isLoading: true });

  const newChatResponse = await chatsAPI.create(chatName);

  if (apiHasError(newChatResponse)) {
    dispatch({ isLoading: false, errorReason: newChatResponse.reason });
    return;
  }

  dispatch(getChatsList);

  const usersIds = window.store.getState().checkedUsersId;

  const addUsersResponse = await chatsAPI.addUsers(
    Object.keys(usersIds),
    newChatResponse.id
  );

  if (apiHasError(addUsersResponse)) {
    dispatch({ isLoading: false, errorReason: addUsersResponse.reason });
    return;
  }

  dispatch({
    newChatName: "",
    searchUsersList: [],
    checkedUsersId: {}
  });

  dispatch(selectChat, newChatResponse.id);
};

export const getChatsList = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  const response = await chatsAPI.getChats();

  if (apiHasError(response)) {
    dispatch({ isLoading: false, errorReason: response.reason });
    return;
  }

  dispatch({
    isLoading: false,
    errorReason: null,
    chatsList: sortChats(transformChats(response))
  });
};

export const toogleUser = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  { userId }
) => {
  const checkedUsersId = cloneDeep(window.store.getState().checkedUsersId);
  const searchUsersList: User[] = cloneDeep(
    window.store.getState().searchUsersList
  );

  if (searchUsersList) {
    const user = searchUsersList.find((user: User) => user.id === userId);

    if (user) {
      if (!checkedUsersId[userId]) {
        checkedUsersId[userId] = true;
        user.isChecked = true;
      } else {
        checkedUsersId[userId] = false;
        user.isChecked = false;
      }
      dispatch({ checkedUsersId, searchUsersList });
    }
  } else {
    return;
  }
};
