import { Block, CoreRouter, Store } from "core";
import { ScreenPath } from "utils/ScreenList";
import { withRouter } from "utils/withRouter";
import { withStore } from "utils/withStore";

interface IChatsPage {
  store: Store<AppState>;
  router: CoreRouter;
  onNavigateToProfile: () => void;
}

export class ChatsPage extends Block<IChatsPage> {
  constructor(props: IChatsPage) {
    super(props);

    this.setProps({
      onNavigateToProfile: () => {
        this.props.router.go(ScreenPath.Profile);
      }
    });
  }

  render() {
    // language=hbs
    return `
    <div class="page">
      <div class="page__wrapper">
        {{{ChatsList onNavigateToProfile=onNavigateToProfile}}}
        {{{ChatContent}}}
      </div>
    </div>
    `;
  }
}

export default withRouter(withStore(ChatsPage));
