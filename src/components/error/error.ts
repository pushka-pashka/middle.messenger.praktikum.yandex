import Block from "core/Block";
// import template from "bundle-text:./error.hbs";
import "./error.css";

export interface IErrorProps {
  text: string;
  size: string;
}

export class Error extends Block {
  constructor({ text = "", ...props }: IErrorProps) {
    super({ ...props, text });
  }

  static componentName = "Error";

  protected render(): string {
    // console.log(
    //   `%cError render ${this.id}`,
    //   "background: #e8cad3; color: black"
    // );

    return `
      <div class="error error_size_{{size}}" data-id="${this.id}">
        {{#if text}}
          {{text}}
        {{/if}}
      </div>
  `;
  }
}
