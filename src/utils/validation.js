const formValidation = (text, type) => {
  if (text === '') {
    return 'This field is required';
  }

  switch (type) {
    case 'email':
      if (!/\S+@\S+\.\S+/.test(text)) {
        return 'Not a well formed email address';
      }
      if (text.length > 320) {
        return 'Must be 320 or fewer in length';
      }
      return null;
    case 'password':
      if (text.length < 6) {
        return 'Password must be 6 or more';
      }
      if (text.length > 72) {
        return 'Must be 72 or fewer in length';
      }
      return null;
    case 'username':
      if (text.length < 2 || text.length > 32) {
        return 'Username must be between 2 or 32 in length';
      }
      return null;
    default:
      return null;
  }
};

export const checkEmailValidity = text => (
  formValidation(text, 'email')
);

export const checkPasswordValidity = text => (
  formValidation(text, 'password')
);

export const checkUsernameValidity = text => (
  formValidation(text, 'username')
);

export const validateLoginForm = (email, password) => {
  const errors = {};
  const emailError = checkEmailValidity(email);
  const passwordError = checkPasswordValidity(password);

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return errors;
};

export const validateRegisterForm = (email, username, password) => {
  const errors = {};
  const emailError = checkEmailValidity(email);
  const usernameError = checkUsernameValidity(username);
  const passwordError = checkPasswordValidity(password);

  if (emailError) errors.email = emailError;
  if (usernameError) errors.username = usernameError;
  if (passwordError) errors.password = passwordError;

  return errors;
};
