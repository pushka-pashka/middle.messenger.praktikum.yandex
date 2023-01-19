import Block from "core/Block";
import template from "bundle-text:./sidebar.hbs";
import "./sidebar.css";

interface SidebarProps {
  to: string;
}

export class Sidebar extends Block {
  constructor(props: SidebarProps) {
    super({ ...props });
  }

  static componentName = "Sidebar";

  protected render(): string {
    return template;
  }
}
