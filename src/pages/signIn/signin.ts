import { Block } from "core";
import { ValidateRuleEnum } from "utils/validateForm";
import { getFormData } from "utils/getFormData";
import { signup } from "services/authService";

interface ISignInPageProps {
  onSignIn: (e: FormDataEvent) => void;
  onInput: (e: InputEvent) => void;
}

class SignInPage extends Block<ISignInPageProps> {
  static componentName = "SignInPage";

  constructor(props: ISignInPageProps) {
    super(props);

    this.setProps({
      onSignIn: (e: FormDataEvent) => this.onSignIn(e),
      onInput: (e: InputEvent) => this.onInput(e)
    });
  }

  onSignIn(e: FormDataEvent) {
    const fields = [
      ValidateRuleEnum.Email,
      ValidateRuleEnum.Login,
      ValidateRuleEnum.FirstName,
      ValidateRuleEnum.SecondName,
      ValidateRuleEnum.Phone,
      ValidateRuleEnum.Password,
      ValidateRuleEnum.PasswordDouble
    ];

    const formData = getFormData(e, fields, this.element, this.refs);

    if (formData) {
      window.store.dispatch(signup, formData);
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

  render() {
    // language=hbs
    return `
    <div class="page">
      {{{Sidebar}}}
      <div class="page__wrapper">
        <div class="page__content">
          {{{Header text="Регистрация" size='l'}}}
          <form id="signin" action="" method="post" class="form">
            {{{InputDecorator
              label='Почта'
              type='text'
              name='email'
              placeholder='email@yandex.ru'
              ref="email"
              onInput=onInput
              onFocus=onFocus
            }}}
            {{{InputDecorator
              label='Логин'
              type='text'
              name='login'
              placeholder='sanya'
              ref="login"
              onInput=onInput
              onFocus=onFocus
            }}}
            {{{InputDecorator
              label='Имя'
              type='text'
              name='first_name'
              placeholder='Alexandr'
              ref="first_name"
              onInput=onInput
              onFocus=onFocus
            }}}
            {{{InputDecorator
              label='Фамилия'
              type='text'
              name='second_name'
              placeholder='Alexandrov'
              ref="second_name"
              onInput=onInput
              onFocus=onFocus
            }}}
            {{{InputDecorator
              label='Телефон'
              type='phone'
              name='phone'
              placeholder='+7**********'
              ref="phone"
              onInput=onInput
              onFocus=onFocus
            }}}
            {{{InputDecorator
              label='Пароль'
              type='password'
              name='password'
              placeholder='*****'
              ref="password"
              onInput=onInput
              onFocus=onFocus
            }}}
            {{{InputDecorator
              label='Пароль (еще раз)'
              type='password'
              name='password_double'
              placeholder='*****'
              ref="password_double"
              onInput=onInput
              onFocus=onFocus
            }}}
          </form>
          {{{Button type="submit" text='Зарегистрироваться' onClick=onSignIn}}}
        </div>
    </div>
    `;
  }
}

export default SignInPage;
