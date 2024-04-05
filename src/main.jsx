import React from "react";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import "@fontsource/poppins";
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import { ProductContextProvider } from "./context/ProductContext.jsx";
import { CategoryContextProvider } from "./context/CategoryContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { ReviewContextProvider } from "./context/ReviewContext.jsx";

const theme = extendTheme({
  config: {
    useSystemColorMode: true,
  },
  colors: {
    primary: "#AFEE1F",
    secondary: "#EED91F",
    primaryGradient: "#F5FFDE",
    textC: "#000",
    brand: "#1E1E1E",
    primaryLight: "#C5FF42",
    greyLight: "#D9D9D9",
    buttonColor: "#EAEDEF",
    
  },
  shadows: {
    customShadow: "3px 4px 0px 1px rgba(0,0,0,1)",
    cardShadow: "6px 9px 0px 1px #323030",
    circleShadow: "0px 0px 6px 0px rgba(0,0,0,0.75)",
  },

  radii: {
    customA: "12px",
    customB: "50px",
  },
  fonts: {
    body: `'Poppins', sans-serif`,
    heading: `'Poppins', sans-serif`,
  },
  styles: {
    global: {
      body: {
        background:
          "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/cover.jpeg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <ProductContextProvider>
          <CategoryContextProvider>
            <CartContextProvider>
              <ReviewContextProvider>
                <App />
              </ReviewContextProvider>
            </CartContextProvider>
          </CategoryContextProvider>
        </ProductContextProvider>
      </ChakraProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
