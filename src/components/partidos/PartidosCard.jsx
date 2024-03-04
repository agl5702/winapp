import { useState, useEffect } from 'react';
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from "@chakra-ui/react";
import { getallHorarios, getallEquipos } from "../../api/torneos.api";

export function PartidosCard({ partido }) {
  const [horarioNombre, setHorarioNombre] = useState("");
  const [equipoLocal, setEquipoLocal] = useState("");
  const [equipoVisitante, setEquipoVisitante] = useState("");

  useEffect(() => {
    // Función asincrónica para obtener el nombre del horario
    const fetchHorarioNombre = async () => {
      try {
        const response = await getallHorarios();
        const horarios = response.data;
        const horario = horarios.find((horario) => horario.id === partido.horario_partido);
        setHorarioNombre(horario ? horario.fecha : '');
      } catch (error) {
        console.error("Error al obtener el nombre del horario:", error);
      }
    };

    // Función asincrónica para obtener los nombres de los equipos
    const fetchEquipoNombre = async () => {
      try {
        const response = await getallEquipos();
        const equipos = response.data;
        const equipolocal = equipos.find((equipolocal) => equipolocal.id === partido.equipo_local[0]);
        setEquipoLocal(equipolocal.nombre);
        const equipovisitante =  equipos.find((equipovisitante) => equipovisitante.id === partido.equipo_visitante[0]);
        setEquipoVisitante(equipovisitante.nombre);
      } catch (error) {
        console.error("Error al obtener el nombre del equipo:", error);
      }
    };

    // Llamada a las funciones solo si hay cambios en las dependencias
    fetchHorarioNombre();
    fetchEquipoNombre();
  }, [partido.horario_partido, partido.equipo_local, partido.equipo_visitante]);

  return (
    <div>
      <TableContainer w={{ base: 'sm', lg: '4xl' }} maxW={{ base: 'sm', lg: '4xl' }}>
        <Table variant='striped' colorScheme="blue" border='2px solid'>
          <TableCaption >Partidos</TableCaption>
          <Thead>
            <Tr>
              <Th border='1px solid'>Equipo Local</Th>
              <Th border='1px solid'>Equipo visitante</Th>
              <Th border='1px solid'>Gol Local</Th>
              <Th border='1px solid'>Gol Visitante</Th>
              <Th border='1px solid'>Horario</Th>
            </Tr>
          </Thead>
          <Tbody border='2px solid'>
            <Tr border='2px solid '>
              <Td>{equipoLocal}</Td>
              <Td>{equipoVisitante}</Td>
              <Td>{partido.gol_local}</Td>
              <Td>{partido.gol_visitante}</Td>
              <Td>{horarioNombre}</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Td border='1px solid'></Td>
              <Td border='1px solid'></Td>
              <Td border='1px solid'></Td>
              <Td border='1px solid'></Td>
              <Td border='1px solid'>Informacion</Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
}
