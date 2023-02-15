import EventBus from "core/EventBus";

interface SocketProps {
  userId: number;
  chatId: number;
  token: string;
}

class SocketService extends EventBus {
  static EVENTS = {
    OPEN: "ws:open",
    CONNECTED: "ws:connected",
    MESSAGE: "ws:message",
    ERROR: "ws:error",
    CLOSE: "ws:close"
  } as const;

  //'wss://ya-praktikum.tech/ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>'
  protected WS_URL = process.env.WS_ENDPOINT;

  protected socket: WebSocket;

  constructor(props: SocketProps) {
    super();

    const { userId, chatId, token } = props;
    const wsPath = `${this.WS_URL}/${userId}/${chatId}/${token}`;

    this.socket = new WebSocket(wsPath);

    this.registerEvents();

    this.setWSEvents(this.socket);
  }

  private registerEvents() {
    this.on(SocketService.EVENTS.CONNECTED, () => this.loadChat());
  }

  private setWSEvents(socket: WebSocket) {
    socket.onopen = () => {
      this.emit(SocketService.EVENTS.CONNECTED);
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения");
      }
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);

      this.emit(SocketService.EVENTS.CLOSE);
    };

    socket.onmessage = (message: MessageEvent) => {
      const data = JSON.parse(message.data);

      if (data.type && data.type === "pong") {
        return;
      }

      const chatData = [...window.store.getState().chatData];

      if (Array.isArray(data)) {
        window.store.dispatch({ chatData: [...chatData, ...data] });
      } else if (data.type === "message") {
        chatData.push(data);

        window.store.dispatch({ chatData });
      }
    };

    socket.onerror = (event) => {
      console.log("Ошибка", event.message);

      this.emit(SocketService.EVENTS.ERROR, event);
    };
  }

  private loadChat() {
    console.log("Соединение установлено");
    // this._autoPing();
    this.getOldMessages();
    // this.getPing();
  }

  private getOldMessages() {
    this.socket.send(
      JSON.stringify({
        content: 0,
        type: "get old"
      })
    );
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
}

export default SocketService;
