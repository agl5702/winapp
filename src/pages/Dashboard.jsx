import { TorneoList } from '../components/torneos/TorneoList';
import {Box, SimpleGrid, Text} from '@chakra-ui/react'
import { TorneoFormPages } from './torneos/TorneoFormPage'
import Torneo from '../components/torneos/Torneo'
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import {useAuth0} from '@auth0/auth0-react'
import './font1.css'

const images = [img1, img2];


export default function Dashboard() {
  const {user,isAuthenticated}= useAuth0();


  return ( 
    <SimpleGrid columns={2} spacing={10} minChildWidth='250px'>      
      <Box m='auto'>
          <Box boxShadow='2xl' mt='5px'>
          <Torneo images={images}/>
          </Box>

          {isAuthenticated ? (
          <Text mt='30px' textAlign='center' fontFamily='DM Serif Display' fontSize='20px'>
            Bienvenido {user ? user.given_name : 'Invitado'}
          </Text>
        ) : (
          <Text mt='30px' textAlign='center' fontFamily='DM Serif Display' fontSize='20px'>
            Bienvenido Invitado
          </Text>
        )}

          
          <TorneoFormPages/>
          <Text textAlign='center' fontFamily='DM Serif Display' fontSize='50px'>Torneos</Text>
          
          <TorneoList/>
      </Box>

    </SimpleGrid>
    
  )
    
}
