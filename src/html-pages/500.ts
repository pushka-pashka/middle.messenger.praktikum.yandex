import { Error } from 'components/error/error';
import { Header, HeaderSizeType } from 'components/header/header';
import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import { renderDOM, registerComponent }  from 'utils';

registerComponent(Error);
registerComponent(Header);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new ErrorPage({
    headerText: '500',
    errorText: 'Упс! Мы уже чиним...',
    size: HeaderSizeType.l
  }));
});
