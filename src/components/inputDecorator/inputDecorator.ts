import Block from "core/Block";
import { validateForm, inputNameToValidateRuleType } from "utils/validateForm";
import "./inputDecorator.css";

interface InputDecoratorProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  textError: string;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onBlurExtension?: () => void;
}

export class InputDecorator extends Block {
  constructor(props: InputDecoratorProps) {
    super({
      ...props,
      onBlur: (e: FocusEvent): void => this.onBlur(e)
    });
  }

  onBlur(e: FocusEvent) {
    const inputEl = e.target as HTMLInputElement;

    const error = validateForm([
      {
        type: inputNameToValidateRuleType(this.props.name),
        value: inputEl.value
      }
    ]);

    this.refs.errorRef.setProps({ text: error });

    if (this.getProps().onBlurExtension) {
      this.getProps().onBlurExtension(inputEl.value);
    }
  }

  static componentName = "InputDecorator";

  protected render(): string {
    return `
      <div class="input-decorator">
        <div class="input-decorator__label">\{{label}}</div>
        <div class="input-decorator__wrapper">
          {{{Input
            onInput=onInput
            onFocus=onFocus
            onBlur=onBlur
            name=name
            type=type
            placeholder=placeholder
            value=value
            ref=name
          }}}
          <div class="input-decorator__error">
            {{{Error ref="errorRef" text=error size="s"}}}
          </div>
        </div>
      </div>
    `;
  }
}
