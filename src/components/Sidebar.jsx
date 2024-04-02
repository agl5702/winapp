// Sidebar.js
import { FaTrophy, FaGamepad } from 'react-icons/fa';
import { List, ListIcon, ListItem,} from '@chakra-ui/react';
import { FaPersonRunning } from 'react-icons/fa6';
import { CgLogOut } from 'react-icons/cg';
import { GiPerspectiveDiceSixFacesTwo } from 'react-icons/gi';
import { RiTeamFill } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoutDialog from './LogoutDialog';
import { logout } from '../api/torneos.api';
const getAccessToken = () => localStorage.getItem('access_token');

export default function Sidebar({ onClose }) {
  const navigate = useNavigate();


  const isLoggedIn = () => {
    const accessToken = getAccessToken();
    return accessToken !== null && accessToken !== ''; // Devuelve true si el token de acceso existe
  };

  const handleCloseDrawer = () => {
    onClose(); // Cierra el drawer
  };
  const handleLogout = () => {

  };
  return (
    <List
      color="white"
      fontSize="1.2em"
      spacing={10}
      p={{ lg: '10', base: '5' }}
      flexWrap="wrap"
      flexDirection="column"
      position={{ lg: 'fixed' }}
      fontWeight="700"
      justifyContent={{ base: 'flex-end', lg: 'space-around' }}
    >
      <ListItem
        display="flex"
        my={{ base: '10px', lg: '10px' }}
        _hover={{ color: { lg: 'black', base: 'none' } }}
        onClick={() => {
          handleCloseDrawer();
          navigate('/');
        }}
      >
        <NavLink to="/" onClick={handleCloseDrawer}>
          <ListIcon as={FaTrophy} color="yellow.300" my="1px" />
          Torneos
        </NavLink>
      </ListItem>
      <ListItem
        display="flex"
        my={{ base: '10px', lg: '10px' }}
        _hover={{ color: 'black' }}
        onClick={() => {
          handleCloseDrawer();
          navigate('/equipos');
        }}
      >
        <NavLink to="/equipos" onClick={handleCloseDrawer}>
          <ListIcon as={RiTeamFill} color="orange.500" my="1px" />
          Equipos
        </NavLink>
      </ListItem>
      <ListItem
        display="flex"
        my={{ base: '10px', lg: '10px' }}
        _hover={{ color: 'black' }}
        onClick={() => {
          handleCloseDrawer();
          navigate('/profile');
        }}
      >
        <NavLink to="/profile" onClick={handleCloseDrawer}>
          <ListIcon as={FaPersonRunning} color="blue.500" my="1px" />
          Jugadores
        </NavLink>
      </ListItem>
      <ListItem
        display="flex"
        my={{ base: '10px', lg: '10px' }}
        _hover={{ color: 'black' }}
        onClick={() => {
          handleCloseDrawer();
          navigate('/partidos');
        }}
      >
        <NavLink to="/partidos" onClick={handleCloseDrawer}>
          <ListIcon as={FaGamepad} color="green" my="1px" />
          Partidos
        </NavLink>
      </ListItem>
      <ListItem
        display="flex"
        my={{ base: '10px', lg: '10px' }}
        _hover={{ color: 'black' }}
        onClick={() => {
          handleCloseDrawer();
          navigate('/sorteos');
        }}
      >
        <NavLink to="/sorteos" onClick={handleCloseDrawer}>
          <ListIcon as={GiPerspectiveDiceSixFacesTwo} color="black" my="1px" />
          Sortear
        </NavLink>
      </ListItem>
      {isLoggedIn() && (
        <ListItem
          display="flex"
          my={{ base: '10px', lg: '10px' }}
          _hover={{ color: 'black' }}
          onClick={handleLogout}
        >
           <LogoutDialog handleLogout={logout} />
        </ListItem>
        
      )}
    </List>
  );
}


