import { Block, CoreRouter, Store } from "core";
import { createChat, startNewChat } from "services/chatsService";
import { ScreenPath } from "utils/ScreenList";
import { withRouter } from "utils/withRouter";
import { withStore } from "utils/withStore";

interface IChatsPage {
  store: Store<AppState>;
  router: CoreRouter;
  onNavigateToProfile: () => void;
  onCreateChat: () => void;
  onStartChat: () => void;
  onShowChat: () => void;
}

export class ChatsPage extends Block<IChatsPage> {
  constructor(props: IChatsPage) {
    super(props);

    this.setProps({
      onNavigateToProfile: () => {
        this.props.router.go(ScreenPath.Profile);
      },
      onCreateChat: () => {
        this.props.store.dispatch(createChat);
        console.log("создаем чат");
      },
      onStartChat: () => {
        this.props.store.dispatch(startNewChat, {
          chatId: 2525,
          userId: this.props.store.getState().user.id
        });
        console.log("Начинаем общение");
      }
      // onShowChat: () => {
      //   console.log("show");
      // }
    });
  }

  render() {
    return `
    <div class="page">
      <div class="page__wrapper">
        {{{ChatsList
          onNavigateToProfile=onNavigateToProfile
          onCreateChat=onCreateChat
          onStartChat=onStartChat
          onShowChat=onShowChat
        }}}
        {{{ChatContent}}}
      </div>
    </div>
    `;
  }
}

export default withRouter(withStore(ChatsPage));
