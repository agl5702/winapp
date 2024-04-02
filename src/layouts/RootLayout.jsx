import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Grid, GridItem, Box } from '@chakra-ui/react';
import Image from '../assets/fondo7.jpg';
import Sidebar from '../components/Sidebar';
import { Outlet,Navigate } from 'react-router-dom';




const Image1 = [Image];

export default function RootLayout() {
  const location = useLocation();
  const accessToken = localStorage.getItem('access_token');
  // Verificar si la ubicación actual es la página de inicio de sesión
  const isLoginPage = 
  location.pathname.toLowerCase() === '/login'
  || location.pathname.toLowerCase() === '/register'
  || location.pathname.toLowerCase() === '/reset-password'
  || location.pathname.toLowerCase() === '/form-reset-password';

  if (isLoginPage && accessToken) {
    return <Navigate to="/" replace />;
  }

  // Si la ubicación actual no es la página de inicio de sesión y no hay un token de acceso,
  // redireccionar al usuario a la página de inicio de sesión
  if (!isLoginPage && !accessToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Grid templateColumns='repeat(6, 1fr)' bg='gray.50' px='0px' m='0px' maxWidth='100vw'>
      {!isLoginPage &&  (
        <GridItem
          as='aside'
          backgroundImage={Image1}
          backgroundRepeat='none'
          bgSize='cover'
          colSpan={{ base: 6, lg: 2, xl: 1 }}
          minHeight={{ lg: '100vh' }}
          borderRight={{ lg: '8px solid', base: 'none' }}
          borderRightColor={{ base: 'none', lg: 'blue.300' }}
          borderBottom={{ base: 'none', lg: 'none' }}
          borderBottomColor={{ base: 'none', lg: 'none' }}>
          <Box display={{ base: 'none', lg: 'flex' }} textAlign='center' m='auto'>
            <Sidebar />
          </Box>
        </GridItem>
      )}
      {!isLoginPage && (
        <GridItem as='main' colSpan={{ base: 6, lg: 4, xl: 5 }} px='0px' m='0px'>
          <Navbar />
          <Outlet />
        </GridItem>
      )}
      {isLoginPage && (
        <GridItem as='main' colSpan={6} px='0px' m='0px'>
          <Outlet />
        </GridItem>
      )}
    </Grid>
  );
}
