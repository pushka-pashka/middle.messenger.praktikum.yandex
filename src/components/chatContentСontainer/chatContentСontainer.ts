import { Block } from "core";
import { withStore } from "utils/withStore";
import "./chatContentСontainer.css";

interface IChatContentСontainer {
  isCreatingChat: boolean;
  onSearchUsers: () => void;
}

class ChatContentСontainer extends Block<IChatContentСontainer> {
  static componentName = "ChatContentСontainer";

  constructor(props: IChatContentСontainer) {
    super(props);
  }

  render(): string {
    return `
      <div class="chat-content-container">
        {{#if ${this.getProps().isCreatingChat}}}
          {{{ChatCreator}}}
        {{else}}
          {{{ChatContent}}};
        {{/if}}
      </div>`;
  }
}

const mapStateToProps: Partial<IChatContentСontainer> = (state: AppState) => {
  return {
    isCreatingChat: state.isCreatingChat
  };
};

const ComposedChatContentСontainer = withStore(
  ChatContentСontainer,
  mapStateToProps
);

export { ComposedChatContentСontainer as ChatContentСontainer };
