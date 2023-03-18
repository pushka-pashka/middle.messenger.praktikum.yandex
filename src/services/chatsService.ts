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
  _state: AppState,
  chatId: number
) => {
  dispatch({ isCreatingChat: false, currentChatId: chatId });

  await getWebSocket(chatId);
};

export const sendMessage = async (
  _dispatch: Dispatch<AppState>,
  _state: AppState,
  { text, chatId }: ChatMessageText
) => {
  const ws = await getWebSocket(chatId);

  if (!ws) {
    return;
  }

  ws.sendMessage(text);
};

export const addMessagesToChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  { messages, chatId }: ChatMessages
) => {
  const chatsData = cloneDeep(window.store.getState().chatsData);
  const chatData = chatsData[chatId]?.messages || [];

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
    `chatsData.${chatId}.messages`,
    sortMessages(chatData)
  );

  dispatch({ ...(chatMessages as Indexed) });
};

//сортировка чатов по дате самого свежего сообщения
export const sortChats = (chats: Chat[]) => {
  return chats?.sort(
    (a, b) => +new Date(b.lastMessage.time) - +new Date(a.lastMessage.time)
  );
};

// создание нового чата с добавлением пользователей
export const createChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  chatName: string
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
  _state: AppState,
  userId: number
) => {
  const checkedUsersId = cloneDeep(
    window.store.getState().checkedUsersId
  ) as Record<number, boolean>;
  const searchUsersList = cloneDeep(window.store.getState().searchUsersList) as
    | User[]
    | [];

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
