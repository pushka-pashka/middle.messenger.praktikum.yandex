import { Block } from "core";
import { ValidateRuleEnum } from "utils/validateForm";
import { FormDataType, getFormData } from "utils/getFormData";
import { Screens } from "utils/ScreenList";
import { login } from "services/authService";

interface ILoginPageProps {
  onSubmit: (e: FormDataEvent) => void;
  onInput: (e: InputEvent) => void;
  onNavigateToSignIn: () => void;
  formError: () => string | null;
}

class LoginPage extends Block<ILoginPageProps> {
  static componentName = "LoginPage";

  constructor(props: ILoginPageProps) {
    const events = {
      onSubmit: (e: FormDataEvent) => this.onSubmit(e),
      onInput: (e: InputEvent) => this.onInput(e),
      onNavigateToSignIn: () => this.onNavigateToSignIn()
    };

    super({ ...props, ...events });
  }

  onSubmit(e: FormDataEvent) {
    const fields = [ValidateRuleEnum.Login, ValidateRuleEnum.Password];
    const formData: Nullable<FormDataType> = getFormData(
      e,
      fields,
      this.element,
      this.refs
    );

    if (formData) {
      const loginData: LoginData = {
        login: formData.login,
        password: formData.password
      };
      window.store.dispatch(login, loginData);
    }
  }

  onInput(e: InputEvent) {
    const inputEl = e.target as HTMLInputElement;
    const { name } = inputEl;
    const errorEl = this.refs[name].refs.errorRef;

    if (window.store.getState().loginFormError) {
      window.store.dispatch({ loginFormError: null });
    }

    if (errorEl.getProps("text")) {
      errorEl.setProps({ text: "" });
    }
  }

  onNavigateToSignIn() {
    window.router.go(`/${Screens.SignIn}`);
  }

  render() {
    // language=hbs
    return `
    <div class="page">
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
          {{{FormError size='s'}}}
      </div>
    </div>
    `;
  }
}

export default LoginPage;
