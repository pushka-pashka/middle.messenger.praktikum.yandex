import Block from "utils/Block";

export class ChatsPage extends Block {
  render() {
    // language=hbs
    return `
    <div class="page">
      <div class="page__wrapper">
        {{{ChatsList}}}
        {{{ChatContent}}}
      </div>
    </div>
    `;
  }
}
