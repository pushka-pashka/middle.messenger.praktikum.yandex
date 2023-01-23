import { Screens } from "utils/ScreenList";

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type AppState = {
    appIsInited: boolean; //проинициализировано ли приложение
    screen: Nullable<Screens>; //текущий экран
    isLoading: boolean; //идет ли загрузка приложения
    loginFormError: Nullable<string>; //ошибка при авторизации
    user: Nullable<User>; //текущий пользователь
    isGreenTheme: boolean;
  };
}

export {};
