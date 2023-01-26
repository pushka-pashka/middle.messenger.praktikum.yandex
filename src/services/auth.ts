import { Dispatch } from "core/Store";
import { apiHasError } from "utils/apiHasError";
import { authAPI } from "api/authApi";

export const signUp = async (
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

  const responseUser = await authAPI.me();
  console.log("user", responseUser);
  dispatch({ user: responseUser });

  dispatch({ isLoading: false, loginFormError: null });
};

export const signin = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: Object
) => {
  action = {
    login: "pushka2",
    password: "12345"
  };

  dispatch({ isLoading: true });

  const response = await authAPI.login(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.me();
  console.log("user", responseUser);

  dispatch({ user: responseUser });

  dispatch({ isLoading: false, loginFormError: null });
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  await authAPI.logout();

  dispatch({ isLoading: false, user: null });

  window.router.go("/");
};
