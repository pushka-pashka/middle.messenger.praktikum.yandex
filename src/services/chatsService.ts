import { chatsAPI } from "api/chatsApi";
import { Dispatch } from "core/Store";
import { apiHasError } from "utils/apiHasError";
import { createWebSocketConnection } from "./webSocketService";

export let webSocketConnection = null;

// создание нового чата с добавлением пользователей
export const createChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: Object
) => {
  dispatch({ isLoading: true });

  const newChatResponse = await chatsAPI.create(action);

  if (apiHasError(newChatResponse)) {
    dispatch({ isLoading: false, errorReason: newChatResponse.reason });
    return;
  }

  const usersIds = window.store.getState().checkedUsersId;

  const addUsersResponse = await chatsAPI.addUsers(
    Object.keys(usersIds),
    newChatResponse.id
  );

  if (apiHasError(addUsersResponse)) {
    dispatch({ isLoading: false, errorReason: addUsersResponse.reason });
    return;
  }

  dispatch(getChatsList);

  dispatch({
    chatName: "",
    searchUsersList: [],
    checkedUsersId: {},
    isCreatingChat: false
  });
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
    chatsList: response
  });
};

export const openChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  { chatId, userId }
) => {
  if (webSocketConnection && webSocketConnection.isOpen()) {
    console.log("WS соединение уже установлено");
    return;
  }
  dispatch({ currentChatId: chatId });

  const token = await chatsAPI.getToken(chatId);

  if (apiHasError(token)) {
    dispatch({ isLoading: false, errorReason: token.reason });
    return;
  }

  webSocketConnection = createWebSocketConnection({
    userId,
    chatId,
    token
  });
};

export const sendMessage = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  { text }
) => {
  //TODO: переписать - вызывать openChat
  // if (!webSocketConnection) {
  //   webSocketConnection = createWebSocketConnection({ userId, chatId, token });
  // } else if (!webSocketConnection.isOpen()) {
  //   console.log("соединение не установлено");
  //   return;
  // }

  if (!webSocketConnection || !webSocketConnection.isOpen()) {
    console.log("соединение не установлено");
    return;
  }

  webSocketConnection.sendMessage(text);
  //   console.log("соединение не установлено");
};

//TODO: проверить иммутабельность
export const toogleUser = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  { userId }: Object
) => {
  const checkedUsersId = { ...window.store.getState().checkedUsersId };
  const searchUsersList = [...window.store.getState().searchUsersList];

  const user = searchUsersList?.find((user) => user.id === userId);

  if (user) {
    if (!checkedUsersId[userId]) {
      checkedUsersId[userId] = true;
      user.isChecked = true;
    } else {
      delete checkedUsersId[userId];
      user.isChecked = false;
    }

    dispatch({ checkedUsersId, searchUsersList });
  }
};
