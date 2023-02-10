import { chatsAPI } from "api/chatsApi";
import { Dispatch } from "core/Store";
import { apiHasError } from "utils/apiHasError";
import { createWebSocketConnection } from "./webSocketService";

export let webSocketsConnection = null;

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

export const startNewChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  { chatId, userId }
) => {
  dispatch({ currentChatId: chatId });

  const token = await chatsAPI.getToken(chatId);

  if (apiHasError(token)) {
    dispatch({ isLoading: false, loginFormError: token.reason });
    return;
  }

  webSocketsConnection = createWebSocketConnection({ userId, chatId, token });
};

export const sendMessage = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  { text }
) => {
  if (!webSocketsConnection) {
    webSocketsConnection = createWebSocketConnection({ userId, chatId, token });
  } else if (!webSocketsConnection.isOpen()) {
    console.log("соединение не установлено");
    return;
  }

  webSocketsConnection.sendMessage(text);
};

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
