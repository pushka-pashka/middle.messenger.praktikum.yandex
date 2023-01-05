import { Button } from 'components/button/button';
import { Error } from 'components/error/error';
import { SignInPage } from 'pages/signIn/signin';
import { InputDecorator } from 'components/inputDecorator/inputDecorator';
import { renderDOM, registerComponent }  from 'utils';
import { Input } from 'components/input/input';

registerComponent(Button);
registerComponent(Error);
registerComponent(InputDecorator);
registerComponent(Input);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new SignInPage());
});
