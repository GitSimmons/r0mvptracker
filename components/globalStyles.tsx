import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Roboto|Lato|Open+Sans|Oswald&display=swap');
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    background-color: #eee;
    font-size: 14px;
    line-height: 1.5
  }
`;

export default GlobalStyle;
