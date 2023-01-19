import renderDOM from "core/renderDOM";
import { Screens } from "utils/ScreenList";

// [{path: './',block: component }]
export const routes = [
  { path: "/", screen: Screens.Login },
  { path: "/login", screen: Screens.Login },
  { path: "/signin", screen: Screens.SignIn },
  { path: "/profile", screen: Screens.Profile },
  { path: "/chats", screen: Screens.Chats },
  { path: "/edit-profile", screen: Screens.EditProfile },
  { path: "/edit-password", screen: Screens.EditPassword },
  { path: "/404", screen: Screens.Error },
  { path: "/500", screen: Screens.Error }
];

// TODO: переписать, реализовать
function isEqual(lhs, rhs) {
  return lhs === rhs;
}

export default class Route {
  constructor(pathname, view, props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
    this._block = null;
  }

  navigate(pathname) {
    if (this.match(pathname)) {
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();

      renderDOM(this._block);

      return;
    }

    this._block.show();
  }
}
