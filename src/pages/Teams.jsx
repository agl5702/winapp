import {EquiposList} from '../components/equipos/EquiposList'
import { SimpleGrid, Box,Text } from "@chakra-ui/react";
import EquiposForm from './equipos/EquiposForm'
import Equipo from '../components/equipos/Equipos';
import img1 from '../assets/9.webp';
import img2 from '../assets/equipo2.webp';
const images = [img1, img2];

export default function Teams() {
  return (
    <SimpleGrid columns={2} spacing={10} minChildWidth='250px'>      
        <Box m='auto'>
        <Box boxShadow='2xl' mt='5px'>
            <Equipo images={images}/>
        </Box>
          <EquiposForm />
          <Text textAlign='center' fontFamily='DM Serif Display' fontSize='50px'>Equipos</Text>
          <EquiposList/>
        </Box>
      </SimpleGrid>
  )
}
