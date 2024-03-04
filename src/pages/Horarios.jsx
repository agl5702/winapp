import {HorariosList} from "../components/horarios/HorariosList";
import HorariosForm from "./horarios/HorariosForm";
import {SimpleGrid, Box} from "@chakra-ui/react";
import Horario from "../components/horarios/Horario";
import img1 from '../assets/horario.png';
import img2 from '../assets/horario2.png';

const images = [img1, img2];

export default function Horarios(){
    return (
      <SimpleGrid columns={2} spacing={10} minChildWidth='250px'>      
        <Box m='auto'>
        <Box boxShadow='2xl' mt='5px'>
          <Horario images={images}/>
        </Box>
            <HorariosForm/>
            <HorariosList/>
        </Box>
      </SimpleGrid>
    )
}
