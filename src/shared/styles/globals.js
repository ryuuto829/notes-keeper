import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-family: "Open Sans", Helvetica, Arial, sans-serif;
    font-weight: 400;
    color: ${({ theme }) => theme.text};
  }
`;
