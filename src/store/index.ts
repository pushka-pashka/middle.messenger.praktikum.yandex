export const defaultState: AppState = {
  appIsInited: false,
  isLoading: false,

  chatsList: null,
  isCreatingChat: false,
  currentChatId: null,
  chatName: "",
  chatsData: {},

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

  chatsData: {},

  loginFormError: null,
  user: null,
  searchUsersList: [],
  checkedUsersId: {},
  errorReason: null
};
