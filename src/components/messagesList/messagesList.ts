import { Block } from "core";
import { withStore } from "utils/withStore";

interface IMessagesListProps {
  chatData: IChatData[];
  myUserId: number;
}

interface IChatData {
  user_id: number;
  chat_id: number;
  content: string;
  time: string;
}

class MessagesList extends Block {
  static componentName = "MessagesList";

  constructor(props: IMessagesListProps) {
    super(props);
  }

  componentDidMount(): boolean {
    super.componentDidMount();
    this.scrollToLastMessage();
  }

  componentDidUpdate(): boolean {
    super.componentDidUpdate();
    this.scrollToLastMessage();
  }

  scrollToLastMessage(): boolean {
    const el = document.getElementById("message-list");
    el?.scrollIntoView(false);

    return true;
  }

  render(): string {
    const myUserId = this.getProps().myUserId;
    return `
      <div class="messages-list" id="message-list">
        {{#each chatData}}
          {{{Message myUserId=${myUserId} userId=this.user_id time=this.time content=this.content}}}
        {{/each}}s
      </div>`;
  }
}

const mapStateToProps: Partial<IMessagesListProps> = (state: AppState) => {
  return {
    myUserId: state.user.id,
    chatData: state.chatData
  };
};

const ComposedMessagesList = withStore(MessagesList, mapStateToProps);

export { ComposedMessagesList as MessagesList };
