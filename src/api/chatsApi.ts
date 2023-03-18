import HTTPTransport from "utils/fetch";
const chatAPIInstance = new HTTPTransport();

export const chatsAPI = {
  //создать новый чат
  create: async (data: string) => {
    const xhr: ResponseData = await chatAPIInstance.post("/chats", {
      data: JSON.stringify(data)
    });

    return xhr.response;
  },

  //получить список чатов
  getChats: async () => {
    const xhr: ResponseData = await chatAPIInstance.get("/chats");

    return xhr.response;
  },

  getChatUsers: async (id: number) => {
    const xhr: ResponseData = await chatAPIInstance.get(`/chats/${id}/users`);

    return xhr.response;
  },

  getToken: async (id: number) => {
    const xhr: ResponseData = await chatAPIInstance.post(`/chats/token/${id}`);

    return xhr.response;
  },

  addUsers: async (users: string[], chatId: number) => {
    const xhr: ResponseData = await chatAPIInstance.put("/chats/users", {
      data: JSON.stringify({
        users,
        chatId
      })
    });

    return xhr.response;
  },

  getNewMessagesCount: async (id: number) => {
    const xhr: ResponseData = await chatAPIInstance.get(`/chats/new/${id}`);

    return xhr.response;
  }
};
