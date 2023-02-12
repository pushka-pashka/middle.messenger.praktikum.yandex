type ValidateRule = {
  value: string;
  type: ValidateRuleType;
};

export enum ValidateRuleEnum {
  Login = "login",
  Password = "password",
  Email = "email",
  FirstName = "first_name",
  SecondName = "second_name",
  PasswordDouble = "password_double",
  Phone = "phone",
  ChatName = "chat_name",
  NewPassword = "new_password"
}

export type ValidateRuleType = Nullable<ValidateRuleEnum>;

export function inputNameToValidateRuleType(name: string): ValidateRuleType {
  switch (name) {
    case ValidateRuleEnum.Login:
      return ValidateRuleEnum.Login;
    case ValidateRuleEnum.Password:
      return ValidateRuleEnum.Password;
    case ValidateRuleEnum.Email:
      return ValidateRuleEnum.Email;
    case ValidateRuleEnum.FirstName:
      return ValidateRuleEnum.FirstName;
    case ValidateRuleEnum.SecondName:
      return ValidateRuleEnum.SecondName;
    case ValidateRuleEnum.PasswordDouble:
      return ValidateRuleEnum.PasswordDouble;
    case ValidateRuleEnum.Phone:
      return ValidateRuleEnum.Phone;
    case ValidateRuleEnum.ChatName:
      return ValidateRuleEnum.ChatName;
    case ValidateRuleEnum.NewPassword:
      return ValidateRuleEnum.NewPassword;
    default:
      return null;
  }
}

export function validateForm(rules: ValidateRule[]): string {
  let errorMessage = "";
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const NAME_REGEXP = /^[a-zA-Z\-]+$/;
  const PHONE_REGEXP = /^\+?([0-9]{11})+$/;

  for (let i = 0; i < rules.length; i++) {
    const { type, value } = rules[i];

    switch (type) {
      case ValidateRuleEnum.Login:
        if (!value.length) {
          errorMessage = "Введите логин";
          return errorMessage;
        }
        if (value.length < 4) {
          errorMessage = "Логин должен быть больше 3 символов";
          return errorMessage;
        }
        break;
      case ValidateRuleEnum.Password:
      case ValidateRuleEnum.PasswordDouble:
      case ValidateRuleEnum.NewPassword:
        if (value.length < 5) {
          errorMessage = "Пароль должен быть больше 4 символов";
          return errorMessage;
        }
        break;
      case ValidateRuleEnum.Email:
        if (!EMAIL_REGEXP.test(value)) {
          errorMessage = "Некорректный email";
          return errorMessage;
        }
        break;
      case ValidateRuleEnum.FirstName:
        if (!NAME_REGEXP.test(value)) {
          errorMessage = "Введите имя латинскими буквами";
          return errorMessage;
        }
        break;
      case ValidateRuleEnum.SecondName:
        if (!NAME_REGEXP.test(value)) {
          errorMessage = "Введите фамилию латинскими буквами";
          return errorMessage;
        }
        break;
      case ValidateRuleEnum.Phone:
        if (!PHONE_REGEXP.test(value)) {
          errorMessage = "Некорректный номер";
          return errorMessage;
        }
        break;
      case ValidateRuleEnum.ChatName:
        if (!value.length) {
          errorMessage = "Введите название чата";
          return errorMessage;
        }
        break;
      default:
        break;
    }
  }

  return errorMessage;
}
