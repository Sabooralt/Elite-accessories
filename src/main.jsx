import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider,GlobalStyle,extendTheme } from '@chakra-ui/react'
import { Global } from '@emotion/react'



const globalStyles = ()=>{
  <Global styles="@import url('./fonts.css');" />
}
const theme = extendTheme({
  colors: {
    primary : '#AFEE1F',
    secondary : '#EED91F',
    textC: '#000',
    brand: '#1E1E1E',
    primaryLight: '#9de200d4',
    greyLight: '#D9D9D9'
  },
  shadows:{
    customShadow: "3px 4px 0px 1px rgba(0,0,0,1)",
    cardShadow: '6px 9px 0px 1px #323030',
  },

 styles : {
  global: {
    body: {
      background: "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/cover.jpeg')",
      backgroundSize: "cover",
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'

    },
    font:{
      body: 'Poppins'
    }
  },
},
  


});



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      {globalStyles()}
    <App />
    </ChakraProvider>
  </React.StrictMode>,
)
