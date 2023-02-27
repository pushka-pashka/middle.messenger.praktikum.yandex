import { Block } from "core";
import { ValidateRuleEnum } from "utils/validateForm";
import { getFormData } from "utils/getFormData";
import { withStore } from "utils/withStore";
import { ScreenPath } from "utils/ScreenList";
import { editPassword } from "services/userService";

interface IEditPassword {
  onSubmit: (e: FormDataEvent) => void;
  onInput: (e: InputEvent) => void;
  onNavigateToProfile: () => void;
}

class EditPassword extends Block<IEditPassword> {
  static componentName = "EditPassword";

  constructor(props: IEditPassword) {
    super(props);

    this.setProps({
      onSubmit: (e: FormDataEvent) => this.onSubmit(e),
      onInput: (e: InputEvent) => this.onInput(e),
      onNavigateToProfile: () => this.onNavigateToProfile()
    });
  }

  onNavigateToProfile() {
    window.store.dispatch({
      loginFormError: null
    });

    window.router.go(ScreenPath.Profile);
  }

  onSubmit(e: FormDataEvent) {
    const fields = [ValidateRuleEnum.Password, ValidateRuleEnum.NewPassword];

    const formData = getFormData(e, fields, this.element, this.refs);

    if (formData) {
      window.store.dispatch(editPassword, formData);
    }
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
      {{{Sidebar toPage="${ScreenPath.Chats}"}}}
      <div class="page__wrapper">
        <div class="page__content">
        {{{IconUser text=user.login size="l"}}}
        {{{Header size="l" text=user.login}}}
          <form id="signin" action="" method="post" class="form">
            {{{InputDecorator
              label='Старый пароль'
              name='password'
              placeholder='*****'
              ref="password"
              onInput=onInput
              onFocus=onFocus
              value=''
            }}}
            {{{InputDecorator
              label='Новый пароль'
              name='new_password'
              placeholder='*****'
              ref="new_password"
              onInput=onInput
              onFocus=onFocus
              value=''
            }}}
            {{{Button type="submit" text='Изменить пароль' onClick=onSubmit}}}
            {{{FormError size='m'}}}
          </form>
          {{{Button text='Вернуться в профиль' onClick=onNavigateToProfile}}}
      </div>
    </div>
    `;
  }
}

const mapStateToProps: Partial<IEditPassword> = (state: AppState) => {
  return {
    user: state.user
  };
};

const ComposedEditPassword = withStore(EditPassword, mapStateToProps);

export { ComposedEditPassword as EditPassword };
