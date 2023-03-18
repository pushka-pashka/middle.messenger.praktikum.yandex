import { UserDTO } from "api/types";
import { usersAPI } from "api/usersApi";
import { Dispatch } from "core/Store";
import { apiHasError } from "utils/apiHasError";
import { transformProfile, transformUser } from "utils/transformers";
import { Screens } from "utils/ScreenList";
import { FormDataType } from "utils/getFormData";
import { merge } from "utils/merge";

export const searchUsers = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: string
) => {
  dispatch({ isLoading: true });

  const rawUsersList = await usersAPI.search(action);

  if (apiHasError(rawUsersList)) {
    dispatch({ isLoading: false, loginFormError: rawUsersList.reason });
    return;
  }

  const usersList: User[] = rawUsersList.map((user: UserDTO) => {
    const userData = transformUser(user);
    const newUser = {
      id: userData.id,
      login: userData.login,
      firstName: userData.firstName,
      secondName: userData.secondName,
      isChecked: window.store.getState().checkedUsersId[userData.id]
    };

    return newUser;
  });

  dispatch({ isLoading: false, searchUsersList: usersList });
};

export const editProfile = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: Partial<UserDTO>
) => {
  dispatch({ isLoading: true });

  if (!action) {
    return;
  }

  const editProfileData: Partial<UserDTO> = {
    ...action,
    display_name: action.login
  };
  const response = await usersAPI.changeProfile(editProfileData);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, errorReason: response.reason });
    return;
  }

  const currentUser = window.store.getState().user;
  const transformEditProfileData = transformProfile(editProfileData);
  const changedUser = merge(
    currentUser || {},
    transformEditProfileData
  ) as User;

  dispatch({
    user: changedUser,
    isLoading: false,
    errorReason: null,
    screen: Screens.Profile
  });
};

export const editPassword = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: Nullable<FormDataType>
) => {
  dispatch({ isLoading: true });

  if (!action) {
    return;
  }

  const editPassword = {
    oldPassword: action.password,
    newPassword: action.new_password
  };

  const response = await usersAPI.changePassword(editPassword);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, errorReason: response.reason });
    return;
  }

  dispatch({
    isLoading: false,
    errorReason: null,
    screen: Screens.Profile
  });
};
