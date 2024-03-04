import { Card, CardBody, CardFooter, Heading, Image, Stack,Button,AlertDialog,AlertDialogOverlay,AlertDialogContent,AlertDialogHeader,AlertDialogBody,AlertDialogFooter ,useDisclosure  } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getallEquipos,eliminarJugador} from "../../api/torneos.api";
import {toast} from 'react-hot-toast'
import  { useRef } from 'react';
import { useNavigate} from 'react-router-dom'

export function JugadoresCard({ jugador }) {
  const [equipoNombre, setEquipoNombre] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleEliminar = async () => {
    await eliminarJugador(jugador.id_jugador);
    onClose();
    navigate('/profile');
    window.location.reload();

   
      toast.success('Jugador eliminado', {
        position: 'bottom-right'
      });
  };
  const navigate = useNavigate();

  useEffect(() => {
    // Función asincrónica para obtener el nombre del equipo
    const fetchEquipoNombre = async () => {
      try {
        const response = await getallEquipos();
        const equipos = response.data;
        const equipo = equipos.find((equipo) => equipo.id === jugador.jugador_equipo[0]); // Ajusta según tu estructura de datos
        setEquipoNombre(equipo.nombre);
      } catch (error) {
        console.error("Error al obtener el nombre del equipo:", error);
      }
    };

    // Llamada a la función para obtener el nombre del equipo
    fetchEquipoNombre();
  }, [jugador.jugador_equipo]);

  return (
    <div>
      <Card m='auto' boxShadow='2xl' w={{ base: 'sm', lg: 'sm' }}
        my='10px'
        d='flex'
        textAlign='center'
        flexDirection={{ base: 'column', lg: 'column' }}
        alignItems={{ lg: 'center' }}
        maxW={{ base: 'sm', lg: 'sm' }}
        minHeight='300px'
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        justifyContent='space-between'
        _hover={{ boxShadow: 'dark-lg', transform: 'scale(1.01)' }}
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}
          src='https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-humano_157943-15752.jpg'
          alt='jugador'
          m='auto'
        />

        <Stack>
          <CardBody>
            <Heading size='lg'>{jugador.nombre}</Heading>

            <Heading size='sm'>Id: {jugador.id_jugador}</Heading>
            <Heading size='sm'>Equipo: {equipoNombre}</Heading>
            <Heading size='sm'>N° Ficha: {jugador.numero_ficha}</Heading>
          </CardBody>
        </Stack>
        <CardFooter m='auto'>
        <Button  boxShadow='2xl' mx='1' bg='green.300' flex='1' variant='ghost' onClick={
      ()=>{
        navigate('/editar-jugador/' + jugador.id_jugador)
      }      
     } >
        Editar
      </Button>
      <Button  boxShadow='2xl' mx='1' bg='orange.200' flex='1' variant='ghost' onClick={onOpen}>
        Eliminar
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Eliminar Equipo
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro que quieres eliminar este equipo?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={handleEliminar} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
