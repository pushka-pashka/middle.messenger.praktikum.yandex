import Block from 'utils/Block';
import template from 'bundle-text:./iconUser.hbs';
import './iconUser.css';

interface IconUserProps {
  photo: string;
  small?: string;
  text?: string;
}

export class IconUser extends Block {
  constructor({text, small, photo}: IconUserProps) {
    super({text, small, photo});
  }

  static componentName = "IconUser";

  protected render(): string {
    return template;
  }
}
