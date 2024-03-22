import { Box,SimpleGrid } from '@chakra-ui/react'
import ListSorteo from '../components/sorteos/ListSorteo'
import img1 from '../assets/sorteo.webp';
import Sorteo from '../components/sorteos/Sorteo';


const images = [img1];

export default function Sorteos() {
  return (
    <SimpleGrid columns={2} spacing={10} minChildWidth='250px'>      
    <Box m='auto'>
    <Box boxShadow='2xl' mt='5px'>
      <Sorteo images={images}/>
    </Box>
      <ListSorteo/>
    </Box>
  </SimpleGrid>
  )
}

