import { Block } from "core";
import { ValidateRuleEnum } from "utils/validateForm";
import { FormDataType, getFormData, isSameUserFields } from "utils/getFormData";
import { withStore } from "utils/withStore";
import { editProfile } from "services/userService";
import { ScreenPath } from "utils/ScreenList";

interface IEditProfilePage {
  onSubmit: (e: FormDataEvent) => void;
  onInput: (e: InputEvent) => void;
  onNavigateToProfile: () => void;
  user: Nullable<User>;
}

class EditProfilePage extends Block<IEditProfilePage> {
  static componentName = "EditProfilePage";

  constructor(props: IEditProfilePage) {
    super(props);

    this.setProps({
      onSubmit: (e: FormDataEvent) => this.onSubmit(e),
      onInput: (e: InputEvent) => this.onInput(e),
      onNavigateToProfile: () => this.onNavigateToProfile()
    });
  }

  onSubmit(e: FormDataEvent) {
    const fields = [
      ValidateRuleEnum.Email,
      ValidateRuleEnum.Login,
      ValidateRuleEnum.FirstName,
      ValidateRuleEnum.SecondName,
      ValidateRuleEnum.Phone
    ];

    const formData: Nullable<FormDataType> = getFormData(
      e,
      fields,
      this.element,
      this.refs
    );

    if (formData) {
      const user = this.getProps().user;
      const isUserNotChange = isSameUserFields(user, formData);

      if (isUserNotChange) {
        window.store.dispatch({ loginFormError: "Данные не были изменены" });
      } else {
        window.store.dispatch(editProfile, formData);
      }
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

  onNavigateToProfile() {
    window.store.dispatch({
      loginFormError: null
    });

    window.router.go(ScreenPath.Profile);
  }

  render() {
    const user = this.getProps().user;

    // language=hbs
    return `
    <div class="page">
      {{{Sidebar toPage="${ScreenPath.Chats}"}}}
      <div class="page__wrapper">
        <div class="page__content">
        {{{Header size="l" text="Редактирование профиля"}}}
          <form id="signin" action="" method="post" class="form">
            {{{InputDecorator
              label='Почта'
              type='text'
              name='email'
              placeholder='email@yandex.ru'
              ref="email"
              onInput=onInput
              onFocus=onFocus
              value="${user?.email || ""}"
            }}}
            {{{InputDecorator
              label='Логин'
              type='text'
              name='login'
              placeholder='sanya'
              ref="login"
              onInput=onInput
              onFocus=onFocus
              value="${user?.login || ""}"
            }}}
            {{{InputDecorator
              label='Имя'
              type='text'
              name='first_name'
              placeholder='Alexandr'
              ref="first_name"
              onInput=onInput
              onFocus=onFocus
              value="${user?.firstName || ""}"
            }}}
            {{{InputDecorator
              label='Фамилия'
              type='text'
              name='second_name'
              placeholder='Alexandrov'
              ref="second_name"
              onInput=onInput
              onFocus=onFocus
              value="${user?.secondName || ""}"
            }}}
            {{{InputDecorator
              label='Телефон'
              type='phone'
              name='phone'
              placeholder='+7**********'
              value="${user?.phone || ""}"
              ref="phone"
              onInput=onInput
              onFocus=onFocus
            }}}
            {{{Button type="submit" text='Изменить данные' onClick=onSubmit}}}
            {{{FormError size='m'}}}
          </form>
          {{{Button text='Вернуться в профиль' onClick=onNavigateToProfile}}}
      </div>
    </div>
    `;
  }
}

const mapStateToProps = (state: AppState): Partial<IEditProfilePage> => {
  return {
    user: state.user
  };
};

const ComposedEditProfilePage = withStore(EditProfilePage, mapStateToProps);

export { ComposedEditProfilePage as EditProfilePage };
