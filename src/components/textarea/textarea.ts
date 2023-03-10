import Block from "core/Block";
import template from "./textarea.hbs";
import "./textarea.css";

interface TextareaProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onInput?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export class Textarea extends Block {
  constructor({ onBlur, onInput, onFocus, ...props }: TextareaProps) {
    super({
      ...props,
      events: { input: onInput, focus: onFocus, blur: onBlur }
    });
  }

  static componentName = "Textarea";

  protected render(): string {
    return template;
  }
}
