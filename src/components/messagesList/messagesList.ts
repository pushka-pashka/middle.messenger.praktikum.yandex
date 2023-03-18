import { Block } from "core";
import { withStore } from "utils/withStore";

interface IMessagesListProps {
  chatData: IChatData[];
  myUserId: number | null;
}

interface IChatData {
  user_id: number;
  chat_id: number;
  content: string;
  time: string;
}

class MessagesList extends Block<IMessagesListProps> {
  static componentName = "MessagesList";

  constructor(props: IMessagesListProps) {
    super(props);
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.scrollToLastMessage();
    }, 10);

    return true;
  }

  scrollToLastMessage(): void {
    const el = document.getElementById("message-list")?.lastElementChild;
    el?.scrollIntoView(false);
  }

  render(): string {
    const myUserId = this.getProps().myUserId;

    if (!myUserId) {
      return "";
    }

    return `
      <div class="messages-list" id="message-list">
        {{#each chatData}}
          {{{Message myUserId=${myUserId} userId=this.userId time=this.time content=this.content}}}
        {{/each}}
      </div>`;
  }
}

const mapStateToProps = (state: AppState): Partial<IMessagesListProps> => {
  return {
    myUserId: state.user ? state.user.id : null,
    chatData: state.currentChatId
      ? state.chatsData[state.currentChatId]?.messages
      : []
  };
};

const ComposedMessagesList = withStore(MessagesList, mapStateToProps);

export { ComposedMessagesList as MessagesList };
