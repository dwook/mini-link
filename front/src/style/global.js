import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-size: 14px;
  }

  button {
    background: transparent;
    border:none;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
