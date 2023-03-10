import Block from "core/Block";
import template from "./info.hbs";
import "./info.css";

interface InfoProps {
  label: string;
  text: string;
}

export class Info extends Block {
  constructor(props: InfoProps) {
    super({ ...props });
  }

  static componentName = "Info";

  protected render(): string {
    return template;
  }
}
