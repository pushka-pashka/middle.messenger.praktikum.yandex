import { validateForm, ValidateRuleEnum } from "helpers/validateForm";
import Block from "./Block";

export default function onSubmit(
  event: FormDataEvent,
  fields: ValidateRuleEnum[],
  element: Nullable<HTMLElement>,
  refs: { [key: string]: Block }
) {
  event.preventDefault();

  const errorData: [ValidateRuleEnum, string][] = [];
  const data: [ValidateRuleEnum, string][] = [];

  if (!element) {
    return;
  }

  fields.forEach((rule: ValidateRuleEnum) => {
    const inputEl = element.querySelector(
      `input[name=${rule}]`
    ) as HTMLInputElement;

    const errorRefEl = refs[rule].refs.errorRef;
    let errorMessage = validateForm([{ type: rule, value: inputEl.value }]);

    if (!errorMessage && rule === ValidateRuleEnum.PasswordDouble) {
      const passwordEl = element.querySelector(
        `input[name=${ValidateRuleEnum.Password}]`
      ) as HTMLInputElement;
      errorMessage =
        passwordEl.value !== inputEl.value
          ? "Не совпадает с основным паролем"
          : "";
    }

    if (errorMessage) {
      errorRefEl.setProps({ text: errorMessage });
      errorData.push([rule, errorMessage]);
    } else {
      data.push([rule, inputEl.value]);
    }
  });

  if (errorData.length) {
    // eslint-disable-next-line
    console.log("Form error:", errorData);
  } else {
    // eslint-disable-next-line
    console.log("Form data:", data);
  }
}
