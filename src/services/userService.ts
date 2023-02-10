import { UserDTO } from "api/types";
import { usersAPI } from "api/usersApi";
import { apiHasError } from "utils/apiHasError";
import { transformUser } from "utils/apiTransformers";

export const searchUsers = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: Object
) => {
  dispatch({ isLoading: true });

  const rawUsersList = await usersAPI.search(action);

  if (apiHasError(rawUsersList)) {
    dispatch({ isLoading: false, loginFormError: rawUsersList.reason });
    return;
  }

  const usersList: User = rawUsersList.map((user: UserDTO) => {
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

  dispatch({ searchUsersList: usersList, isLoading: false });
};
