import { authAPI } from "api/authApi";
import { chatsAPI } from "api/chatsApi";
import { Dispatch } from "core/Store";
import { logoutState } from "../store";
import { apiHasError } from "utils/apiHasError";
import { Screens } from "utils/ScreenList";
import { transformChats, transformUser } from "utils/transformers";
import { sortChats } from "./chatsService";
import { FormDataType } from "utils/getFormData";

export const signup = async (
  dispatch: Dispatch<AppState>,
  __state: AppState,
  action: Nullable<FormDataType>
) => {
  dispatch({ isLoading: true });

  const response = await authAPI.signUp(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, errorReason: response.reason });
    return;
  }

  const user = await authAPI.me();

  dispatch({
    user: user ? transformUser(user) : null,
    isLoading: false,
    errorReason: null,
    screen: Screens.Chats
  });
};

export const login = async (
  dispatch: Dispatch<AppState>,
  __state: AppState,
  action: LoginData
) => {
  dispatch({ isLoading: true });

  const response = await authAPI.login(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const user = await authAPI.me();

  const chatsList = await chatsAPI.getChats();

  if (chatsList) {
    dispatch({ chatsList: sortChats(transformChats(chatsList)) });

    dispatch({
      user: user ? transformUser(user) : null,
      isLoading: false,
      loginFormError: null,
      screen: Screens.Chats
    });
  }
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  await authAPI.logout();

  dispatch({ ...logoutState, screen: Screens.Login });
};
