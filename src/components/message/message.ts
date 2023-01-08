import Block from "utils/Block";
import "./message.css";

interface MessageProps {
  date: string;
  sender?: string;
  text: string;
}

export class Message extends Block {
  static componentName = "Message";

  constructor(props: MessageProps) {
    super({ ...props });
  }

  protected render(): string {
    const type = this.props.sender ? "toMe" : "me";

    return `
      <div class="message message_type_${type}">
        <div class="message__about">
          <span class="message__date">\{{date}}</span>
          <span class="message__sender">\{{sender}}</span>
        </div>
        <div class="message__content message__content_type_${type}">\{{text}}</div>
      </div>`;
  }
}
