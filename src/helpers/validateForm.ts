type ValidateRule = {
  value: string,
  type: ValidateRuleType
};

export enum ValidateRuleEnum {
  Login = 'login',
  Password = 'password',
  Email = 'email',
  FirstName = 'first_name',
  SecondName = 'second_name',
  PasswordDouble = 'password_double',
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
    case ValidateRuleEnum.FirstName:
      return ValidateRuleEnum.FirstName;
    case ValidateRuleEnum.SecondName:
      return ValidateRuleEnum.SecondName;
    case ValidateRuleEnum.PasswordDouble:
      return ValidateRuleEnum.PasswordDouble;
    default:
      return null
  }
};

export function validateForm(rules: ValidateRule[]) : string | undefined {
  let errorMessage = '';
  const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const NAME_REGEXP = /^[a-zA-Z\-]+$/;

  for(let i = 0; i < rules.length; i++ ) {
    const { type, value } = rules[i];

    switch(type) {
      case ValidateRuleEnum.Login:
        if(!value.length) {
          errorMessage = 'Login can not be empty';
          return errorMessage;
        } else if(value.length < 4) {
          errorMessage = 'Login should contains more than 3 letter';
          return errorMessage;
        }
      case ValidateRuleEnum.Password:
        if(value.length < 4) {
          errorMessage = 'Password should contains more than 3 letter';
          return errorMessage;
        }
      case ValidateRuleEnum.Email:
        if(!EMAIL_REGEXP.test(value)) {
          errorMessage = 'Email error';
          return errorMessage;
        }
      case ValidateRuleEnum.FirstName:
        if(!NAME_REGEXP.test(value)) {
          errorMessage = 'Name hould contains only letters';
          return errorMessage;
        }
      case ValidateRuleEnum.SecondName:
        if(!NAME_REGEXP.test(value)) {
          errorMessage = 'Second hould contains only letters';
          return errorMessage;
        }
      default: break;
    }
  }

  return errorMessage;
}
