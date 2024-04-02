import { TorneoList } from '../components/torneos/TorneoList';
import {Box, SimpleGrid, Text} from '@chakra-ui/react'
import  {TorneoFormPages}  from '../pages/torneos/TorneoFormPage'
import Torneo from '../components/torneos/Torneo'
import img1 from '../assets/fondo11.webp';
import img2 from '../assets/fondo12.webp';
import './font1.css'
const images = [img1, img2];


export default function Dashboard() {


  return ( 
    <SimpleGrid columns={2} spacing={10} minChildWidth='250px'>      
      <Box m='auto'>
          <Box boxShadow='2xl' mt='5px'>
          <Torneo images={images}/>
          </Box>

          <TorneoFormPages/>
          <Text textAlign='center' fontFamily='DM Serif Display' fontSize='50px'>Torneos</Text>
          
          <TorneoList/>
      </Box>

    </SimpleGrid>
    
  )
    
}
