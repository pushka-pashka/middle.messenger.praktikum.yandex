import Block from "utils/Block";
import "./chatsList.css";

export class ChatsList extends Block {
  static componentName = "ChatsList";

  protected render(): string {
    return `
    <div class="chats-list">
      {{{Search}}}
      <div class="chats-list__list">
        {{{ChatItem name='Masha Vershinina' status='left 30min ago'}}}
        {{{ChatItem name='R2-D2' status='left 2 years ago'}}}
        {{{ChatItem name='Master Yoda' status='left 18 min ago'}}}
        {{{ChatItem name='Obi-Wan Kenobi' status='online'}}}
        {{{ChatItem name='Chewbacca' status='online'}}}
        {{{ChatItem name='Adam Ondra' status='online'}}}
        {{{ChatItem name='Ilon Mask' status='left 2 min ago'}}}
        {{{ChatItem name='Darth Vader' status='online'}}}
      </div>
    </div>`;
  }
}
