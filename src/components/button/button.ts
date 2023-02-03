import Block from "core/Block";
import template from "bundle-text:./button.hbs";
import "./button.css";

interface ButtonProps {
  text: string;
  type?: string;
  onClick?: () => void;
  size: string;
}

export class Button extends Block {
  constructor({ text, type, onClick, size }: ButtonProps) {
    super({ size, text, type, events: { click: onClick } });
  }

  static componentName = "Button";

  protected render(): string {
    // console.log(
    //   `%cButton render ${this.id}`,
    //   "background: #5fa4b2; color: black"
    // );
    return template;
  }
}
