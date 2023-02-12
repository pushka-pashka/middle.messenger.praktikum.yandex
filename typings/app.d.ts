import { Screens } from "utils/ScreenList";

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type AppState = {
    appIsInited: boolean; //проинициализировано ли приложение
    chatsList: Nullable<ChatsList>; //список чатов
    isCreatingChat: boolean; // режим создания чатов
    currentChatId: Nullable<number>;
    chatName: Nullable<string>;
    chatData: Array;
    isLoading: boolean; //идет ли загрузка приложения
    loginFormError: Nullable<string>; //ошибка при авторизации
    screen: Nullable<Screens>; //текущий экран
    user: Nullable<User>; //текущий пользователь
    searchUsersList: Nullable<User[]>;
    checkedUsersId: Object<number>;
    errorReason: Nullable<string>;
  };

  export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
    isChecked?: boolean;
  };
}

export {};
