import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  }
  body{
    margin: 0;
    padding: 10px; 
    font-family: Open-Sans, Helvetica, Sans-Serif;
    display: flex;
    flex-direction: column;
    
  }
`;

export default GlobalStyle;