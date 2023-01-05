import Block from 'utils/Block';
import { validateForm, inputNameToValidateRuleType } from 'helpers/validateForm';
import './inputDecorator.css';

interface InputDecoratorProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  textError: string;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}


export class InputDecorator extends Block {
  constructor(props: InputDecoratorProps) {
    super({
      ...props,
      onBlur: (e: FocusEvent): void => {
        const inputEl = e.target as HTMLInputElement;

        const error = validateForm([
          { type: inputNameToValidateRuleType(props.name), value: inputEl.value}
        ]);

        this.refs.errorRef.setProps({ text: error })
      }
    });
  }

  protected render(): string {
    return `
      <div class="input-decorator">
        <div class="input-decorator__wrapper">
          <span class="input-decorator__label">\{{label}}</span>
          {{{Input
            onInput=onInput
            onFocus=onFocus
            onBlur=onBlur
            name=name
            type=type
            placeholder=placeholder
            value=value
          }}}
        </div>
        <div class="input-decorator__error">
          {{{Error ref="errorRef" text=error}}}
        </div>
      </div>
    `;
  }
}
