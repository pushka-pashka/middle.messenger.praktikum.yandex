import Block from '../../utils/Block';
import template from 'bundle-text:./label.hbs';

import './label.css';

interface LabelProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange?: () => void;
}

export class Label extends Block {
  constructor({ onChange = () => {}, ...props }: LabelProps) {
    super({...props, events: { input: onChange }});
  }

  protected render(): string {
    return template;
  }
}
