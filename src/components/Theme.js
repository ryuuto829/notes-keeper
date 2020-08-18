// @flow
import * as React from "react";
import { ThemeProvider } from "styled-components";
import {
  // lightTheme,
  darkTheme
} from "../shared/styles/theme";
import GlobalStyles from "../shared/styles/globals";

type Props = {
  children: React.Node
};

const Theme = ({ children }: Props) => (
  <ThemeProvider theme={darkTheme}>
    <GlobalStyles />
    {children}
  </ThemeProvider>
);

export default Theme;
