import Block from '../../utils/Block';
import template from 'bundle-text:./label.hbs';

import './label.css';

interface LabelProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
}

export class Label extends Block {
  constructor({label, type, name, placeholder}: LabelProps) {
    super({label, type, name, placeholder});
  }

  protected render(): string {
    return template;
  }
}
