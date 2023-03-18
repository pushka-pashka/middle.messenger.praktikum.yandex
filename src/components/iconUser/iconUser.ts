import Block from "core/Block";
import template from "./iconUser.hbs";
import "./iconUser.css";

interface IconUserProps {
  photo: string;
  size?: string;
  text?: string;
}

export class IconUser extends Block {
  constructor(props: IconUserProps) {
    super({ ...props });
  }

  static componentName = "IconUser";

  protected render(): string {
    return template;
  }
}
