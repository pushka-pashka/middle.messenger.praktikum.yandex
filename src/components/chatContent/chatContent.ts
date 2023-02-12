import { Block } from "core";
import { sendMessage } from "services/chatsService";
import "./chatContent.css";

export class ChatContent extends Block {
  static componentName = "ChatContent";

  constructor(props) {
    super({ ...props, onSubmit: () => this.onSubmit() });
  }

  onSubmit() {
    const textareaEl = this._element?.querySelector(
      "textarea[name='message']"
    ) as HTMLInputElement;
    const { value } = textareaEl;

    if (value) {
      window.store.dispatch(sendMessage, { text: value });
      textareaEl.value = "";
    }
  }

  render(): string {
    return `
    <div class="chat-content">
      {{{ChatHeader}}}
      <div class="chat-content__body">
        {{{MessagesList}}}
      </div>
      <div class="chat-content__footer">
        {{{Textarea
          ref="message"
          onInput=onInput
          onFocus=onFocus
          type='message'
          name='message'
          placeholder='Введите текст'
          value=value
        }}}
        <div class="chat-content__buttons">
          {{{Sidebar}}}
          {{{Button size='s' text='Отправить' onClick=onSubmit}}}
        </div>
      </div>
    </div>`;
  }
}
