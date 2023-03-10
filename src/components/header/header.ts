import Block from "core/Block";
import template from "./header.hbs";
import "./header.css";

export enum HeaderSizeType {
  s = "s",
  m = "m",
  l = "l"
}

interface HeaderProps {
  size: HeaderSizeType;
  text: string;
}

export class Header extends Block {
  constructor(props: HeaderProps) {
    super({ ...props });
  }

  static componentName = "Header";

  protected render(): string {
    return template;
  }
}
