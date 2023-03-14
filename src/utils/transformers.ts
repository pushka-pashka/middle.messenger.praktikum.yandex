import { ChatDTO, MessageDTO, UserDTO } from "api/types";

export const transformUser = (data: UserDTO): User => {
  return {
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email
  };
};

export const transformProfile = (data: Partial<UserDTO>): Partial<User> => {
  return {
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    phone: data.phone,
    email: data.email
  };
};

export const transformChat = (data: ChatDTO): Chat => {
  const lastMessage = data.last_message
    ? {
        user: transformUser(data.last_message.user),
        time: data.last_message.time,
        content: data.last_message.content
      }
    : {
        user: null,
        time: new Date(0).toString(),
        content: null
      };

  return {
    id: data.id,
    title: data.title,
    avatar: data.avatar,
    unreadCount: data.unread_count,
    lastMessage
  };
};

export const transformChats = (data: ChatDTO[]): Chat[] => {
  return data.map((chat) => transformChat(chat));
};

export const transformMessage = (data: MessageDTO): Message => {
  return {
    chatId: data.chat_id,
    content: data.content,
    file: data.file,
    id: data.id,
    isRead: data.is_read,
    time: data.time,
    type: data.type,
    userId: data.user_id
  };
};

export const transformMessages = (data: MessageDTO[]): Message[] => {
  return data.map((message) => transformMessage(message));
};
