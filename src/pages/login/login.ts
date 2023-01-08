import { validateForm, ValidateRuleEnum } from "helpers/validateForm";
import Block from "utils/Block";

export class LoginPage extends Block {
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

    [ValidateRuleEnum.Login, ValidateRuleEnum.Password].forEach(
      (rule: ValidateRuleEnum) => {
        const inputEl = this._element?.querySelector(
          `input[name=${rule}]`
        ) as HTMLInputElement;
        const errorRefEl = this.refs[rule].refs.errorRef;
        const errorMessage = validateForm([
          { type: rule, value: inputEl.value }
        ]);

        if (errorMessage) {
          errorRefEl.setProps({ text: errorMessage });
          errorData.push([rule, errorMessage]);
        } else {
          data.push([rule, inputEl.value]);
        }
      }
    );

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
          </form>
          {{{Button text='Войти' onClick=onSubmit}}}
      </div>
    </div>
    `;
  }
}
