import HTTPTransport from "utils/fetch";
import { UserDTO } from "./types";

const usersAPIInstance = new HTTPTransport();

export const usersAPI = {
  search: async (data: string) => {
    const xhr: ResponseData = await usersAPIInstance.post("/user/search", {
      data: JSON.stringify(data)
    });

    return xhr.response;
  },

  changeProfile: async (data: Partial<UserDTO>) => {
    const xhr: ResponseData = await usersAPIInstance.put("/user/profile", {
      data: JSON.stringify(data)
    });

    return xhr.response;
  },

  changePassword: async (data: EditPassword) => {
    const xhr: ResponseData = await usersAPIInstance.put("/user/password", {
      data: JSON.stringify(data)
    });

    return xhr.response;
  }
};
