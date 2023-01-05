import Block from 'utils/Block';
import template from 'bundle-text:./link.hbs';
import './link.css';

interface LinkProps {
  text: string;
  to: string;
  class?: string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    const onClick = (e: MouseEvent) => {
      console.log('Link clicked');

      e.preventDefault();
    }

    super({...props, events: { click: onClick }});
  }

  protected render(): string {
    return template;
  }
}
