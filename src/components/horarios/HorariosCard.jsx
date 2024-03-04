import {TableContainer, Table,TableCaption, Thead, Tr,Th,Tbody,Td,Tfoot, Button,useDisclosure   } from "@chakra-ui/react";

export function HorariosCard({horario}){


  const { isOpen, onOpen, onClose } = useDisclosure();

    return <div>
      <TableContainer w={{base: 'sm', lg: '4xl'}} maxW={{base: 'sm', lg: '4xl'}}>
  <Table variant='striped' colorScheme="blue" border='2px solid' >
    <TableCaption >Horario</TableCaption>
    <Thead>
      <Tr >
        <Th border='1px solid'>Fecha</Th>
        <Th border='1px solid'>Hora</Th>
        <Th border='1px solid'>Detalles</Th>
        <Th border='1px solid'>Modificar</Th>
        <Th border='1px solid'>Borrar</Th>
      </Tr>
    </Thead>
    <Tbody border='2px solid'>
      <Tr border='2px solid '>
        <Td>{horario.fecha}</Td>
        <Td>{horario.hora}</Td>
        <Td>{horario.detalles} </Td>
        <Td>
          <Button  boxShadow='2xl' mx='1' bg='green.300' flex='1' variant='ghost' onClick={
      ()=>{
        navigate('/editar-equipo/' + equipo.id)
      }      
     } >
        Editar
      </Button>
      </Td>
      <Td><Button  boxShadow='2xl' mx='1' bg='orange.200' flex='1' variant='ghost' onClick={onOpen}>
        Eliminar
      </Button>
      </Td>

      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Th border='1px solid'>Fecha de  inicio</Th>
        <Th border='1px solid'>Incio del Partido</Th>
        <Th border='1px solid'>Informacion del partido</Th>
      </Tr>
    </Tfoot>
    
  </Table>
  
</TableContainer>

    </div>
}

