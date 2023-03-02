import HTTPTransport from "utils/fetch";

const authAPIInstance = new HTTPTransport();

export const authAPI = {
  signUp: async (data) => {
    const xhr = await authAPIInstance.post("/auth/signup", {
      data: JSON.stringify(data)
    });

    return xhr.response;
  },

  login: async (data) => {
    const xhr = await authAPIInstance.post("/auth/signin", {
      data: JSON.stringify(data)
    });

    return xhr.response;
  },

  me: async () => {
    const xhr = await authAPIInstance.get("/auth/user");

    return xhr.response;
  },

  logout: async () => {
    const xhr = await authAPIInstance.post("/auth/logout");

    return xhr.response;
  }
};
