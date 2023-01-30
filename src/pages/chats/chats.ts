import { Block, Store } from "core";
import { logout } from "services/auth";
import { withStore } from "utils/withStore";

interface IChatsPage {
  store: Store<AppState>;
  onLogout: () => void;
}

export class ChatsPage extends Block<IChatsPage> {
  constructor(props: IChatsPage) {
    super(props);

    this.setProps({
      onLogout: () => this.props.store.dispatch(logout)
    });
  }

  render() {
    // language=hbs
    return `
    <div class="page">
      <div class="page__wrapper">
        {{{ChatsList onLogout=onLogout}}}
        {{{ChatContent}}}
      </div>
    </div>
    `;
  }
}

export default withStore(ChatsPage);
