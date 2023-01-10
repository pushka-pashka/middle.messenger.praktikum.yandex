import { ValidateRuleEnum } from "helpers/validateForm";
import Block from "utils/Block";
import onSubmit from "utils/submitForm";

export class LoginPage extends Block {
  constructor() {
    super();

    this.setProps({
      onSubmit: (e: FormDataEvent) => this.onSubmit(e),
      onInput: (e: InputEvent) => this.onInput(e)
    });
  }

  onSubmit(e: FormDataEvent) {
    const fields = [ValidateRuleEnum.Login, ValidateRuleEnum.Password];

    onSubmit(e, fields, this.element, this.refs);
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
      </div>
    </div>
    `;
  }
}
