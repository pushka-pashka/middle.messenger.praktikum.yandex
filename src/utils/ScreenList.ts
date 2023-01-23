import { BlockClass } from "core/Block";
import ChatsPage from "pages/chats";
import LoginPage from "pages/login/login";
import SignInPage from "pages/signIn";
import ProfilePage from "pages/profile";
import ErrorPage from "pages/ErrorPage";
import EditProfilePage from "pages/editProfile";
import EditPassword from "pages/editPassword";

export enum Screens {
  Login = "login",
  SignIn = "signIn",
  Profile = "profile",
  Chats = "chats",
  EditProfile = "edit-profile",
  EditPassword = "edit-password",
  Error = "error"
}

const map: Record<Screens, BlockClass<any>> = {
  [Screens.Login]: LoginPage,
  [Screens.SignIn]: SignInPage,
  [Screens.Profile]: ProfilePage,
  [Screens.Chats]: ChatsPage,
  [Screens.EditProfile]: EditProfilePage,
  [Screens.EditPassword]: EditPassword,
  [Screens.Error]: ErrorPage
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return map[screen];
};
