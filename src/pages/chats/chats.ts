import { Block } from "core";
// import { startNewChat } from "services/chatsService";
import { ScreenPath } from "utils/ScreenList";

interface IChatsPage {
  onNavigateToProfile: () => void;
  onCreateChat: () => void;
}

class ChatsPage extends Block<IChatsPage> {
  static componentName = "Chats";

  constructor(props: IChatsPage) {
    const events = {
      onNavigateToProfile: () => window.router.go(ScreenPath.Profile),
      onCreateChat: () => this.onCreateChat()
      // onStartChat: () => {
      //   window.store.dispatch(startNewChat, {
      //     chatId: 2525,
      //     userId: window.store.getState().user.id
      //   });
      //   console.log("Начинаем общение");
      // }
    };

    super({ ...props, ...events });
  }

  onCreateChat() {
    window.store.dispatch({ isCreatingChat: true });
  }

  render() {
    return `
      <div class="page">
        <div class="page__wrapper">
          {{{ChatsList
            onNavigateToProfile=onNavigateToProfile
            onCreateChat=onCreateChat
          }}}
          {{{ChatContentСontainer}}}
        </div>
      </div>
    `;
  }
}

export default ChatsPage;
