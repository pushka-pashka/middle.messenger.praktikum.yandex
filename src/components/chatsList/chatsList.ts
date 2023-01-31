import { Block } from "core";
import "./chatsList.css";

interface IChatList {
  onNavigateToProfile: () => void;
}

export class ChatsList extends Block {
  static componentName = "ChatsList";

  constructor(props: IChatList) {
    super(props);
  }

  protected render(): string {
    return `
    <div class="chats-list">
      {{{Button text="Профиль пользователя" onClick=onNavigateToProfile}}}
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

export default ChatsList;
