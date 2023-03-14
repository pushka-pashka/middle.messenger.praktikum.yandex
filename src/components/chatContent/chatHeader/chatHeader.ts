import { Block } from "core";
import { withStore } from "utils/withStore";
import "./chatHeader.css";

interface IChatHeaderProps {
  chatName: () => string;
}

class ChatHeader extends Block<IChatHeaderProps> {
  static componentName = "ChatHeader";

  constructor(props: IChatHeaderProps) {
    super(props);
  }

  protected render(): string {
    const chatName = this.props.chatName() || "Название чата";

    return `
      <div class="chat-content__header">
        {{{IconUser size='s'}}}
        <div class="chat-header__about">
          <div class="chat-header__about-name">${chatName}</div>
        </div>
      </div>`;
  }
}

const mapStateToProps = (state: AppState): Partial<IChatHeaderProps> => {
  return {
    chatName: () => {
      const chatId = state.currentChatId;
      const chatsList = state.chatsList;

      if (chatsList && chatsList.length && chatId) {
        const chat = chatsList.find((item) => item.id === chatId);

        if (chat) {
          return chat.title;
        }
      }

      return null;
    }
  };
};

const ComposedChatHeader = withStore(ChatHeader, mapStateToProps);

export { ComposedChatHeader as ChatHeader };
