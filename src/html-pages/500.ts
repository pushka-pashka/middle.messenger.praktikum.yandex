import { Error } from "components/error/error";
import { Header, HeaderSizeType } from "components/header/header";
import { ErrorPage } from "pages/ErrorPage/ErrorPage";
import { renderDOM, registerComponent } from "core";
import { Sidebar } from "components/sidebar/sidebar";

registerComponent(Error);
registerComponent(Header);
registerComponent(Sidebar);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(
    new ErrorPage({
      headerText: "500",
      errorText: "Упс! Мы уже чиним...",
      size: HeaderSizeType.l
    })
  );
});
