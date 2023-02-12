import { Block } from "core";
import template from "bundle-text:./sidebar.hbs";
import "./sidebar.css";

interface ISidebarProps {
  events: object;
}

class Sidebar extends Block<ISidebarProps> {
  static componentName = "Sidebar";

  constructor(props: ISidebarProps) {
    const onNavigateBack = () => this.onNavigateBack();

    super({ ...props, events: { click: onNavigateBack } });
  }

  onNavigateBack() {
    window.router.back();
  }

  protected render(): string {
    return template;
  }
}

export default Sidebar;
