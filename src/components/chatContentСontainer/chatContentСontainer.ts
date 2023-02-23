import { Block } from "core";
import { withStore } from "utils/withStore";
import template from "bundle-text:./chatContentСontainer.hbs";
import "./chatContentСontainer.css";

interface IChatContentСontainer {
  isCreatingChat: boolean;
  currentChatId: Nullable<number>;
  onSearchUsers: () => void;
}

class ChatContentСontainer extends Block<IChatContentСontainer> {
  static componentName = "ChatContentСontainer";

  constructor(props: IChatContentСontainer) {
    super(props);
  }

  render(): string {
    return template;
  }
}

const mapStateToProps: Partial<IChatContentСontainer> = (state: AppState) => {
  return {
    isCreatingChat: state.isCreatingChat,
    currentChatId: state.currentChatId
  };
};

const ComposedChatContentСontainer = withStore(
  ChatContentСontainer,
  mapStateToProps
);

export { ComposedChatContentСontainer as ChatContentСontainer };
