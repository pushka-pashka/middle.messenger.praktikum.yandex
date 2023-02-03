import { Error, IErrorProps } from "components/error/error";
import { withStore } from "utils/withStore";

class FormError extends Error<IErrorProps> {
  static componentName = "FormError";
}

const mapStateToProps: Partial<IErrorProps> = (state: AppState) => {
  return {
    text: state.loginFormError
  };
};

const ComposedFormError = withStore(FormError, mapStateToProps);

export { ComposedFormError as FormError };
