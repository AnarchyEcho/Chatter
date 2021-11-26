import { createGlobalStyle, ThemeProvider } from "styled-components"
import SocketsProvider from '../context/socket.context'

const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    font-family: arial;
    background-color: #202020; 
    color: #f5f5f5;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    max-height: 100%;
    max-width: 100%;
  }

  a {
  color: inherit;
  text-decoration: none;
  }

  * {
  box-sizing: border-box;
  }

  /* Scrollbar css */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background-color: #20202000;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #F0CE97;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #F0CE97;
  }
`

const theme = {}

export default function MyApp({ Component, pageProps }) {
  return (
  <SocketsProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  </SocketsProvider>
  )
}