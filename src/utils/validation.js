export const formValidation = (text, type) => {
  if (text === '') {
    return 'This field is required';
  }

  switch (type) {
    case 'email':
      if (!/\S+@\S+\.\S+/.test(text)) {
        return 'Not a well formed email address';
      }
      return null;
    case 'password':
      if (text.length < 6) {
        return 'Password must be 6 or more';
      }
      return null;
    default:
      return null;
  }
};