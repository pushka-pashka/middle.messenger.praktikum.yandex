import { Button } from '../components/button/button';
import { Label } from '../components/label/label';
import { Link } from '../components/link/link';
import { LoginPage } from '../pages/login/login';
import { renderDOM, registerComponent }  from '../utils';

registerComponent(Label);
registerComponent(Button);
registerComponent(Link);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new LoginPage);
});
