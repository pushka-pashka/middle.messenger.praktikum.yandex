import { Block } from "core";
import { selectChat } from "services/chatsService";

import "./chatItem.css";

interface ChatItemProps {
  id: number;
  name: string;
  unreadCount: number;
  type?: string;
  events: object;
}

export class ChatItem extends Block<ChatItemProps> {
  static componentName = "ChatItem";

  constructor(props: ChatItemProps) {
    super({
      ...props,
      events: {
        click: async () => this.onSelectChat()
      }
    });
  }

  onSelectChat() {
    const chatId = this.getProps().id;

    window.store.dispatch(selectChat, {
      chatId
    });
  }

  protected render(): string {
    return `
      <div class="chat-item">
        {{{IconUser size='s'}}}
        <div class="chat-item__about{{#if type}} chat-item__about_type_\{{type}} {{/if}}">
          <div class="about__name">\{{name}}</div>
          {{#if unreadCount}}
            <div class="about__status">
              Новых сообщений: \{{unreadCount}}
            </div>
          {{/if}}
        </div>
      </div>`;
  }
}
