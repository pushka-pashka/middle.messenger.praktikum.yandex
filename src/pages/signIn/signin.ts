import Block from 'utils/Block';
import { validateForm, ValidateRuleEnum } from 'helpers/validateForm';

export class SignInPage extends Block {
  constructor() {
    super()

    this.setProps({
      onSubmit: () => this.onSubmit(),
      onInput: (e: InputEvent) => {
        const inputEl = e.target as HTMLInputElement;
        const { name } = inputEl;
        const errorEl = this.refs[name].refs.errorRef;

        if(errorEl.getProps('text')) {
          errorEl.setProps({ text: '' })
        }

        return;
      }
    })
  }

  onSubmit() {
    const emailEl = this._element?.querySelector('input[name="email"]') as HTMLInputElement;
    const loginEl = this._element?.querySelector('input[name="login"]') as HTMLInputElement;
    const nameEl = this._element?.querySelector('input[name="name"]') as HTMLInputElement;
    const surnameEl = this._element?.querySelector('input[name="surname"]') as HTMLInputElement;
    const phoneEl = this._element?.querySelector('input[name="phone"]') as HTMLInputElement;
    const passwordEl = this._element?.querySelector('input[name="password"]') as HTMLInputElement;
    const passwordDoubleEl = this._element?.querySelector('input[name="password_double"]') as HTMLInputElement;

    const emailValue = emailEl.value;
    const loginValue = loginEl.value;
    const nameValue = nameEl.value;
    const surnameValue = surnameEl.value;
    const phoneValue = phoneEl.value;
    const passwordValue = passwordEl.value;
    const passwordDoubleValue = passwordDoubleEl.value;

    const errorMessage = validateForm([
      { type: ValidateRuleEnum.Email, value: emailValue },
      { type: ValidateRuleEnum.Login, value: loginValue },
      { type: ValidateRuleEnum.Name, value: nameValue },
      { type: ValidateRuleEnum.Surname, value: surnameValue },
      { type: ValidateRuleEnum.Phone, value: phoneValue },
      { type: ValidateRuleEnum.Password, value: passwordValue },
      { type: ValidateRuleEnum.PasswordDouble, value: passwordDoubleValue }
    ]);

    if (!errorMessage) {
      console.log(`Login form data:
        ${ValidateRuleEnum.Email}: ${loginValue},
        ${ValidateRuleEnum.Login}: ${loginValue},
        ${ValidateRuleEnum.Name}: ${nameValue},
        ${ValidateRuleEnum.Surname}: ${surnameValue},
        ${ValidateRuleEnum.Phone}: ${phoneValue},
        ${ValidateRuleEnum.Password}: ${passwordValue},
        ${ValidateRuleEnum.PasswordDouble}: ${passwordDoubleValue}`
      );
    } else {
      console.log('onSubmit error')
    };
  }

render() {
    // language=hbs
    return `
      <div>
        <h1 class="header">Регистрация</h1>
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
    `;
  }
}
