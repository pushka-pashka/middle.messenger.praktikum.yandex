import { Error } from '../components/error/error';
import { ServerErrorPage } from '../pages/500/500';
import { renderDOM, registerComponent }  from '../utils';

registerComponent(Error);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new ServerErrorPage());
});
