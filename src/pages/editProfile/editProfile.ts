import { Block, Store } from "core";
import { ValidateRuleEnum } from "utils/validateForm";
import getFormData from "utils/getFormData";
import { withStore } from "utils/withStore";

interface IEditProfilePage {
  store: Store<AppState>;
  onSubmit: (e: FormDataEvent) => void;
  onInput: (e: InputEvent) => void;
}

export class EditProfilePage extends Block<IEditProfilePage> {
  constructor(props: IEditProfilePage) {
    super(props);

    this.setProps({
      onSubmit: (e: FormDataEvent) => this.onSubmit(e),
      onInput: (e: InputEvent) => this.onInput(e)
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

    getFormData(e, fields, this.element, this.refs);
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
    // const user = this.props.store.getState().user;

    // language=hbs
    return `
    <div class="page">
      {{{Sidebar}}}
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
              value='email@yandex.ru'
            }}}
            {{{InputDecorator
              label='Логин'
              type='text'
              name='login'
              placeholder='sanya'
              ref="login"
              onInput=onInput
              onFocus=onFocus
              value='sanya'
            }}}
            {{{InputDecorator
              label='Имя'
              type='text'
              name='first_name'
              placeholder='Alexandr'
              ref="first_name"
              onInput=onInput
              onFocus=onFocus
              value="Alexandr"
            }}}
            {{{InputDecorator
              label='Фамилия'
              type='text'
              name='second_name'
              placeholder='Alexandrov'
              ref="second_name"
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
            {{{Button type="submit" text='Изменить данные' onClick=onSubmit}}}
          </form>
      </div>
    </div>
    `;
  }
}

export default withStore(EditProfilePage);
