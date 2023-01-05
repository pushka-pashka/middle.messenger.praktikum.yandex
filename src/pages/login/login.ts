import Block from '../../utils/Block';

export class LoginPage extends Block {
  constructor() {
    super()

    this.setProps({
      onSubmit: this.onSubmit
    })
  }

  onSubmit() {
    console.log('Login submit clicked');
  }

  render() {
    // language=hbs
    return `
      <div>
        <h1 class="header">Добро пожаловать</h1>
        <form id="signin" action="" method="post" class="form">
          {{{Label label='Логин' type='text' name='login' placeholder='ivanovanov'}}}
          {{{Label label='Пароль' type='password' name='password' placeholder='***'}}}
          {{{Button text='Войти' onClick=this.onSubmit}}}
        </form>
      </div>
    `;
  }
}

// hbs
// <h1 class="header">Добро пожаловать</h1>
// <form id="signin" action="" method="post" class="form">
//   {{> 'label/label' label='Логин' type='text' name='login' placeholder='ivanovanov'}}
//   {{> 'label/label' label='Пароль' type='password' name='password' placeholder='***'}}
//   {{> 'button/button' type='submit' text='Войти'}}
// </form>
