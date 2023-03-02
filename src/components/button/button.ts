import { Block } from "core";
import "./button.css";

interface IButtonProps {
  text: string;
  type?: string;
  onClick?: () => void;
  size: string;
  disabled?: boolean;
}

export class Button extends Block {
  constructor({ onClick, ...props }: IButtonProps) {
    super({ ...props, events: { click: onClick } });
  }

  static componentName = "Button";

  protected render(): string {
    // console.log(
    //   `%cButton render ${this.id}`,
    //   "background: #5fa4b2; color: black"
    // );
    return `<button
      class="button button_type_submit button_size_\{{size}}"
      \{{#if disabled}}
        disabled
      \{{/if}}
      type=\{{type}}>
      \{{text}}
    </button>;`;
  }
}
