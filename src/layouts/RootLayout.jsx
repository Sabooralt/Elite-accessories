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

        <Heading as={'h2'}>Root Layout</Heading>


<main>
    <Outlet/>
</main>
    </div>
  )
}
