import "./App.css";
import {
  BrowserRouter,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
} from "react-router-dom";

//Components
import Header from "./components/Navbar.jsx";
import AnimatedRoutes from "./routes/ClientRoutes.jsx"



//Pages
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Reviews from "./pages/Reviews.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Signup.jsx";
import Help from "./pages/Help.jsx";
import AllProducts from "./pages/AllProducts.jsx";

//Layout
import RootLayout from "./layouts/RootLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminDashboard from "./AdminPages/dashboard.jsx";
import ManageProducts from "./AdminPages/ManageProducts.jsx";
import InsertProduct from "./AdminPages/InsertProduct.jsx";
import { AnimatePresence } from "framer-motion";



function App() {

  return (
    <>
   <BrowserRouter>
   <AnimatedRoutes/>
   </BrowserRouter>
    </>
  );
}

export default App;
