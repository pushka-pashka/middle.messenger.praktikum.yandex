import { Block } from "core";
import "./chatCreator.css";
import { withStore } from "utils/withStore";
// TODO:  пересмотреть?
interface IChatCreator {
  onCloseChatCreator: () => void;
  onBlurExtension: (value: string) => void;
  chatName: string;
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
      chatName: "",
      isCreatingChat: false,
      checkedUsersId: {},
      searchUsersList: []
    });
  }

  onBlurExtension(value: string) {
    window.store.dispatch({ chatName: value });
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
              value=chatName
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

const mapStateToProps: Partial<IChatCreator> = (state: AppState) => {
  return {
    //isDisabledButton: Boolean(Object.keys(state.checkedUsersId).length),
    chatName: state.chatName
  };
};

const ComposedChatCreator = withStore(ChatCreator, mapStateToProps);

export { ComposedChatCreator as ChatCreator };
