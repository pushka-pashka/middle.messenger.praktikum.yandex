import Block from "core/Block";
import template from "./search.hbs";
import "./search.css";

interface ISearchProps {
  id: string;
  placeholder?: string;
}
export class Search extends Block<ISearchProps> {
  static componentName = "Search";

  constructor({ placeholder = "Найти", ...props }: ISearchProps) {
    super({ ...props, placeholder });
  }

  protected render(): string {
    return template;
  }
}
