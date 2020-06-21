import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../shared/styles/theme';
import GlobalStyles from '../shared/styles/globals';

const Theme = ({ children }) => (
  <ThemeProvider theme={lightTheme}>
    <GlobalStyles />
    {children}
  </ThemeProvider>
);

export default Theme;