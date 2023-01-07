import { Error } from 'components/error/error';
import { Header, HeaderSizeType } from 'components/header/header';
import { Sidebar } from 'components/sidebar/sidebar';
import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import { renderDOM, registerComponent }  from 'utils';

registerComponent(Error);
registerComponent(Header);
registerComponent(Sidebar);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new ErrorPage({
    headerText: '404',
    errorText: 'Упс! Обновите страницу',
    size: HeaderSizeType.l
  }));
});
