import { Button } from "components/button/button";
import { IconUser } from "components/iconUser/iconUser";
import { Info } from "components/info/info";
import { Sidebar } from "components/sidebar/sidebar";
import { ProfilePage } from "pages/profile/profile";
import { renderDOM, registerComponent } from "utils";
import { Header } from "components/header/header";

registerComponent(IconUser);
registerComponent(Button);
registerComponent(Info);
registerComponent(Sidebar);
registerComponent(Header);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new ProfilePage());
});
