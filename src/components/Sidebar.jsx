import { FaTrophy,FaTable, FaGamepad} from 'react-icons/fa';
import { List, ListIcon, ListItem,} from '@chakra-ui/react'
import { FaPersonRunning } from "react-icons/fa6";
import { GiPerspectiveDiceSixFacesTwo } from "react-icons/gi";
import { RiTeamFill } from "react-icons/ri";
import { NavLink,useNavigate} from 'react-router-dom'

export default function Sidebar({onClose}) {
    const navigate = useNavigate();
    return (
    <List  color='white' fontSize='1.2em' spacing={10} p={{lg:'10', base:'5'}} 
    flexWrap='wrap' flexDirection='column'
    position={{lg:'fixed'}}
    fontWeight='700'
    justifyContent={{base:'flex-end',lg:'space-around'}}
    
    >
        <ListItem display='flex'  my={{base:'10px', lg:'10px'}}  _hover={{color:{lg:'black', base:'none'}}} onClick={() => {
    onClose(); // Cierra el drawer
    navigate('/'); // Navega a la ruta correspondiente
  }} >
            <NavLink to='/'>
                <ListIcon as={FaTrophy} color='yellow.300' my='1px'/>
                Torneos
            </NavLink>
        </ListItem>
        <ListItem  display='flex'  my={{base:'10px', lg:'10px'}}  _hover={{color: 'black'}} onClick={() => {
    onClose(); // Cierra el drawer
    navigate('/equipos'); // Navega a la ruta correspondiente
  }} >
            <NavLink to='/equipos'>
                <ListIcon  as={RiTeamFill} color='orange.500'  my='1px' />
                Equipos
            </NavLink>
        </ListItem>
        <ListItem  display='flex' my={{base:'10px', lg:'10px'}}  _hover={{color: 'black'}}onClick={() => {
    onClose(); // Cierra el drawer
    navigate('/profile'); // Navega a la ruta correspondiente
  }} >
            <NavLink to='/profile'>
                <ListIcon  as={FaPersonRunning} color='blue.500'  my='1px' />
                Jugadores
            </NavLink>
        </ListItem>
        <ListItem  display='flex'  my={{base:'10px', lg:'10px'}}  _hover={{color: 'black'}}onClick={() => {
    onClose(); // Cierra el drawer
    navigate('/horario'); // Navega a la ruta correspondiente
  }} >
            <NavLink to='/horario'>
                <ListIcon  as={FaTable} color='purple.600'  my='1px' />
                Horarios
            </NavLink>
        </ListItem>
        <ListItem  display='flex'  my={{base:'10px', lg:'10px'}}  _hover={{color: 'black'}}onClick={() => {
    onClose(); // Cierra el drawer
    navigate('/partidos'); // Navega a la ruta correspondiente
  }} >
            <NavLink to='/partidos'>
                <ListIcon  as={FaGamepad} color='green'  my='1px' />
                Partidos
            </NavLink>
        </ListItem>
        <ListItem  display='flex'  my={{base:'10px', lg:'10px'}}  _hover={{color: 'black'}}onClick={() => {
    onClose(); // Cierra el drawer
    navigate('/sorteos'); // Navega a la ruta correspondiente
  }} >
            <NavLink to='/sorteos'>
                <ListIcon  as={GiPerspectiveDiceSixFacesTwo} color='black'  my='1px' />
                Sortear
            </NavLink>
        </ListItem>

    </List>
  )
}