import Block from '../../utils/Block';
import template from 'bundle-text:./info.hbs';

import './info.css';

interface InfoProps {
  label: string;
  text: string;
}

export class Info extends Block {
  constructor(props: InfoProps) {
    super({...props});
  }

  protected render(): string {
    return template;
  }
}
