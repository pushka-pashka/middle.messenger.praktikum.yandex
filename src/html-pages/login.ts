import { renderDOM, registerComponent } from 'utils';
import { LoginPage } from 'pages/login/login';
import { InputDecorator } from 'components/inputDecorator/inputDecorator';
import { Button } from 'components/button/button';
import { Input } from 'components/input/input';
import { Error as ErrorComponent } from 'components/error/error';
import { Header } from 'components/header/header';

registerComponent(Input);
registerComponent(ErrorComponent);
registerComponent(InputDecorator);
registerComponent(Button);
registerComponent(Header);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new LoginPage);
});
