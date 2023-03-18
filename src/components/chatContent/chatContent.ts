import { Block } from "core";
import { sendMessage } from "services/chatsService";
import "./chatContent.css";

interface IChatContent {
  chatId: Nullable<number>;
}

export class ChatContent extends Block {
  static componentName = "ChatContent";

  constructor(props: IChatContent) {
    super({
      ...props,
      onSubmit: () => this.onSubmit()
    });
  }

  onSubmit() {
    this.onSendMessage();
  }

  onSendMessage() {
    const textareaEl = this._element?.querySelector(
      "textarea[name='message']"
    ) as HTMLInputElement;
    const { value } = textareaEl;

    if (value) {
      const chatId = window.store.getState().currentChatId;

      window.store.dispatch(sendMessage, { text: value, chatId });
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
          {{{Button size='s' text='Отправить' onClick=onSubmit}}}
        </div>
      </div>
    </div>`;
  }
}
