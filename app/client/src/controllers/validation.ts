import ILoginInputs from 'components/ILogininInputs';
import IRegisterInputs from '../components/IRegisterInputs';

type setState = React.Dispatch<React.SetStateAction<string>>

function validateEmail(email: string, setError: setState) {
  const isEmail = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (!isEmail) {
    setError(() =>'Incorrect email');
  }
  return isEmail;
}

function validatePassword(pw: string, setError: setState) {
  const minimum9Symbols = /^.{9,}$/
  const containsSpaces = /^[\S]$/
  const containsDigits = /[0-9]/
  const containsSpecialChars = /^[^()@!`~₴;:#№$%^?/\\-_=+| /]*$/
  const containsLowerCaseLetters = /^.*[a-z]+.*$/
  const containsUpperCaseLetters = /^.*[A-Z]+.*$/

  if (!pw.match(minimum9Symbols)) {
    setError(() =>'Password length should be more then 9 symbols');
    return false
  } else if (pw.match(containsSpaces)) {
    setError(() =>'Should not contains spaces');
  } else if (!pw.match(containsDigits)) {
    setError(() =>'Should contains digits');
  } else if (pw.match(containsSpecialChars)) {
    setError(() =>'Should contains special symbols');
  } else if (!pw.match(containsLowerCaseLetters)) {
    setError(() =>'Should contains lower case letters');
  } else if (!pw.match(containsUpperCaseLetters)) {
    setError(() =>'Should contains upper case letters');
  } else {
    return true
  }
}

function validateName(name: string, setError: setState) {
  if (!name) {
    setError('Please enter username');
    return;
  }
  return true;
}

function registerValidation(values: IRegisterInputs, setError: setState) {
  setError('');
  const { email, password, name } = values;
  
  const isValidPassword = validatePassword(password, setError);
  const isValidEmail = validateEmail(email, setError);
  const isValidName = validateName(name, setError);

  const isIncorrectInput = !isValidName || !isValidEmail || !isValidPassword
  
  if(isIncorrectInput) return true
} 

function loginValidation(values: ILoginInputs, setError: setState) {
  setError('');
  const { password, nameOrEmail } = values;
  const isValidPassword = validatePassword(password, setError);
  const isIncorrectInput = !nameOrEmail || !isValidPassword
  if (!nameOrEmail) {
    setError('Please enter your email or username')
  }
  if(isIncorrectInput) return true

} 
export { registerValidation, loginValidation };

