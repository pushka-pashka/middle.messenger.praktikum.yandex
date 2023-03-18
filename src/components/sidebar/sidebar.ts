import { Block } from "core";
import template from "./sidebar.hbs";
import "./sidebar.css";
import { ScreenPath } from "utils/ScreenList";

interface ISidebarProps {
  toPage?: ScreenPath;
  events: object;
}

class Sidebar extends Block<ISidebarProps> {
  static componentName = "Sidebar";

  constructor(props: ISidebarProps) {
    const onNavigateBack = () => this.onNavigateBack();

    super({ ...props, events: { click: onNavigateBack } });
  }

  onNavigateBack() {
    if (this.props.toPage) {
      window.router.go(this.props.toPage);
    } else {
      window.router.back();
    }
  }

  protected render(): string {
    return template;
  }
}

export default Sidebar;
