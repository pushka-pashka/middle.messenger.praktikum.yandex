import { validateForm, ValidateRuleType } from '../../helpers/validateForm';
import Block from '../../utils/Block';

export class LoginPage extends Block {
  constructor() {
    super()

    this.setProps({
      onSubmit: () => this.onSubmit(),
      onChange: () => this.onChange(),
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
      { type: ValidateRuleType.Login, value: loginValue },
      { type: ValidateRuleType.Password, value: passwordValue }
    ]);

    if (errorMessage) {
      this.setProps({
        errorMessage,
        loginValue,
        passwordValue
      });
    } else {
      console.log(`Login form data: ${ValidateRuleType.Login}: ${loginValue}, ${ValidateRuleType.Password}: ${passwordValue}`);
    }
  }

  onChange() {
    const loginEl = this._element?.querySelector('input[name="login"]') as HTMLInputElement;
    const passwordEl = this._element?.querySelector('input[name="password"]') as HTMLInputElement;
    const loginValue = loginEl.value;
    const passwordValue = passwordEl.value;

    this.setProps({
      errorMessage: '',
      loginValue,
      passwordValue
    });
  }

  render() {
    // language=hbs
    return `
      <div>
        <h1 class="header">Добро пожаловать</h1>
        <form id="signin" action="" method="post" class="form">
          {{{Label
            label='Логин'
            type='text'
            name='login'
            placeholder='ivanovanov'
            value=loginValue
            onChange=onChange
          }}}
          {{{Label
            label='Пароль'
            type='password'
            name='password'
            placeholder='***'
            value=passwordValue
            onChange=onChange
          }}}
        </form>
        {{{Button text='Войти' onClick=onSubmit}}}
        <div style="color:red">{{errorMessage}}</div>
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
