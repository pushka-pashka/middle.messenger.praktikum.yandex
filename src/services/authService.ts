import { authAPI } from "api/authApi";
import { chatsAPI } from "api/chatsApi";
import { Dispatch } from "core/Store";
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
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const user = await authAPI.me();

  //TODO: вызвать здесь трансформер для юзера
  dispatch({
    user,
    isLoading: false,
    loginFormError: null,
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
  // const activeChat = getActiveChat(state);

  //TODO: вызвать здесь трансформер для юзера
  dispatch({
    user,
    activeChat: chatsList?.[0].id,
    isLoading: false,
    loginFormError: null,
    screen: Screens.Chats
  });
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  await authAPI.logout();

  dispatch({ isLoading: false, user: null, screen: Screens.Login });
};
