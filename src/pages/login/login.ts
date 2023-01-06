import { validateForm, ValidateRuleEnum } from 'helpers/validateForm';
import Block from 'utils/Block';

export class LoginPage extends Block {
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
    } else {
      console.log('onSubmit error')
    };
  }

  render() {
    // language=hbs
    return `
      <div>
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
        </form>
        {{{Button text='Войти' onClick=onSubmit}}}
      </div>
    `;
  }
}
