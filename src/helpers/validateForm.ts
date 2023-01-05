type ValidateRule = {
  value: string,
  type: ValidateRuleType
};

export enum ValidateRuleType {
  Login = 'login',
  Password = 'password'
};

export function validateForm(rules: ValidateRule[]) : string | undefined {
  let errorMessage = '';
  for(let i = 0; i < rules.length; i++ ) {
    const { type, value } = rules[i];

    switch(type) {
      case ValidateRuleType.Login:
        if(!value.length) {
          errorMessage = 'Login can not be empty';
          return errorMessage;
        } else if(value.length < 4) {
          errorMessage = 'Login should contains more than 3 letter';
          return errorMessage;
        }
      case ValidateRuleType.Password:
        if(value.length < 4) {
          errorMessage = 'Password should contains more than 3 letter';
          return errorMessage;
        }
      default: break;
    }
  }

  return errorMessage;
}
