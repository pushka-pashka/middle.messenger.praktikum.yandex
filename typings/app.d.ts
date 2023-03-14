import { MessageDTO } from "api/types";
import { Screens } from "utils/ScreenList";

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type Indexed<T = any> = { [key in string]: T };

  export type AppState = {
    appIsInited: boolean; //проинициализировано ли приложение
    chatsList: Nullable<ChatData[]>; //список чатов
    isCreatingChat: boolean; //режим создания чата
    newChatName: Nullable<string>; //название нового чата
    currentChatId: Nullable<number>;
    chatsData: ChatsData | Record<>;
    isLoading: boolean; //идет ли загрузка приложения
    loginFormError: Nullable<string>; //ошибка при авторизации
    screen: Nullable<Screens>; //текущий экран
    user: Nullable<User>; //текущий пользователь
    searchUsersList: User[] | [];
    checkedUsersId: Record<number, boolean>;
    errorReason: Nullable<string>;
  };

  export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string | undefined;
    phone: string;
    email: string;
    isChecked?: boolean;
  };

  export type Chat = {
    id: number;
    title: string;
    avatar: string;
    unreadCount: number;
    lastMessage: {
      user: User | null;
      time: string; //"2020-01-02T14:22:22.000Z"
      content: string | null;
    };
  };

  export type ChatsData = Record<number, Messages>;

  export type Message = {
    chatId: number;
    content: string;
    file: null;
    id: number;
    isRead: boolean;
    time: string;
    type: string;
    userId: number;
  };

  interface Messages {
    messages: Message[];
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  export type ResponseData = {} | APIError;

  export type LoginData = {
    login: string;
    password: string;
  };

  export type ChatMessageText = {
    text: string;
    chatId: number;
  };

  export type EditPassword = {
    oldPassword: string;
    newPassword: string;
  };

  export type WSMEssage = {
    content: string;
    id: number;
    time: Date;
    type: WSMEssage;
    user_id: number;
  };

  export type ChatMessages = {
    messages: MessageDTO | MessageDTO[];
    chatId: number;
  };
}
