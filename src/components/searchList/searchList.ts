import Block from "core/Block";
import template from "./searchList.hbs";
import "./searchList.css";

export class SearchList extends Block {
  static componentName = "searchList";

  protected render(): string {
    return template;
  }
}
