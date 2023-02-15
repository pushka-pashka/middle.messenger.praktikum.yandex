import { Block } from "core";
import chatsService from "services/chatsService";

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
    super({
      ...props,
      events: {
        click: async () => this.onSelectChat()
      }
    });
  }

  onSelectChat() {
    const chatId = this.getProps().id;

    window.store.dispatch(chatsService.selectChat.bind(chatsService), {
      chatId: chatId
    });
  }

  protected render(): string {
    return `
      <div class="chat-item">
        {{{IconUser size='s'}}}
        <div class="chat-item__about{{#if type}} chat-item__about_type_\{{type}} {{/if}}">
          <div class="about__name">\{{name}}</div>
          <div class="about__status">\{{status}}</div>
        </div>
      </div>`;
  }
}
