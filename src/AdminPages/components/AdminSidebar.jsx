import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
} from '@chakra-ui/react'
import { Link, NavLink } from 'react-router-dom'



const SidebarContent = ({ onClick }) => (
  <VStack spacing={20}>
    <Link to='productmanagement' style={{width: '100%'}}>

    <Button onClick={onClick} w='100%' fontSize='1rem' >
      Product Management
    </Button>
    </Link>

    <Link  to='usermanagement' style={{width: '100%'}}>

    <Button onClick={onClick} w="100%">
      Users Management
    </Button>
    </Link>
    <Button onClick={onClick} w="100%">
      Contact
    </Button>
  </VStack>
)

const AdminSidebar = ({ isOpen, variant, onClose }) => {
  return variant === 'sidebar' ? (
    <Box
      position="fixed"
      left={0}
      p={5}
      w="200px"
      top={0}
      h="100%"
      bg="#dfdfdf"
    >
      <SidebarContent onClick={onClose} />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chakra-UI</DrawerHeader>
          <DrawerBody>
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default AdminSidebar
