import { chatsAPI } from "api/chatsApi";
import { Dispatch, Store } from "core/Store";
import { apiHasError } from "utils/apiHasError";
import SocketService from "./webSocketService";

export const createChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: Object
) => {
  dispatch({ isLoading: true });

  action = { title: "Первый чат" };
  const response = await chatsAPI.create(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  dispatch({
    isLoading: false,
    loginFormError: null,
    activeChat: response
  });
};

export const getChatsList = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  const response = await chatsAPI.getChats();

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  dispatch({
    isLoading: false,
    loginFormError: null,
    chatsList: response,
    activeChat: response[0].id
  });
};

export const startNewChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  { chatId, userId }
) => {
  dispatch({ isLoading: true });

  const token = await chatsAPI.getToken(chatId);

  if (apiHasError(token)) {
    dispatch({ isLoading: false, loginFormError: token.reason });
    return;
  }

  const ws = new SocketService({ chatId, userId, token: token.token });
};
