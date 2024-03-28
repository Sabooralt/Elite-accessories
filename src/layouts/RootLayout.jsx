import { Heading } from '@chakra-ui/react'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Navbar'

export default function RootLayout() {
  const location = useLocation();
  const hideNavbarOnPaths = ['/login', '/register']; // Customize these paths

  const shouldRenderNavbar = !hideNavbarOnPaths.includes(location.pathname);

  return (
    <div>
<header>
{shouldRenderNavbar &&  <Header/>}
       
</header>


<main>
    <Outlet/>
</main>
    </div>
  )
}
