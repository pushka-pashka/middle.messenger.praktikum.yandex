import { Block } from "core";
import { createChat } from "services/chatsService";
import { withStore } from "utils/withStore";

interface IChatCreatorSubmit {
  isDisabled: boolean;
  onCreateChat: () => void;
}

class ChatCreatorSubmit extends Block<IChatCreatorSubmit> {
  static componentName = "ChatCreatorSubmit";

  constructor(props: IChatCreatorSubmit) {
    super({
      ...props,
      onCreateChat: () => this.onCreateChat()
    });
  }

  onCreateChat() {
    if (!this.props.isDisabled) {
      window.store.dispatch(createChat, {
        title: window.store.getState().chatName
      });
    }
  }

  render(): string {
    return `
      {{{Button
        size='s'
        text="Создать чат"
        disabled=isDisabled
        onClick=onCreateChat
      }}}
    `;
  }
}

const mapStateToProps: Partial<IChatCreatorSubmit> = (state: AppState) => {
  const users = state.checkedUsersId;
  const chatName = state.chatName;

  return {
    isDisabled: !(Boolean(Object.keys(users).length) && Boolean(chatName))
  };
};

const ComposedChatCreatorSubmit = withStore(ChatCreatorSubmit, mapStateToProps);

export { ComposedChatCreatorSubmit as ChatCreatorSubmit };
