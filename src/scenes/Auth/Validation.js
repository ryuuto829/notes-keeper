export const formValidation = (text, type) => {
  const formedText = text.trim();

  if (formedText === '') {
    return 'This field is required';
  }

  switch (type) {
    case 'email':
      if (!/\S+@\S+\.\S+/.test(formedText)) {
        return 'Not a well formed email address';
      }
      return null;
    case 'password':
      if (formedText.length < 6) {
        return 'Password must be 6 or more';
      }
      return null;
    default:
      return null;
  }
};