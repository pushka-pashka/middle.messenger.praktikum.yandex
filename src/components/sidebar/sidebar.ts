import template from "bundle-text:./sidebar.hbs";
import "./sidebar.css";
import { withRouter } from "utils/withRouter";
import { Block, CoreRouter } from "core";

interface ISidebarProps {
  router: CoreRouter;
  events: object;
}

export class Sidebar extends Block<ISidebarProps> {
  static componentName = "Sidebar";

  constructor(props: ISidebarProps) {
    const onNavigateBack = () => this.onNavigateBack();

    super({ ...props, events: { click: onNavigateBack } });
  }

  onNavigateBack() {
    this.props.router.back();
  }

  protected render(): string {
    return template;
  }
}

export default withRouter(Sidebar);
