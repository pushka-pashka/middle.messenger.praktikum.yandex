import { Block, Store } from "core";
import { withStore } from "utils/withStore";
import "./chatsList.css";

interface IChatList {
  store: Store<AppState>;
  chatsList: () => Nullable<Array>;
  onNavigateToProfile: () => void;
  onCreateChat: () => void;
  onStartChat: () => void;
  onShowChat: () => void;
}

class ChatsList extends Block<IChatList> {
  static componentName = "ChatsList";

  constructor(props: IChatList) {
    super(props);

    this.setProps({
      chatsList: () => this.props.store.getState().chatsList
    });
  }

  protected render(): string {
    return `
      <div class="chats-list">
        {{{Button text="Профиль пользователя" onClick=onNavigateToProfile}}}
        {{{Button text="Создать чат" onClick=onCreateChat}}}
        {{{Button text="Начать чат" onClick=onStartChat}}}
        {{{Search}}}
        {{!TODO: тут должен быть список ul}}
        <div class="chats-list__list">
          {{#each chatsList}}
            {{{ChatItem name=this.title status=this.id onShowChat=onShowChat}}}
          {{/each}}
        </div>
      </div>`;
  }
}

const ComposedChatsList = withStore(ChatsList);

export { ComposedChatsList as ChatsList };
