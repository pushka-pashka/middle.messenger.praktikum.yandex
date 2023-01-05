import Block from '../../utils/Block';
import template from 'bundle-text:./button.hbs';

import './button.css';

interface ButtonProps {
  text: string;
  type?: string;
  onClick?: () => void;
}

export class Button extends Block {
  constructor({text, type, onClick}: ButtonProps) {
    super({text, type, events: {click: onClick}});
  }

  protected render(): string {
    return template;
  }
}
