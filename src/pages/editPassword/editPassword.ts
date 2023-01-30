import { ValidateRuleEnum } from "utils/validateForm";
import Block from "core/Block";
import onSubmit from "utils/getFormData";

export class EditPassword extends Block {
  constructor() {
    super();

    this.setProps({
      onSubmit: (e: FormDataEvent) => this.onSubmit(e),
      onInput: (e: InputEvent) => this.onInput(e)
    });
  }

  onSubmit(e: FormDataEvent) {
    const fields = [ValidateRuleEnum.Password, ValidateRuleEnum.PasswordDouble];

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
            {{{Button type="submit" text='Изменить пароль' onClick=onSubmit}}}
          </form>
      </div>
    </div>
    `;
  }
}

export default EditPassword;
