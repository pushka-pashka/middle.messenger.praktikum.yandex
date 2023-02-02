import { Screens } from "utils/ScreenList";

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type AppState = {
    appIsInited: boolean; //проинициализировано ли приложение
    isLoading: boolean; //идет ли загрузка приложения
    loginFormError: Nullable<string>; //ошибка при авторизации
    screen: Nullable<Screens>; //текущий экран
    user: Nullable<User>; //текущий пользователь
    chatsList: Nullable<ChatsList>; //список чатов
    activeChat: null | Record<id, number>;
  };
}

export {};
