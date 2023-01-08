import Block from "utils/Block";
import { validateForm, ValidateRuleEnum } from "helpers/validateForm";

export class SignInPage extends Block {
  constructor() {
    super();

    this.setProps({
      onSubmit: () => this.onSubmit(),
      onInput: (e: InputEvent) => {
        const inputEl = e.target as HTMLInputElement;
        const { name } = inputEl;
        const errorEl = this.refs[name].refs.errorRef;

        if (errorEl.getProps("text")) {
          errorEl.setProps({ text: "" });
        }
      }
    });
  }

  onSubmit() {
    const errorData: [ValidateRuleEnum, string][] = [];
    const data: [ValidateRuleEnum, string][] = [];

    [
      ValidateRuleEnum.Email,
      ValidateRuleEnum.Login,
      ValidateRuleEnum.Name,
      ValidateRuleEnum.Surname,
      ValidateRuleEnum.Phone,
      ValidateRuleEnum.Password,
      ValidateRuleEnum.PasswordDouble
    ].forEach((rule: ValidateRuleEnum) => {
      const inputEl = this._element?.querySelector(
        `input[name=${rule}]`
      ) as HTMLInputElement;
      const errorRefEl = this.refs[rule].refs.errorRef;

      let errorMessage = validateForm([{ type: rule, value: inputEl.value }]);

      if (!errorMessage && rule === ValidateRuleEnum.PasswordDouble) {
        const passwordEl = this._element?.querySelector(
          `input[name=${ValidateRuleEnum.Password}]`
        ) as HTMLInputElement;
        errorMessage =
          passwordEl.value !== inputEl.value
            ? "Не совпадает с основным паролем"
            : "";
      }

      if (errorMessage) {
        errorRefEl.setProps({ text: errorMessage });
        errorData.push([rule, errorMessage]);
      } else {
        data.push([rule, inputEl.value]);
      }
    });

    if (errorData.length) {
      // eslint-disable-next-line
      console.log("onSubmit error:", errorData);
    } else {
      // eslint-disable-next-line
      console.log("Login form data:", data);
    }
  }

  render() {
    // language=hbs
    return `
    <div class="page">
      {{{Sidebar to='index.hbs'}}}
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
              name='name'
              placeholder='Alexandr'
              ref="name"
              onInput=onInput
              onFocus=onFocus
            }}}
            {{{InputDecorator
              label='Фамилия'
              type='text'
              name='surname'
              placeholder='Alexandrov'
              ref="surname"
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
          {{{Button text='Зарегистрироваться' onClick=onSubmit}}}
        </div>
    </div>
    `;
  }
}
