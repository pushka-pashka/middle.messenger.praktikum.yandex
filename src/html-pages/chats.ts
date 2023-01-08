import { Error } from "components/error/error";
import { Header } from "components/header/header";
import { ChatsPage } from "pages/chats/chats";
import { renderDOM, registerComponent } from "utils";
import { Search } from "components/search/search";
import { ChatsList } from "components/chatsList/chatsList";
import ChatItem from "../components/chatItem";
import IconUser from "../components/iconUser";
import { ChatContent } from "../components/chatContent/chatContent";
import Sidebar from "../components/sidebar";
import { Message } from "../components/message/message";
import InputDecorator from "../components/inputDecorator";
import Button from "../components/button";
import Input from "../components/input";
import Textarea from "../components/textarea";

registerComponent(Error);
registerComponent(Sidebar);
registerComponent(Header);
registerComponent(Search);
registerComponent(ChatsList);
registerComponent(ChatItem);
registerComponent(IconUser);
registerComponent(ChatContent);
registerComponent(Message);
registerComponent(InputDecorator);
registerComponent(Button);
registerComponent(Input);
registerComponent(Textarea);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new ChatsPage());
});
