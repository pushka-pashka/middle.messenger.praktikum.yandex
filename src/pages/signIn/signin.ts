import Block from '../../utils/Block';

export class SignInPage extends Block {
  render() {
    // language=hbs
    return `
      <div>
        <h1 class="header">Регистрация</h1>
        <form id="signin" action="" method="post" class="form">
          {{{Label label='Почта' type='text' name='email' placeholder='pochta@yandex.ru'}}}
          {{{Label label='Логин' type='text' name='login' placeholder='ivanovanov'}}}
          {{{Label label='Имя' type='text' name='first_name' placeholder='Иван'}}}
          {{{Label label='Фамилия' type='text' name='second_name' placeholder='Иванов'}}}
          {{{Label label='Телефон' type='phone' name='phone' placeholder='+7***'}}}
          {{{Label label='Пароль' type='password' name='password' placeholder='***'}}}
          {{{Label label='Пароль (еще раз)' type='password' name='password_double' placeholder='***'}}}
          {{{Button type='submit' text='Зарегистрироваться'}}}
        </form>
      </div>
    `;
  }
}


// <h1 class="header">Регистрация</h1>
// <form id="signin" action="" method="post" class="form">
// 	{{> 'label/label' label='Почта' type='text' name='email' placeholder='pochta@yandex.ru'}}
// 	{{> 'label/label' label='Логин' type='text' name='login' placeholder='ivanovanov'}}
// 	{{> 'label/label' label='Имя' type='text' name='first_name' placeholder='Иван'}}
// 	{{> 'label/label' label='Фамилия' type='text' name='second_name' placeholder='Иванов'}}
// 	{{> 'label/label' label='Телефон' type='phone' name='phone' placeholder='+7***'}}
// 	{{> 'label/label' label='Пароль' type='password' name='password' placeholder='***'}}
// 	{{> 'label/label' label='Пароль (еще раз)' type='password' name='password_double' placeholder='***'}}
// 	{{> 'button/button' type='submit' text='Зарегистрироваться'}}
// </form>
