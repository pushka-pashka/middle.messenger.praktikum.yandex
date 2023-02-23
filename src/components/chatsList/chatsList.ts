import { Block } from "core";
import { withStore } from "utils/withStore";
import "./chatsList.css";

interface IChatListProps {
  chatsList: Chat[];
  onNavigateToProfile: () => void;
  onCreateChat: () => void;
}

class ChatsList extends Block<IChatListProps> {
  static componentName = "ChatsList";

  constructor(props: IChatListProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="chats-list">
        {{{Button text="Профиль пользователя" onClick=onNavigateToProfile}}}
        {{{Button text="Создать чат" onClick=onCreateChat}}}
        {{{Search id="search_chats" placeholder="Найти чат"}}}
        {{!TODO: тут должен быть список ul}}
        <div class="chats-list__list">
          {{#each chatsList}}
            {{{ChatItem name=this.title unreadCount=this.unreadCount id=this.id}}}
          {{/each}}
        </div>
      </div>`;
  }
}

const mapStateToProps: Partial<IChatListProps> = (state: AppState) => {
  return {
    chatsList: state.chatsList
  };
};

const ComposedChatsList = withStore(ChatsList, mapStateToProps);

export { ComposedChatsList as ChatsList };
