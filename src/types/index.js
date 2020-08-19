// @flow

// When passing as a prop it's an input's text,
// when returning -> error message for corresponding input
export type InputText = {
  email: string,
  username?: string,
  password: string
};

export type IconProps = {
  size?: number,
  className?: string,
  fill?: string,
  ...
};
