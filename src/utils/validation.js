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

export const checkFormValidity = inputs => {
  const errors = {};

  inputs.forEach(({ text, type }) => {
    const inputError = formValidation(text, type) || null;
    if (inputError) errors[type] = inputError;
  })

  return errors;
};
