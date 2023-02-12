import { authAPI } from "api/authApi";
import { chatsAPI } from "api/chatsApi";
import { Dispatch } from "core/Store";
import { logoutState } from "../store";
import { apiHasError } from "utils/apiHasError";
import { Screens } from "utils/ScreenList";

export const signup = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: Object
) => {
  dispatch({ isLoading: true });

  const response = await authAPI.signUp(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, errorReason: response.reason });
    return;
  }

  const user = await authAPI.me();

  //TODO: вызвать здесь трансформер для юзера
  dispatch({
    user,
    isLoading: false,
    errorReason: null,
    screen: Screens.Chats
  });
};

export const login = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: Object
) => {
  dispatch({ isLoading: true });

  const response = await authAPI.login(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const user = await authAPI.me();

  const chatsList = await chatsAPI.getChats();

  dispatch({ chatsList });

  const currentChatId = chatsList[0]?.id || null;

  if (currentChatId) {
    dispatch({ currentChatId });
  }

  //TODO: вызвать здесь трансформер для юзера
  dispatch({
    user,
    isLoading: false,
    loginFormError: null,
    screen: Screens.Chats
  });
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  await authAPI.logout();

  dispatch({ ...logoutState, screen: Screens.Login });
};
