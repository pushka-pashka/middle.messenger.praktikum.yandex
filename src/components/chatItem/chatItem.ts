import { Store } from "core";
import Block from "core/Block";
import { withStore } from "utils/withStore";
import "./chatItem.css";

interface ChatItemProps {
  store: Store<AppState>;
  name: string;
  status?: string;
  type?: string;
  events: object;
  onShowChat?: () => void;
}

class ChatItem extends Block<ChatItemProps> {
  static componentName = "ChatItem";

  constructor(props: ChatItemProps) {
    const { onShowChat } = props;
    // const onShowChat = () => this.onShowChat();

    super({ ...props, events: { click: onShowChat } });
  }

  protected render(): string {
    return `
      <div class="chatItem" {{#if onShowChat}} onClick=onShowChat {{/if}}>
        {{{IconUser size='s'}}}
        <div class="chatItem__about{{#if type}} chatItem__about_type_\{{type}} {{/if}}">
          <div class="about__name">\{{name}}</div>
          <div class="about__status">\{{status}}</div>
        </div>
      </div>`;
  }
}

const ComposedChatItem = withStore(ChatItem);

export { ComposedChatItem as ChatItem };
