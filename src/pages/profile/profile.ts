import Block from '../../utils/Block';

export class ProfilePage extends Block {
  render() {
    // language=hbs
    return `
      <div>
        {{{Sidebar to='index.hbs'}}}
        <div class="main_content main_content_type_profile">
        <div class="profile">
          {{{IconUser text="СТ"}}}
          <h2 class="header">Саня</h2>
          <div class="profile_info">
            {{{Info label="Имя" text="Александр"}}}
            {{{Info label="Фамилия" text="Терёхин"}}}
            {{{Info label="Логин" text="Саня"}}}
            {{{Info label="Имя в чате" text="Саня"}}}
            {{{Info label="Телефон" text="+7 978 146 151 7"}}}
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

// <div class="profile">
// 	{{> 'avatar/avatar' text="СТ"}}
// 	<h2 class="header">Саня</h2>
// 	<div class="profile_info">
// 		{{> 'info/info' label="Почта" text="terehin@yandex.ru"}}
// 		{{> 'info/info' label="Имя" text="Александр"}}
// 		{{> 'info/info' label="Фамилия" text="Терёхин"}}
// 		{{> 'info/info' label="Логин" text="Саня"}}
// 		{{> 'info/info' label="Имя в чате" text="Саня"}}
// 		{{> 'info/info' label="Телефон" text="+7 978 146 151 7"}}
// 	</div>
// 	<div class="profile_buttons">
// 		{{> 'button/button' type='' text='Изменить данные'}}
// 		{{> 'button/button' type='' text='Изменить пароль'}}
// 		{{> 'button/button' type='' text='Выйти'}}
// 	</div>
// </div>
