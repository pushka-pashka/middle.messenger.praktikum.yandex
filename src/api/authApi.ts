import HTTPTransport from "utils/fetch";
import { FormDataType } from "utils/getFormData";

const authAPIInstance = new HTTPTransport();

export const authAPI = {
  signUp: async (data: Nullable<FormDataType>) => {
    const xhr: ResponseData = await authAPIInstance.post("/auth/signup", {
      data: JSON.stringify(data)
    });

    return xhr.response;
  },

  login: async (data: LoginData) => {
    const xhr: ResponseData = await authAPIInstance.post("/auth/signin", {
      data: JSON.stringify(data)
    });

    return xhr.response;
  },

  me: async () => {
    const xhr: ResponseData = await authAPIInstance.get("/auth/user");

    return xhr.response;
  },

  logout: async () => {
    const xhr: ResponseData = await authAPIInstance.post("/auth/logout");

    return xhr.response;
  }
};
