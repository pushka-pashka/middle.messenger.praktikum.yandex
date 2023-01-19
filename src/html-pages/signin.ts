import { Button } from "components/button/button";
import { Header } from "components/header/header";
import { Error } from "components/error/error";
import { SignInPage } from "pages/signIn/signin";
import { InputDecorator } from "components/inputDecorator/inputDecorator";
import { renderDOM, registerComponent } from "core";
import { Input } from "components/input/input";
import { Sidebar } from "components/sidebar/sidebar";

registerComponent(Button);
registerComponent(Error);
registerComponent(InputDecorator);
registerComponent(Input);
registerComponent(Header);
registerComponent(Sidebar);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new SignInPage());
});
