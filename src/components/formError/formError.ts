import { IErrorProps } from "components/error/error";
import { Block } from "core";
import { withStore } from "utils/withStore";

class FormError extends Block<IErrorProps> {
  constructor({ text = "", ...props }: IErrorProps) {
    super({ ...props, text });
  }

  static componentName = "FormError";

  protected render(): string {
    return `
      <div class="error error_size_{{size}}" data-id="${this.id}">
        {{#if text}}
          {{text}}
        {{/if}}
      </div>
  `;
  }
}

const mapStateToProps = (state: AppState): Partial<IErrorProps> => {
  return {
    text: state.loginFormError || undefined
  };
};

const ComposedFormError = withStore(FormError, mapStateToProps);

export { ComposedFormError as FormError };
