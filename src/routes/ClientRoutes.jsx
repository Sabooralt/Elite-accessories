import { Navigate, Route, Routes, useLocation } from "react-router-dom";

//Pages
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Reviews from "../pages/Reviews.jsx";
import NotFound from "../pages/NotFound.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Signup.jsx";
import Help from "../pages/Help.jsx";
import AllProducts from "../pages/AllProducts.jsx";

//Layout
import RootLayout from "../layouts/RootLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

import AdminDashboard from "../AdminPages/dashboard.jsx";
import ManageProducts from "../AdminPages/ManageProducts.jsx";
import InsertProduct from "../AdminPages/InsertProduct.jsx";

import { AnimatePresence } from "framer-motion";
import ManageUsers from "../AdminPages/ManageUsers.jsx";
import CategoryManagement from "../AdminPages/CategoryManagement.jsx";
import Favourites from "../AdminPages/components/Favourites.jsx";
import Settings from "../AdminPages/Settings.jsx";
import UpdateProduct from "../AdminPages/components/UpdateProduct.jsx";
import { useAuthContextProvider } from "../hooks/useAuthContext.jsx";
import MyCart from "../pages/MyCart.jsx";


const AnimatedRoutes = () => {
  const location = useLocation();
  const {user } = useAuthContextProvider();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/login" element={!user? <Login /> : <Navigate to="/"/>} />
          <Route path="/register" element={!user? <Register /> : <Navigate to='/'/>} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/MyCart" element={<MyCart />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        
          <Route path="/admin/" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="productmanagement" element={<ManageProducts />} >
              <Route path="insertProduct" element={<InsertProduct/>}/>
            </Route>
            <Route path="updateProduct/:productId" element={<UpdateProduct/>}/>
            <Route path="usermanagement" element={<ManageUsers />} />
            <Route path="categorymanagement" element={<CategoryManagement />} />
            <Route path="favourites" element={<Favourites />} />
            <Route path="settings" element={<Settings />} />
          </Route>
     
      </Routes>
    </AnimatePresence>
  );
};
export default AnimatedRoutes;
