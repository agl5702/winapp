import { SimpleGrid, Box } from "@chakra-ui/react";
import { PartidosList } from '../components/partidos/PartidosList'
import {PartidosForm} from "./partidos/PartidosForm";
import Partido from "../components/partidos/Partidos";
import img1 from '../assets/sorteo1.webp';
import img2 from '../assets/sorteo2.webp';


const images = [img1, img2];
export default function Partidos() {
  return (
    <SimpleGrid columns={2} spacing={10} minChildWidth='250px'>      
    <Box>
    <Box boxShadow='2xl' mt='5px'>
        <Partido images={images}/>
    </Box>
        <PartidosForm/>
        <PartidosList/>
    </Box>

  </SimpleGrid>
  )
}
