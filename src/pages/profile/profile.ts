import Block from "utils/Block";

export class ProfilePage extends Block {
  render() {
    // language=hbs
    return `
    <div class="page">
      {{{Sidebar to='../index.html'}}}
      <div class="page__wrapper">
        <div class="page__content">
          {{{IconUser text="Саня" size="l"}}}
          {{{Header size="l" text="Саня"}}}
          <div class="profile_info">
            {{{Info label="Имя" text="Александр"}}}
            {{{Info label="Фамилия" text="Александров"}}}
            {{{Info label="Логин" text="Саня"}}}
            {{{Info label="Имя в чате" text="Саня"}}}
            {{{Info label="Телефон" text="+79781461517"}}}
          </div>
          <div class="profile_buttons">
            {{{Button type='' text='Изменить данные'}}}
            {{{Button type='' text='Изменить пароль'}}}
            {{{Button type='' text='Выйти'}}}
          </div>
        </div>
      </div>
    </div>
    `;
  }
}
