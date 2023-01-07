import { renderDOM, registerComponent } from 'utils';
import { LoginPage } from 'pages/login/login';
import { InputDecorator } from 'components/inputDecorator/inputDecorator';
import { Button } from 'components/button/button';
import { Input } from 'components/input/input';
import { Error as ErrorComponent } from 'components/error/error';
import { Header } from 'components/header/header';
import { Sidebar } from 'components/sidebar/sidebar';

registerComponent(Input);
registerComponent(ErrorComponent);
registerComponent(InputDecorator);
registerComponent(Button);
registerComponent(Header);
registerComponent(Sidebar);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new LoginPage);
});
