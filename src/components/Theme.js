import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../shared/styles/globals';

/** Delete later */
const tempTheme = {
  mode: "light"
};

const Theme = ({ children }) => (
  <ThemeProvider theme={tempTheme}>
    <GlobalStyles />
    {children}
  </ThemeProvider>
);

export default Theme;