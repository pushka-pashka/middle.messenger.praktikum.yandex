import renderDOM from "core/renderDOM";
import { Screens } from "utils/ScreenList";
import Block from "./Block";

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

export interface IRoute {
  _pathname: string;
  _blockClass: Nullable<Block>;
  _props: any;
  _block: Nullable<Block>;
}

export default class Route implements IRoute {
  protected _pathname: string;
  protected _blockClass: Block;
  protected _props: any = {};
  protected _block: Nullable<Block> = null;

  constructor(pathname: string, view: Block, props: Block) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
    this._block = null;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
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
