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

const AnimatedRoutes = () => {
  const location = useLocation();
 
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/admin/" element={<AdminLayout/>}>

        <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="insert" element={<InsertProduct />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
 /*  const location = useLocation();
  const hideNavbarOnPaths = ["/login", "/register"]; // Customize these paths

  const shouldRenderNavbar = !hideNavbarOnPaths.includes(location.pathname); */
  return (
    <>
   <BrowserRouter>
   <AnimatedRoutes/>
   </BrowserRouter>
    </>
  );
}

export default App;
