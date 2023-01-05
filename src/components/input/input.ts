import Block from 'utils/Block';
import template from 'bundle-text:./input.hbs';
import './input.css';

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onInput?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export class Input extends Block {
  constructor({ onBlur, onInput, onFocus, ...props }: InputProps) {
    super({...props, events: { input: onInput, focus: onFocus, blur: onBlur }});
  }

  protected render(): string {
    return template;
  }
}
