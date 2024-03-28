import "./App.css";
import {
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

//Layout

function App() {
  const location = useLocation();
  const hideNavbarOnPaths = ["/login", "/register"]; // Customize these paths

  const shouldRenderNavbar = !hideNavbarOnPaths.includes(location.pathname);
  return (
    <>
    {shouldRenderNavbar && <Header />}
      

      <Outlet />
    </>
  );
}

export default App;
