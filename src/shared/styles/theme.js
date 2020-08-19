const COLORS = {
  white: "#fff",
  almostBlack: "#202225",
  darkSmoke: "#36393f",
  lightGrey: "#dcddde",
  darkGrey: "#b9bbbe",
  smoke: "#8e9297",
  red: "#f04747"
};

// const SPACING = {
//   // Example: padding: 5px;
// };

const base = {
  danger: COLORS.red
};

export const lightTheme = {
  ...base
};

export const darkTheme = {
  ...base,

  headerPrimary: COLORS.white,
  headerSecondary: COLORS.darkGrey,
  mainBackground: COLORS.almostBlack,
  primary: COLORS.darkSmoke,
  textNormal: COLORS.lightGrey,
  label: COLORS.smoke
};

export default darkTheme;
