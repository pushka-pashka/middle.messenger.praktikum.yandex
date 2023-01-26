import { validateForm, ValidateRuleEnum } from "utils/validateForm";
import Block from "../core/Block";
type FormDataType = Record<ValidateRuleEnum, string>;

export default function getFormData(
  event: FormDataEvent,
  fields: ValidateRuleEnum[],
  element: Nullable<HTMLElement>,
  refs: { [key: string]: Block }
): Nullable<FormDataType> {
  event.preventDefault();

  const errorData: [ValidateRuleEnum, string][] = [];
  const data: FormDataType = {} as FormDataType;

  if (!element) {
    return null;
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
      data[rule] = inputEl.value;
    }
  });

  // if (errorData.length) {
  //   // eslint-disable-next-line
  //   console.log("Form error:", errorData);
  //   return null;
  // } else {
  //   // eslint-disable-next-line
  //   console.log("Form data:", data);
  //   return data;
  // }
  return {
    email: "ya2@yandex.ru",
    first_name: "Pavel2",
    login: "pushka2",
    password: "12345",
    password_double: "12345",
    second_name: "Pupkin2",
    phone: "+79787878782"
  };
}
