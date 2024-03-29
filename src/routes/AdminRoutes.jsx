/* import AdminLayout from "../layouts/AdminLayout.jsx";
import AdminDashboard from "../AdminPages/dashboard.jsx";
import ManageProducts from "../AdminPages/ManageProducts.jsx";
import InsertProduct from "../AdminPages/InsertProduct.jsx";
import { Route, Routes, useLocation } from "react-router-dom";


const AdminRoutes = ()=>{
    return(
        <Routes>

        <Route path="admin/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<ManageProducts />} />
        <Route path="insert" element={<InsertProduct />} />
      </Route>
        </Routes>
    )
}
export default AdminRoutes */