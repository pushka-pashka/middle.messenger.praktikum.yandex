import Block from '../../utils/Block';
import template from 'bundle-text:./error.hbs';

import './error.css';

interface ErrorProps {
  text: string;
  header?: string;
}

export class Error extends Block {
  constructor({text, header}: ErrorProps) {
    super({text, header});
  }

  protected render(): string {
    return template;
  }
}
