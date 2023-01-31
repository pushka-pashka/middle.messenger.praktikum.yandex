import { Block, CoreRouter, Store } from "core";
import { logout } from "services/auth";
import { ScreenPath } from "utils/ScreenList";
import { withRouter } from "utils/withRouter";
import { withStore } from "utils/withStore";

interface IProfilePage {
  store: Store<AppState>;
  router: CoreRouter;
  onChangeData: () => void;
  onChangePassword: () => void;
  onLogout: () => void;
}

export class ProfilePage extends Block<IProfilePage> {
  constructor(props: IProfilePage) {
    super(props);

    this.setProps({
      onChangeData: () => this.props.router.go(ScreenPath.EditProfile),
      onChangePassword: () => this.props.router.go(ScreenPath.EditPassword),
      onLogout: () => this.props.store.dispatch(logout)
    });
  }

  render() {
    //TODO: если user=null то в шаблоне будут ошибки
    const user = this.props.store.getState().user;
    // language=hbs
    return `
    <div class="page">
      {{{Sidebar}}}
      <div class="page__wrapper">
        <div class="page__content">
          {{{IconUser text="${user.first_name}" size="l"}}}
          {{{Header size="l" text="${user.login}"}}}
          <div class="profile_info">
            {{{Info label="Имя" text="${user.first_name}"}}}
            {{{Info label="Фамилия" text="${user.second_name}"}}}
            {{{Info label="Логин" text="${user.login}"}}}
            {{{Info label="Имя в чате" text="${user.display_name}"}}}
            {{{Info label="Телефон" text="${user.phone}"}}}
          </div>
          <div class="profile_buttons">
            {{{Button text='Изменить данные' onClick=onChangeData}}}
            {{{Button text='Изменить пароль' onClick=onChangePassword}}}
            {{{Button text='Выйти' onClick=onLogout}}}
          </div>
        </div>
      </div>
    </div>
    `;
  }
}

export default withRouter(withStore(ProfilePage));
