import { Error } from '../components/error/error';
import { ErrorPage } from '../pages/404/404';
import { renderDOM, registerComponent }  from './../utils';

registerComponent(Error);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new ErrorPage());
});
