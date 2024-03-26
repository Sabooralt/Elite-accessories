import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider,extendTheme } from '@chakra-ui/react'



const colors = {
  primary : '#AFEE1F',
  secondary : '#EED91F',
  textC: '#000',
  brand: '#1E1E1E'
}
const styles = {
  global: {
    body:{

      background: "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/cover.jpeg')",
        backgroundSize: "cover",
    }
  }
}
const theme = extendTheme({colors,styles});



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
  </React.StrictMode>,
)
