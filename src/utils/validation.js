// @flow
import { type InputText } from "../types";

type Error = {
  email?: string,
  password?: string,
  username?: string
};

const formValidation = (text: string, type: string): ?string => {
  if (text === "") return "This field is required";

  switch (type) {
    case "email":
      if (!/\S+@\S+\.\S+/.test(text)) {
        return "Not a well formed email address";
      }
      if (text.length > 320) {
        return "Must be 320 or fewer in length";
      }
      return null;

    case "password":
      if (text.length < 6) {
        return "Password must be 6 or more";
      }
      if (text.length > 72) {
        return "Must be 72 or fewer in length";
      }
      return null;

    case "username":
      if (text.length < 2 || text.length > 32) {
        return "Username must be between 2 or 32 in length";
      }
      return null;

    default:
      return null;
  }
};

const validateForm = (payload: InputText): ?Error => {
  const errors = {};

  Object.keys(payload).forEach((type: string) => {
    const errorMessage = formValidation(payload[type], type);
    if (errorMessage) errors[type] = errorMessage;
  });

  if (Object.keys(errors).length === 0) return null;

  return errors;
};

export default validateForm;
