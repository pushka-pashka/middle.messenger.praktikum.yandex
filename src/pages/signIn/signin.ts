import Block from 'utils/Block';
import { validateForm, ValidateRuleEnum, inputNameToValidateRuleType } from 'helpers/validateForm';

export class SignInPage extends Block {
  constructor() {
    super()

    this.setProps({
      onSubmit: () => this.onSubmit(),
      onInput: (e: InputEvent) => {
        const inputEl = e.target as HTMLInputElement;
        const { name, value } = inputEl;
        const errorMessage = validateForm([
          { type: inputNameToValidateRuleType(name), value }
        ]);

        this.refs[name].refs.errorRef.setProps({ text: errorMessage });
      },
      errorMessage: ''
    })
  }

  onSubmit() {
    const loginEl = this._element?.querySelector('input[name="login"]') as HTMLInputElement;
    const passwordEl = this._element?.querySelector('input[name="password"]') as HTMLInputElement;
    const loginValue = loginEl.value;
    const passwordValue = passwordEl.value;

    const errorMessage = validateForm([
      { type: ValidateRuleEnum.Login, value: loginValue },
      { type: ValidateRuleEnum.Password, value: passwordValue }
    ]);

    if (!errorMessage) {
      console.log(`Login form data:
        ${ValidateRuleEnum.Login}: ${loginValue},
        ${ValidateRuleEnum.Password}: ${passwordValue}`
      );
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
            placeholder='pochta@yandex.ru'
            ref="email"
            onInput=onInput
            onFocus=onFocus
          }}}
          {{{InputDecorator
            label='Логин'
            type='text'
            name='login'
            placeholder='ivanovanov'
            ref="login"
            onInput=onInput
            onFocus=onFocus
          }}}
          {{{InputDecorator
            label='Имя'
            type='text'
            name='first_name'
            placeholder='Иван'
            ref="first_name"
            onInput=onInput
            onFocus=onFocus
          }}}
          {{{InputDecorator
            label='Фамилия'
            type='text'
            name='second_name'
            placeholder='Иванов'
            ref="second_name"
            onInput=onInput
            onFocus=onFocus
          }}}
          {{{InputDecorator
            label='Телефон'
            type='phone'
            name='phone'
            placeholder='+7***'
            ref="phone"
            onInput=onInput
            onFocus=onFocus
          }}}
          {{{InputDecorator
            label='Пароль'
            type='password'
            name='password'
            placeholder='***'
            ref="password"
            onInput=onInput
            onFocus=onFocus
          }}}
          {{{InputDecorator
            label='Пароль (еще раз)'
            type='password'
            name='password_double'
            placeholder='***'
            ref="password_double"
            onInput=onInput
            onFocus=onFocus
          }}}
          {{{Button type='submit' text='Зарегистрироваться'}}}
        </form>
      </div>
    `;
  }
}

// <h1 class="header">Регистрация</h1>
// <form id="signin" action="" method="post" class="form">
// 	{{> 'label/label' label='Почта' type='text' name='email' placeholder='pochta@yandex.ru'}}
// 	{{> 'label/label' label='Логин' type='text' name='login' placeholder='ivanovanov'}}
// 	{{> 'label/label' label='Имя' type='text' name='first_name' placeholder='Иван'}}
// 	{{> 'label/label' label='Фамилия' type='text' name='second_name' placeholder='Иванов'}}
// 	{{> 'label/label' label='Телефон' type='phone' name='phone' placeholder='+7***'}}
// 	{{> 'label/label' label='Пароль' type='password' name='password' placeholder='***'}}
// 	{{> 'label/label' label='Пароль (еще раз)' type='password' name='password_double' placeholder='***'}}
// 	{{> 'button/button' type='submit' text='Зарегистрироваться'}}
// </form>
