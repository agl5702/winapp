import { Box,SimpleGrid } from '@chakra-ui/react'
import ListSorteo from '../components/sorteos/ListSorteo'





export default function Sorteos() {
  return (
    <SimpleGrid columns={2} spacing={10} minChildWidth='250px'>      
    <Box m='auto'>
    <Box boxShadow='2xl' mt='5px'>

    </Box>
      <ListSorteo/>
    </Box>
  </SimpleGrid>
  )
}

