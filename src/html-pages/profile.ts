import { Button } from '../components/button/button';
import { IconUser } from '../components/iconUser/iconUser';
import { Info } from '../components/info/info';
import { Sidebar } from '../components/sidebar/sidebar';
import { ProfilePage } from '../pages/profile/profile';
import { renderDOM, registerComponent }  from '../utils';

registerComponent(IconUser);
registerComponent(Button);
registerComponent(Info);
registerComponent(Sidebar)

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new ProfilePage());
});
