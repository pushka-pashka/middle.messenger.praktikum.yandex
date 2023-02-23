import { Block } from "core";
import { logout } from "services/authService";
import { ScreenPath } from "utils/ScreenList";
import { withStore } from "utils/withStore";

interface IProfilePage {
  onChangeData: () => void;
  onChangePassword: () => void;
  onLogout: () => void;
  user: User;
}

class ProfilePage extends Block<IProfilePage> {
  static componentName = "Profile";

  constructor(props: IProfilePage) {
    super(props);

    this.setProps({
      onChangeData: () => window.router.go(ScreenPath.EditProfile),
      onChangePassword: () => window.router.go(ScreenPath.EditPassword),
      onLogout: () => window.store.dispatch(logout)
    });
  }

  render() {
    const user = this.getProps().user;
    // language=hbs
    return `
    <div class="page">
      {{{Sidebar}}}
      <div class="page__wrapper">
        <div class="page__content">
          {{{IconUser text="${user ? user.firstName : "Ава"}" size="l"}}}
          {{{Header size="l" text="${user ? user.login : "Логин"}"}}}
          <div class="profile_info">
            {{{Info label="Имя" text="${user ? user.firstName : "Имя"}"}}}
            {{{Info label="Фамилия" text="${
              user ? user.secondName : "Фамилия"
            }"}}}
            {{{Info label="Логин" text="${user ? user.login : "Логин"}"}}}
            {{{Info label="Имя в чате" text="${
              user?.display_name ? user.displayName : "Имя в чате"
            }"}}}
            {{{Info label="Телефон" text="${user ? user.phone : "Телефон"}"}}}
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

const mapStateToProps: Partial<IProfilePage> = (state: AppState) => {
  return {
    user: state.user
  };
};

const ComposedProfilePage = withStore(ProfilePage, mapStateToProps);

export { ComposedProfilePage as ProfilePage };
