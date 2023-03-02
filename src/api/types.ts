export type APIError = {
  reason: string;
};

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type ChatDTO = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: UserDTO;
    time: string; //"2020-01-02T14:22:22.000Z"
    content: string;
  } | null;
};

export type MessageDTO = {
  chat_id: number;
  content: string;
  file: null;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
};
