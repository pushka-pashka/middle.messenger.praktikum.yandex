import Block from "core/Block";
import template from "bundle-text:./link.hbs";
import "./link.css";

interface LinkProps {
  text: string;
  to: string;
  class?: string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    const onClick = (e: MouseEvent) => {
      // eslint-disable-next-line
      console.log("Link clicked");

      e.preventDefault();
    };

    super({ ...props, events: { click: onClick } });
  }

  static componentName = "Link";

  protected render(): string {
    return template;
  }
}
