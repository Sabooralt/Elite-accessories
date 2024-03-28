import React, { useEffect, useState } from "react";

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


const theme = extendTheme({
  colors: {
    primary: "#AFEE1F",
    secondary: "#EED91F",
    textC: "#000",
    brand: "#1E1E1E",
    primaryLight: "#9de200d4",
    greyLight: "#D9D9D9",
  },
  shadows: {
    customShadow: "3px 4px 0px 1px rgba(0,0,0,1)",
    cardShadow: "6px 9px 0px 1px #323030",
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
    <ChakraProvider theme={theme}>

      <App/>
    </ChakraProvider>
  </React.StrictMode>
);
