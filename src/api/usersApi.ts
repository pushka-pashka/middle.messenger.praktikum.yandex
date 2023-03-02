import HTTPTransport from "utils/fetch";

const usersAPIInstance = new HTTPTransport();

export const usersAPI = {
  search: async (data) => {
    const xhr = await usersAPIInstance.post("/user/search", {
      data: JSON.stringify(data)
    });

    return xhr.response;
  },

  changeProfile: async (data) => {
    const xhr = await usersAPIInstance.put("/user/profile", {
      data: JSON.stringify(data)
    });

    return xhr.response;
  },

  changePassword: async (data) => {
    const xhr = await usersAPIInstance.put("/user/password", {
      data: JSON.stringify(data)
    });

    return xhr.response;
  }
};
