import { validateForm, ValidateRuleEnum } from "helpers/validateForm";
import Block from "utils/Block";

export class EditProfilePage extends Block {
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
      ValidateRuleEnum.Name,
      ValidateRuleEnum.Surname,
      ValidateRuleEnum.Phone
    ].forEach((rule: ValidateRuleEnum) => {
      const inputEl = this._element?.querySelector(
        `input[name=${rule}]`
      ) as HTMLInputElement;
      const errorRefEl = this.refs[rule].refs.errorRef;
      const errorMessage = validateForm([{ type: rule, value: inputEl.value }]);

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
      console.log("EditProfile form data:", data);
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
            label='Имя'
            type='text'
            name='name'
            placeholder='Alexandr'
            ref="name"
            onInput=onInput
            onFocus=onFocus
            value="Alexandr"
          }}}
          {{{InputDecorator
            label='Фамилия'
            type='text'
            name='surname'
            placeholder='Alexandrov'
            ref="surname"
            onInput=onInput
            onFocus=onFocus
            value="Alexandrov"
          }}}
          {{{InputDecorator
            label='Телефон'
            type='phone'
            name='phone'
            placeholder='+7**********'
            value="+79781461579"
            ref="phone"
            onInput=onInput
            onFocus=onFocus
          }}}
          </form>
          {{{Button text='Изменить данные' onClick=onSubmit}}}
      </div>
    </div>
    `;
  }
}
