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

  static componentName = "Error";

  protected render(): string {
    return template;
  }
}
