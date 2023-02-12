import { Block } from "core";
import "./message.css";

interface IMessageProps {
  myUserId: number;
  userId: number;
  time: string;
  content: string;
}
export class Message extends Block {
  static componentName = "Message";

  constructor(props: IMessageProps) {
    super(props);
  }

  protected render(): string {
    const type =
      this.getProps().myUserId === this.getProps().userId ? "me" : "toMe";

    return `
      <div class="message message_type_${type}">
        <div class="message__about">
          <span class="message__date">\{{date}}</span>
<!--          <span class="message__sender">\{{sender}}</span>-->
        </div>
        <div class="message__content message__content_type_${type}">\{{content}}</div>
      </div>`;
  }
}
