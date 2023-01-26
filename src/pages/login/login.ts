import { ValidateRuleEnum } from "utils/validateForm";
import Block from "core/Block";
import onSubmit from "utils/submitForm";
import { withRouter } from "utils/withRouter";
import { withStore } from "utils/withStore";
import { Store } from "core";
import { Screens } from "utils/ScreenList";
import { IRouter } from "core/Router";

interface LoginPageProps {
  router: IRouter;
  store: Store<AppState>;
  onSubmit: (e: FormDataEvent) => void;
  onInput: (e: InputEvent) => void;
  onNavigateToSignIn: () => void;

  isGreenTheme: () => boolean;
  onToggleBackgroundColor: () => void;
}

export class LoginPage extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super(props);

    this.setProps({
      onSubmit: (e: FormDataEvent) => this.onSubmit(e),
      onInput: (e: InputEvent) => this.onInput(e),
      onNavigateToSignIn: () => this.props.router.go(`${Screens.SignIn}`),

      isGreenTheme: () => this.props.store.getState().isGreenTheme,
      onToggleBackgroundColor: () => this.onToggleBackgroundColor()
    });
  }

  onSubmit(e: FormDataEvent) {
    this.props.router.go(`/${Screens.Chats}`);
    // const fields = [ValidateRuleEnum.Login, ValidateRuleEnum.Password];

    // onSubmit(e, fields, this.element, this.refs);
  }

  onInput(e: InputEvent) {
    const inputEl = e.target as HTMLInputElement;
    const { name } = inputEl;
    const errorEl = this.refs[name].refs.errorRef;

    if (errorEl.getProps("text")) {
      errorEl.setProps({ text: "" });
    }
  }

  onToggleBackgroundColor() {
    const theme = this.props.store.getState().isGreenTheme;
    this.props.store.dispatch({ isGreenTheme: !theme });
  }

  render() {
    // language=hbs
    return `
    <div class="page {{#if isGreenTheme}} page_type_green{{/if}}">
      {{{Sidebar to='../index.html'}}}
      <div class="page__wrapper">
        <div class="page__content">
          {{{Header text="Добро пожаловать" size='l'}}}
          <form id="signin" action="" method="post" class="form">
            {{{InputDecorator
              ref="login"
              onInput=onInput
              onFocus=onFocus
              label='Логин'
              type='text'
              name='login'
              placeholder='ivanovanov'
            }}}
            {{{InputDecorator
              ref="password"
              onInput=onInput
              onFocus=onFocus
              label='Пароль'
              type='password'
              name='password'
              placeholder='***'
            }}}
            {{{Button type="submit" text='Войти' onClick=onSubmit}}}
          </form>
          {{{Button text='Зарегистрироваться' onClick=onNavigateToSignIn}}}

          {{{Button text='Сменить фон' onClick=onToggleBackgroundColor}}}
      </div>
    </div>
    `;
  }
}

export default withRouter(withStore(LoginPage));
