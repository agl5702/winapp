import { SimpleGrid, Box } from "@chakra-ui/react";
import { PartidosList } from '../components/partidos/PartidosList'
import {PartidosForm} from "./partidos/PartidosForm";

export default function Partidos() {
  return (
    <SimpleGrid columns={2} spacing={10} minChildWidth='250px'>      
    <Box>
        <PartidosForm/>
        <PartidosList/>
    </Box>

  </SimpleGrid>
  )
}
