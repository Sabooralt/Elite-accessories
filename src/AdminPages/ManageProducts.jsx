import {Heading, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import InsertProduct from './components/InsertProduct'
import AdminProducts from './components/AdminProducts'
import AddCategory from './components/AddCategory'

export default function ManageProducts() {
  return (
<>


    <div className='container mt-5 text-align-center d-flex flex-column  justify-content-center align-items-center'  style={{zIndex: 9}}>
      <Heading fontSize={'xxx-large'}>
        Manage Products
      </Heading>

      <Tabs w={'100%'}>
  <TabList>
    <Tab>Insert Product</Tab>
    <Tab>Products</Tab>
    <Tab>Add Category</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
      <InsertProduct/>
    </TabPanel>
    <TabPanel>
     <AdminProducts/>
    </TabPanel>
    <TabPanel>
    <AddCategory/>
    </TabPanel>
  </TabPanels>
</Tabs>

      
      </div>
      <Outlet/>
</>
  )
}
