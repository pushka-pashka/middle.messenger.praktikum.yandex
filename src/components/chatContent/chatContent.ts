import Block from "utils/Block";
import "./chatContent.css";

export class ChatContent extends Block {
  static componentName = "ChatContent";

  constructor() {
    super();

    this.setProps({
      onSubmit: () => {
        const textareaEl = this._element?.querySelector(
          "textarea[name='message']"
        ) as HTMLInputElement;
        const { value } = textareaEl;

        if (value) {
          // eslint-disable-next-line
          console.log("Message:", textareaEl.value);
          debugger;
          const textareaRefEl = this.refs.message;
          textareaRefEl.setProps({ value: "" });
        }
      }
    });
  }

  render(): string {
    return `
    <div class="chat-content">
      <div class="chat-content__header">
        {{{ChatItem type="reverse" name='Masha Vershinina' status='уже 1032 сообщения'}}}
      </div>
    <div class="chat-content__body">
      {{{Message sender="Masha" date="10:10, Сегодня" text="Привет!"}}}
      {{{Message sender="" date="10:11, Сегодня" text="Привет, кошка"}}}
      {{{Message sender="Masha" date="10:11, Сегодня" text="Что делаешь?"}}}
      {{{Message sender="" date="10:11, Сегодня" text="Туплю в телефон!"}}}
      {{{Message sender="" date="10:11, Сегодня" text="А ты?"}}}
      {{{Message sender="" date="10:17, Сегодня" text="Эй, ты где?"}}}
      {{{Message sender="Masha" date="10:17, Сегодня" text="Тут, тут, рядом в телефон пырюсь"}}}
      {{{Message sender="Masha" date="10:12, Сегодня" text="Компьютер ночью не положен,
        И соблюдая сей режим,Мы с телефонами в обнимку Лежим"}}}
    </div>
    <div class="chat-content__footer">
      {{{Textarea
        ref="message"
        onInput=onInput
        onFocus=onFocus
        type='message'
        name='message'
        placeholder='Введите текст'
      }}}
      <div class="chat-content__buttons">
        {{{Sidebar to='../index.html'}}}
        {{{Button size='s' text='Отправить' onClick=onSubmit}}}
      </div>
      </div>
    </div>`;
  }
}
