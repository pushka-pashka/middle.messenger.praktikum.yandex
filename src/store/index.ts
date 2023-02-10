export const defaultState: AppState = {
  appIsInited: false,
  isLoading: false,

  chatsList: null,
  isCreatingChat: false,
  currentChatId: null,
  chatName: "",

  loginFormError: null,
  screen: null,
  user: null,
  searchUsersList: [],
  checkedUsersId: {},
  errorReason: null
};
