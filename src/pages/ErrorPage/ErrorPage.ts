import { HeaderSizeType } from 'components/header/header';
import Block from 'utils/Block';

export type ErrorPageProps = {
  size: HeaderSizeType
  headerText: string;
  errorText: string;
}

export class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super({...props})
  }

  render() {
    // language=hbs
    return `
      <div>
        {{{Header size=size text=headerText}}}
        {{{Error text=errorText}}}
      </div>
    `;
  }
}
