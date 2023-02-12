import { Block } from "core";
import { toogleUser } from "services/chatsService";
import "./userItem.css";

interface IUserItemProps {
  user: User;
  onToogleUser?: () => void;
}

export class UserItem extends Block<IUserItemProps> {
  static componentName = "UserItem";

  constructor(props: IUserItemProps) {
    super(props);

    this.setProps({
      onToogleUser: () => {
        this.onToogleUser(this.props.user.id);
      }
    });
  }

  onToogleUser(userId: number) {
    window.store.dispatch(toogleUser, { userId });
  }

  protected render(): string {
    if (this.props.user) {
      const userName = this.props.user.firstName;
      const surname = this.props.user.secondName;
      const login = this.props.user.login;

      return `
        <div class="user">
          <div class="user_info">${login} | ${userName} ${surname}</div>
          <div class="user_button">
            {{#if isChecked}}
              {{{Button text='-' onClick=onToogleUser}}}
            {{else}}
              {{{Button text='+' onClick=onToogleUser}}}
            {{/if}}
          </div>
        </div>
        `;
    }
  }
}
