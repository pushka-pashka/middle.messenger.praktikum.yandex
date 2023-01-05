import Block from '../../utils/Block';

export class ErrorPage extends Block {
  render() {
    // language=hbs
    return `
      <div>
        <h1 class="header">404</h1>
        {{{Error text='Упс! Ошибка'}}}
      </div>
    `;
  }
}

//hbs
// {{!< default }}
// <h1 class="header">404</h1>
// {{> 'error/error' text='Упс! Ошибка'}}
