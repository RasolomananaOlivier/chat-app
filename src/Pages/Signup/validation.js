/**
 * Return an error object if the form has an invalid input
 */
export function validateSignup(values) {
  const { firstName, lastName, birthday, email } = values;

  const regex = /^[a-zA-Z0-9-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-])/;
  let errors = {};
  if (firstName === '') {
    errors.firstName = 'Required';
  }
  if (lastName === '') {
    errors.lastName = 'Required';
  }
  if (birthday === '') {
    errors.birthday = 'Required';
  }
  if (email === '') {
    errors.email = 'Required';
  } else if (!regex.test(email)) {
    errors.email = 'Invalid email';
  }
  return errors;
}

export function validateLogin(values) {
  const { password, email } = values;

  const regex = /^[a-zA-Z0-9-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-])/;
  let errors = {};

  if (email === '') {
    errors.email = 'Required';
  } else if (!regex.test(email)) {
    errors.email = 'Invalid email';
  }
  if (password === '') {
    errors.password = 'Required';
  }

  if (password.length < 8) {
    errors.password = 'Must be 8 caractere or more';
  }
  return errors;
}

/**
 * Return an error object if the password input was invalid
 */
export function validatePassword(values) {
  const { password, confirmedPassword } = values;

  let errors = {};
  if (password === '') {
    errors.password = 'Required';
  }
  if (confirmedPassword === '') {
    errors.confirmedPassword = 'Required';
  }
  if (password.length < 8) {
    errors.password = 'Must be 8 caractere or more';
  }
  if (password !== confirmedPassword) {
    errors.confirmedPassword = 'Does not match'
  }

  return errors;
}


/**
 * Return an error object if the password input was invalid
 */
export function validatePasswordUpdating(values) {
  const { oldPass, newPass, validatePass } = values;

  let errors = {};
  if (oldPass === '') {
    errors.oldPass = 'Required';
  }
  if (newPass === '') {
    errors.oldPass = 'Required';
  }
  if (validatePass === '') {
    errors.validatePass = 'Required';
  }
  if (oldPass.length < 8) {
    errors.oldPass = 'Must be 8 caractere or more';
  }
  if (newPass.length < 8) {
    errors.newPass = 'Must be 8 caractere or more';
  }
  if (newPass !== validatePass) {
    errors.validatePass = 'Does not match'
  }

  return errors;
}