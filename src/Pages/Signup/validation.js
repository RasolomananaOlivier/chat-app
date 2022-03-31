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