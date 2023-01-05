import Block from 'utils/Block';
import template from 'bundle-text:./error.hbs';
import './error.css';

interface ErrorProps {
  text: string;
}

export class Error extends Block {
  constructor(props : ErrorProps) {
    super({...props});
  }

  protected render(): string {
    return template;
  }
}
