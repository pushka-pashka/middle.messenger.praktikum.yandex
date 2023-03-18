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
        title: window.store.getState().newChatName
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

const mapStateToProps = (state: AppState): Partial<IChatCreatorSubmit> => {
  const users = state.checkedUsersId;
  const newChatName = state.newChatName;

  return {
    isDisabled: !(Boolean(Object.keys(users).length) && Boolean(newChatName))
  };
};

const ComposedChatCreatorSubmit = withStore(ChatCreatorSubmit, mapStateToProps);

export { ComposedChatCreatorSubmit as ChatCreatorSubmit };
