import { Heading } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Navbar'

export default function RootLayout() {
  return (
    <div>
<header>

        <Header/>
</header>


<main>
    <Outlet/>
</main>
    </div>
  )
}
