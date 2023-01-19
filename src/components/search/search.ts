import Block from "core/Block";
import template from "bundle-text:./search.hbs";
import "./search.css";

export class Search extends Block {
  static componentName = "Search";

  protected render(): string {
    return template;
  }
}
