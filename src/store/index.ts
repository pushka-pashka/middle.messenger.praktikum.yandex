export const defaultState: AppState = {
  appIsInited: false,
  isLoading: false,

  chatsList: null,
  isCreatingChat: false,
  currentChatId: null,
  chatName: "",
  chatData: [],

  loginFormError: null,
  screen: null,
  user: null,
  searchUsersList: [],
  checkedUsersId: {},
  errorReason: null
};

export const logoutState: Partial<AppState> = {
  appIsInited: true,
  isLoading: false,

  chatsList: null,
  isCreatingChat: false,
  currentChatId: null,
  chatName: "",
  chatData: [],

  loginFormError: null,
  user: null,
  searchUsersList: [],
  checkedUsersId: {},
  errorReason: null
};
