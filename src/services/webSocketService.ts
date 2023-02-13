//'wss://ya-praktikum.tech/ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>'
const wsHost = process.env.WS_ENDPOINT;

interface ISocketProps {
  userId: number;
  chatId: number;
  token: string;
}

class SocketService {
  protected socket: WebSocket;

  constructor(props: ISocketProps) {
    const { userId, chatId, token } = props;

    const wsPath = `${wsHost}/${userId}/${chatId}/${token}`;
    this.socket = new WebSocket(wsPath);

    this.initWebSocket(this.socket);
  }

  initWebSocket(socket: WebSocket) {
    socket.addEventListener("open", () => {
      console.log("WS cоединение установлено");
    });

    socket.addEventListener("close", (event) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения");
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener("message", (event: MessageEvent) => {
      const chatData = [...window.store.getState().chatData];
      const eventData = JSON.parse(event.data);

      if (Array.isArray(eventData)) {
        window.store.dispatch({ chatData: [...chatData, ...eventData] });
      } else if (eventData.type === "message") {
        chatData.push(eventData);

        window.store.dispatch({ chatData });
      }
    });

    socket.addEventListener("error", (event) => {
      console.log("Ошибка", event.message);
    });
  }

  public sendMessage(text: string) {
    this.socket.send(
      JSON.stringify({
        content: text,
        type: "message"
      })
    );
  }

  public isOpen() {
    return this.socket.readyState === this.socket.OPEN;
  }

  public getOldMessages() {
    this.socket.send(
      JSON.stringify({
        content: 0,
        type: "get old"
      })
    );
  }
}

export const createWebSocketConnection = ({ userId, chatId, token }) =>
  new SocketService({
    chatId,
    userId,
    token: token.token
  });

export default SocketService;
