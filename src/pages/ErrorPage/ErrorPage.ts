import { HeaderSizeType } from "components/header/header";
import Block from "core/Block";

export type ErrorPageProps = {
  size: HeaderSizeType;
  headerText: string;
  errorText: string;
};

export class ErrorPage extends Block {
  constructor(
    headerText = "Заголовок",
    size = "m",
    errorText = "Страница ошибки"
  ) {
    super({ headerText, size, errorText });
  }

  render() {
    // language=hbs
    return `
    <div class="page">
      {{{Sidebar}}}
      <div class="page__wrapper">
        <div class="page__content">
          {{{Header size=size text=headerText}}}
          {{{Error text=errorText size=size}}}
        </div>
      </div>
    </div>
    `;
  }
}

export default ErrorPage;
