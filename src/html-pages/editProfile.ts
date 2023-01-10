import { renderDOM, registerComponent } from "utils";
import { InputDecorator } from "components/inputDecorator/inputDecorator";
import { Button } from "components/button/button";
import { Input } from "components/input/input";
import { Error as ErrorComponent } from "components/error/error";
import { Header } from "components/header/header";
import { Sidebar } from "components/sidebar/sidebar";
import { EditProfilePage } from "pages/editProfile/editProfile";
import { IconUser } from "components/iconUser/iconUser";

registerComponent(Input);
registerComponent(ErrorComponent);
registerComponent(InputDecorator);
registerComponent(Button);
registerComponent(Header);
registerComponent(Sidebar);
registerComponent(IconUser);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new EditProfilePage());
});
