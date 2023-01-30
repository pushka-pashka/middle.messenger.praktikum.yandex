import Block from "core/Block";

export type ErrorPageProps = {
  headerText: string;
};

export class LoadingPage extends Block {
  constructor(headerText = "Загрузка приложения") {
    super({ headerText });
  }

  render() {
    // language=hbs
    return `
    <div class="page page_type_loading">
      <div class="page__wrapper">
        <div class="page__content">
          {{{Header size=size text=headerText}}}
        </div>
      </div>
    </div>
    `;
  }
}

export default LoadingPage;
