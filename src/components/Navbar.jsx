// Navbar.js
import { FaBars } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Heading, 
  Flex,
  Image
} from '@chakra-ui/react';
import logo from '../assets/logo.webp'
import Sidebar from './Sidebar';
import Image1 from '../assets/fondo7.jpg'

const images = [logo];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  
  const handleLinkClick = () => {
    onClose();
    navigate('/');
  };

  const handleLogout = async () => {
    // Lógica de logout aquí
    await logout();
    navigate('/');
    window.location.reload()
    onClose(); // Cerrar el drawer después de logout
  };
  
  return (
    <Flex bgGradient='linear(to-r, white,blue.200,#2A4365)' as='nav' p='10px' justify='space-between' maxH='100px' wrap='wrap' gap='2' margin='auto' alignItems='center' boxShadow='2xl' border='none'> 
      <Heading alignItems='center' display='flex' as='h1' textAlign='left' fontSize='50px'>Win Soft
        <Image width='80px' my='0' src={images} alt=""/>
      </Heading>
      
      <Box display='flex' alignItems='center' alignContent='center'>
        <Button display={{lg:'none', base:'flex'}} m='10px' leftIcon={<FaBars />} color='black' onClick={onOpen} alignItems='center'>
        </Button>
        <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton bg='.200' />
            <DrawerHeader bg='gray.300' textAlign='center'>Menú</DrawerHeader>
            <DrawerBody m='auto' w='100%' textAlign='center' backgroundImage={Image1}  backgroundRepeat='none' bgSize='cover'>
              <Box w='100%' textAlign='center'> 
                <Sidebar onClose={onClose} handleLogout={handleLogout} />
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Flex>
  )
}
