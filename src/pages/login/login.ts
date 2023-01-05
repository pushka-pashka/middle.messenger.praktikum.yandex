import { validateForm, ValidateRuleEnum, inputNameToValidateRuleType } from 'helpers/validateForm';
import Block from 'utils/Block';

export class LoginPage extends Block {
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
      errorMessage: '',
      loginValue: '',
      passwordValue: ''
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
        <h1 class="header">Добро пожаловать</h1>
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
        </form>
        {{{Button text='Войти' onClick=onSubmit}}}
      </div>
    `;
  }
}

// hbs
// <h1 class="header">Добро пожаловать</h1>
// <form id="signin" action="" method="post" class="form">
//   {{> 'label/label' label='Логин' type='text' name='login' placeholder='ivanovanov'}}
//   {{> 'label/label' label='Пароль' type='password' name='password' placeholder='***'}}
//   {{> 'button/button' type='submit' text='Войти'}}
// </form>
