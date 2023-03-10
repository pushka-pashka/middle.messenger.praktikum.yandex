import { Block } from "core";
import template from "./input.hbs";
import "./input.css";

interface IInputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onInput?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export class Input extends Block {
  constructor({ onBlur, onInput, onFocus, ...props }: IInputProps) {
    super({
      ...props,
      events: { input: onInput, focus: onFocus, blur: onBlur }
    });
  }

  static componentName = "Input";

  protected render(): string {
    return template;
  }
}
