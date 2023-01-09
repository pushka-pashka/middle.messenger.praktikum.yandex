import { validateForm, ValidateRuleEnum } from "helpers/validateForm";
import Block from "utils/Block";

export class EditPassword extends Block {
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

    [ValidateRuleEnum.Password, ValidateRuleEnum.PasswordDouble].forEach(
      (rule: ValidateRuleEnum) => {
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
      }
    );

    if (errorData.length) {
      // eslint-disable-next-line
      console.log("onSubmit error:", errorData);
    } else {
      // eslint-disable-next-line
      console.log("EditPassword form data:", data);
    }
  }

  render() {
    // language=hbs
    return `
    <div class="page">
      {{{Sidebar to='../index.html'}}}
      <div class="page__wrapper">
        <div class="page__content">
        {{{IconUser text="Саня" size="l"}}}
        {{{Header size="l" text="Саня"}}}
          <form id="signin" action="" method="post" class="form">
          {{{InputDecorator
            label='Пароль'
            name='password'
            placeholder='*****'
            ref="password"
            onInput=onInput
            onFocus=onFocus
            value='123456*'
          }}}
          {{{InputDecorator
            label='Пароль (еще раз)'
            name='password_double'
            placeholder='*****'
            ref="password_double"
            onInput=onInput
            onFocus=onFocus
            value='123456*'
          }}}
          </form>
          {{{Button text='Изменить пароль' onClick=onSubmit}}}
      </div>
    </div>
    `;
  }
}
