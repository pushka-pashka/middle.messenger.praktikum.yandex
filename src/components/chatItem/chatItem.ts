import { Block } from "core";
import { openChat } from "services/chatsService";
import "./chatItem.css";

interface ChatItemProps {
  id: number;
  name: string;
  status?: string;
  type?: string;
  events: object;
}

export class ChatItem extends Block<ChatItemProps> {
  static componentName = "ChatItem";

  constructor(props: ChatItemProps) {
    super({ ...props, events: { click: () => this.onOpenChat() } });
  }

  onOpenChat() {
    const chatId = this.getProps().id;

    window.store.dispatch(openChat, {
      chatId: chatId,
      userId: window.store.getState().user.id
    });
  }

  protected render(): string {
    return `
      <div class="chatItem">
        {{{IconUser size='s'}}}
        <div class="chatItem__about{{#if type}} chatItem__about_type_\{{type}} {{/if}}">
          <div class="about__name">\{{name}}</div>
          <div class="about__status">\{{status}}</div>
        </div>
      </div>`;
  }
}
