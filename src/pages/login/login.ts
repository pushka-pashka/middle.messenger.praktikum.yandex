import Block from "core/Block";
import { ValidateRuleEnum } from "utils/validateForm";
import getFormData from "utils/getFormData";
import { withRouter } from "utils/withRouter";
import { withStore } from "utils/withStore";
import { CoreRouter, Store } from "core";
import { Screens } from "utils/ScreenList";
import { login } from "services/auth";

interface LoginPageProps {
  router: CoreRouter;
  store: Store<AppState>;
  onSubmit: (e: FormDataEvent) => void;
  onInput: (e: InputEvent) => void;
  onNavigateToSignIn: () => void;
  formError?: () => string | null;
}

export class LoginPage extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super(props);

    this.setProps({
      onSubmit: (e: FormDataEvent) => this.onSubmit(e),
      onInput: (e: InputEvent) => this.onInput(e),
      onNavigateToSignIn: () => this.onNavigateToSignIn(),
      formError: () => this.props.store.getState().loginFormError
    });
  }

  onSubmit(e: FormDataEvent) {
    const fields = [ValidateRuleEnum.Login, ValidateRuleEnum.Password];
    const formData = getFormData(e, fields, this.element, this.refs);

    if (formData) {
      const loginData = { login: formData.login, password: formData.password };
      this.props.store.dispatch(login, loginData);
    }
  }

  onInput(e: InputEvent) {
    const inputEl = e.target as HTMLInputElement;
    const { name } = inputEl;
    const errorEl = this.refs[name].refs.errorRef;

    if (errorEl.getProps("text")) {
      errorEl.setProps({ text: "" });
    }
  }

  onNavigateToSignIn() {
    this.props.router.go(`/${Screens.SignIn}`);
  }

  render() {
    // language=hbs
    return `
    <div class="page">
      {{{Sidebar}}}
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
          {{{Error size='s' text=formError}}}
      </div>
    </div>
    `;
  }
}

export default withRouter(withStore(LoginPage));
