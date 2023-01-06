type ValidateRule = {
  value: string,
  type: ValidateRuleType
};

export enum ValidateRuleEnum {
  Login = 'login',
  Password = 'password',
  Email = 'email',
  Name = 'name',
  Surname = 'surname',
  PasswordDouble = 'password_double',
  Phone = 'phone'
};

export type ValidateRuleType = Nullable<ValidateRuleEnum>;

export function inputNameToValidateRuleType(name: string): ValidateRuleType {
  switch(name) {
    case ValidateRuleEnum.Login:
      return ValidateRuleEnum.Login;
    case ValidateRuleEnum.Password:
      return ValidateRuleEnum.Password;
    case ValidateRuleEnum.Email:
      return ValidateRuleEnum.Email;
    case ValidateRuleEnum.Name:
      return ValidateRuleEnum.Name;
    case ValidateRuleEnum.Surname:
      return ValidateRuleEnum.Surname;
    case ValidateRuleEnum.PasswordDouble:
      return ValidateRuleEnum.PasswordDouble;
    case ValidateRuleEnum.Phone:
      return ValidateRuleEnum.Phone;

    default:
      return null
  }
};

export function validateForm(rules: ValidateRule[]) : string | undefined {
  let errorMessage = '';
  const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const NAME_REGEXP = /^[a-zA-Z\-]+$/;
  const PHONE_REGEXP = /^\+?([0-9]{11})+$/;

  for(let i = 0; i < rules.length; i++ ) {
    const { type, value } = rules[i];

    switch(type) {
      case ValidateRuleEnum.Login:
        if(!value.length) {
          errorMessage = 'Введите логин';
          return errorMessage;
        } else if(value.length < 4) {
          errorMessage = 'Логин должен быть больше 3 символов';
          return errorMessage;
        }
        break;
      case ValidateRuleEnum.Password:
        if(value.length < 5) {
          errorMessage = 'Пароль должен быть больше 4 символов';
          return errorMessage;
        }
        break;
      case ValidateRuleEnum.Email:
        if(!EMAIL_REGEXP.test(value)) {
          errorMessage = 'Некорректный email';
          return errorMessage;
        }
        break;
      case ValidateRuleEnum.Name:
        if(!NAME_REGEXP.test(value)) {
          errorMessage = 'Введите имя латинскими буквами';
          return errorMessage;
        }
        break;
      case ValidateRuleEnum.Surname:
        if(!NAME_REGEXP.test(value)) {
          errorMessage = 'Введите фамилию латинскими буквами';
          return errorMessage;
        }
      case ValidateRuleEnum.Phone:
        if(!PHONE_REGEXP.test(value)) {
          errorMessage = 'Некорректный номер';
          return errorMessage;
        }
      default: break;
    }
  }

  return errorMessage;
}
