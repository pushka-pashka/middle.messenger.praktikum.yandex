import Block from "core/Block";
import { IRouter } from "core/Router";
import template from "bundle-text:./sidebar.hbs";
import "./sidebar.css";
import { withRouter } from "utils/withRouter";

interface SidebarProps {
  router: IRouter;
}

export class Sidebar extends Block {
  constructor(props: SidebarProps) {
    const onNavigateBack = () => this.onNavigateBack();

    super({ ...props, events: { click: onNavigateBack } });

    // this.setProps({
    //   onNavigateBack: () => this.onNavigateBack()
    // });
  }

  onNavigateBack() {
    console.log("sidebar back");
    this.props.router.back();
  }

  static componentName = "Sidebar";

  protected render(): string {
    return template;
  }
}

export default withRouter(Sidebar);
