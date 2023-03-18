import EventBus from "core/EventBus";

class SocketService extends EventBus {
  static EVENTS = {
    OPEN: "ws:open",
    CONNECTED: "ws:connected",
    MESSAGE: "ws:message",
    GET_MESSAGE: "ws:get-message",
    ERROR: "ws:error",
    CLOSE: "ws:close"
  } as const;

  protected socket: Nullable<WebSocket> = null;

  constructor(private wsURL: string) {
    super();

    this.connectWS();
  }

  private connectWS() {
    this.socket = new WebSocket(this.wsURL);

    this.registerEvents();

    this.registerWSEvents(this.socket);
  }

  private registerEvents() {
    this.on(SocketService.EVENTS.CONNECTED, () => this.loadChat());

    this.on(SocketService.EVENTS.ERROR, (event) => {
      // eslint-disable-next-line no-console
      console.log("Ошибка", event.message);
    });
  }

  private registerWSEvents(socket: WebSocket) {
    socket.onopen = () => {
      this.emit(SocketService.EVENTS.CONNECTED);
    };

    socket.onmessage = (message: MessageEvent) => {
      const data = JSON.parse(message.data);

      if (data.type && data.type === "pong") {
        return;
      }

      this.emit(SocketService.EVENTS.GET_MESSAGE, data);
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        // eslint-disable-next-line no-console
        console.log("Соединение закрыто чисто");
      } else {
        // eslint-disable-next-line no-console
        console.log("Обрыв соединения");
      }
      // eslint-disable-next-line no-console
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);

      this.emit(SocketService.EVENTS.CLOSE);
    };

    socket.onerror = (event) => {
      this.emit(SocketService.EVENTS.ERROR, event);
    };
  }

  public close(code?: number, reason?: string) {
    this.socket?.close(code, reason);
  }

  private loadChat() {
    // eslint-disable-next-line no-console
    console.log("Соединение установлено");

    this.ping();
    this.getOldMessages();
  }

  private ping() {
    let pingInterval: NodeJS.Timer | undefined = setInterval(() => {
      if (!this.socket) {
        return;
      }

      this.socket.send(
        JSON.stringify({
          content: "",
          type: "ping"
        })
      );
    }, 15000);

    this.on(SocketService.EVENTS.CLOSE, () => {
      clearInterval(pingInterval);

      pingInterval = undefined;
    });
  }

  private getOldMessages(from = 0) {
    if (!this.socket) {
      return;
    }

    this.socket.send(
      JSON.stringify({
        content: from,
        type: "get old"
      })
    );
  }

  public sendMessage(text: string) {
    if (!this.socket) {
      throw new Error("WS соединение не установлено");
    }

    this.socket.send(
      JSON.stringify({
        content: text,
        type: "message"
      })
    );
  }

  public getSocket() {
    if (!this.socket) {
      return;
    }

    if (this.socket.readyState === this.socket.CLOSED) {
      this.connectWS();
    }

    if (this.socket.readyState === this.socket.CONNECTING) {
      return new Promise<SocketService>((resolve) => {
        this.on(SocketService.EVENTS.OPEN, () => resolve(this));
      });
    }

    return this;
  }
}

export default SocketService;
