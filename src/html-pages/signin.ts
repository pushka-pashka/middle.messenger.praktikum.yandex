import { Button } from '../components/button/button';
import { Label } from '../components/label/label';
import { Link } from '../components/link/link';
import { SignInPage } from '../pages/signIn/signin';
import { renderDOM, registerComponent }  from '../utils';

registerComponent(Label);
registerComponent(Button);
registerComponent(Link);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new SignInPage);
});
