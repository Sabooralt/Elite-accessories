
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

//Components
import Footer from './components/Footer.jsx'
import Header from './components/Navbar.jsx'

//Pages
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Reviews from './pages/Reviews.jsx'

//Layout 
import RootLayout from './layouts/RootLayout.jsx'
import NotFound from './pages/NotFound.jsx'
import Login_Signup from './pages/Login-Signup.jsx'


const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='/aboutus' element={<About/>}/>
        <Route path='/reviews' element={<Reviews/>}/>
        <Route path='*' element={<NotFound/>}></Route>
        <Route path='login' element={<Login_Signup/>}></Route>
      </Route>
    )
  
)
function App() {

  return (
   <>

 <RouterProvider router={router}/>

   </>


  )
}

export default App
