import { chatsAPI } from "api/chatsApi";
import { apiHasError } from "utils/apiHasError";
import { addMessagesToChat } from "./chatsService";
import SocketService from "./webSocketService";

const chatWebSockets: Record<number, SocketService> = {};

export const getWebSocket = async (chatId: number) => {
  if (!chatId) {
    return;
  }

  if (chatWebSockets[chatId]) {
    return chatWebSockets[chatId].getSocket();
  }

  const token = await chatsAPI.getToken(chatId);

  if (apiHasError(token)) {
    window.store.dispatch({ isLoading: false, errorReason: token.reason });
    return;
  }

  const userId = window.store.getState().user?.id;

  if (!userId) {
    return;
  }

  //'wss://ya-praktikum.tech/ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>'
  const wsURL = `${process.env.WS_ENDPOINT}/${userId}/${chatId}/${token.token}`;

  const webSocket = await new SocketService(wsURL);

  webSocket
    .on(SocketService.EVENTS.GET_MESSAGE, (data) => addNewMessages(data))
    .on(SocketService.EVENTS.CLOSE, () => deleteSoket());

  const addNewMessages = (messages) => {
    window.store.dispatch(addMessagesToChat, { messages, chatId });
  };

  const deleteSoket = () => {
    delete chatWebSockets[chatId];
  };

  chatWebSockets[chatId] = webSocket;

  return chatWebSockets[chatId].getSocket();
};
