import HTTPTransport from "utils/fetch";

const usersAPIInstance = new HTTPTransport();

export const usersAPI = {
  search: async (data) => {
    const xhr = await usersAPIInstance.post("/user/search", {
      data: JSON.stringify(data)
    });

    return xhr.response;
  }
};
