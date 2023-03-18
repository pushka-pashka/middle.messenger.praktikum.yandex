import { Block } from "core";
import "./chatCreator.css";
import { withStore } from "utils/withStore";
import { trim } from "utils/trim";

interface IChatCreator {
  onCloseChatCreator: () => void;
  onBlurExtension: (value: string) => void;
  newChatName: Nullable<string>;
}

class ChatCreator extends Block<IChatCreator> {
  static componentName = "ChatCreator";

  constructor(props: IChatCreator) {
    const events = {
      onBlurExtension: (value: string) => this.onBlurExtension(value)
    };

    super({ ...props, ...events });

    this.setProps({
      onCloseChatCreator: () => this.onCloseChatCreator()
    });
  }

  onCloseChatCreator() {
    window.store.dispatch({
      newChatName: "",
      checkedUsersId: {},
      searchUsersList: [],
      isCreatingChat: false
    });
  }

  onBlurExtension(value: string) {
    window.store.dispatch({ newChatName: trim(value) });
  }

  render(): string {
    return `
      <div class="chat-creator">
        <div class="chat-creator__header">
          {{{Button size='s' text="Назад" onClick=onCloseChatCreator}}}
          {{{ChatCreatorSubmit}}}
        </div>
        <div class="chat-creator__body">
          <div class="chat-creator__name">
            {{{InputDecorator
              type='text'
              label='Название чата'
              name='chat_name'
              placeholder='Название чата'
              ref="chat_name"
              onBlurExtension=onBlurExtension
              value=newChatName
            }}}
          </div>
          <div class="chat-creator__users-list">
            {{{SearchUsersList}}}
          </div>
        </div>
      </div>
    `;
  }
}

const mapStateToProps = (state: AppState): Partial<IChatCreator> => {
  return {
    newChatName: state.newChatName
  };
};

const ComposedChatCreator = withStore(ChatCreator, mapStateToProps);

export { ComposedChatCreator as ChatCreator };
