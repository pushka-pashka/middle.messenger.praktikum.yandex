import Block from '../../utils/Block';

export class ServerErrorPage extends Block {
  render() {
    // language=hbs
    return `
      <div>
        <h1 class="header">500</h1>
        {{{Error text='Мы уже фиксим'}}}
      </div>
    `;
  }
}

// hbs
// {{!< default }}

// <h1 class="header">505</h1>
// {{> 'error/error' text='Мы уже фиксим'}}
