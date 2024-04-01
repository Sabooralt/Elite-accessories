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
import AnimatedRoutes from "./routes/ClientRoutes.jsx";

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
import { useEffect, useState } from "react";
import { useCategoryContext } from "./hooks/useCategoryContext.jsx";
import { useProductsContext } from "./hooks/useProductsContext.jsx";
import axios from "axios";

function App() {
  // states-variable

  const [loading, setLoading] = useState(false);
  const { dispatch: categoryDispatch } = useCategoryContext();
  const {dispatch: productsDispatch} = useProductsContext();

  //API Hits

  //Category Hit
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4000/api/category");
        categoryDispatch({ type: "SET_CATEGORY", payload: response.data });
      } catch (error) {
        console.log("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [categoryDispatch]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await fetch("http://localhost:4000/api/products");
      const data = await response.json();

      console.log(data);
      if (response.ok) {
        productsDispatch({ type: "SET_PRODUCTS", payload: data });
      }
    };

    fetchAllProducts();
  }, [productsDispatch]);



  return (
    <>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
