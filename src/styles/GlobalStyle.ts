import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html {
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: 'Roboto', sans-serif;
  }

  h1,h2,h3 {
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;

  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;

  }

  button:disabled {
    color: silver;
  }

  label {
    font-size: 2rem;
    color: #fff;
    margin-right: 10px
  }
`

export default GlobalStyle
