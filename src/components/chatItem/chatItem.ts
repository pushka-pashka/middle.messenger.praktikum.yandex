import Block from 'utils/Block';
import './chatItem.css';

interface ChatItemProps {
  name: string;
  status: string;
  type: string;
}

export class ChatItem extends Block {
  static componentName = "ChatItem";

  constructor(props: ChatItemProps) {
    super({...props})
  }

  protected render(): string {
  return `
    <div class="chatItem">
      {{{IconUser size='s'}}}
      <div class="chatItem__about chatItem__about_type_\{{type}}">
        <div class="about__name">\{{name}}</div>
        <div class="about__status">\{{status}}</div>
      </div>
    </div>`;
  }
}
