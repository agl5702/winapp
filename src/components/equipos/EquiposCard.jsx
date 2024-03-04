import { Card, CardBody, CardFooter, Heading,  Stack, Button, Icon,AlertDialog,AlertDialogOverlay,AlertDialogContent,AlertDialogHeader,AlertDialogBody,AlertDialogFooter ,useDisclosure } from "@chakra-ui/react";
import { FaShieldAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom'
import { eliminarEquipo,getallTorneos } from "../../api/torneos.api";
import {toast} from 'react-hot-toast'
import { useRef } from 'react';

export function EquiposCard({equipo}){
  const [torneoNombre, setTorneoNombre] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = useRef();

  const handleEliminar = async () => {
    await eliminarEquipo(equipo.id);
    onClose();
    navigate('/equipos');
    window.location.reload();

   
      toast.success('Torneo eliminado', {
        position: 'bottom-right'
      });
  };

  const navigate = useNavigate();


  useEffect(() => {
    // Función asincrónica para obtener el nombre del torneo
    const fetchTorneoNombre = async () => {
      try {
        const response = await getallTorneos();
        const torneos = response.data;
        //console.log("Torneos:", torneos); // Check if torneos array is populated
        const torneo = torneos.find((torneo) => torneo.id === equipo.torneo_equipo );
        //console.log("Torneo encontrado:", torneo); // Check if the correct torneo is found
        if (torneo) {
          setTorneoNombre(torneo.titulo);
        } else {
          console.log("Torneo xxx");
        }
      } catch (error) {
        console.error("Error al obtener el nombre del equipo:", error);
      }
    };
    // Llamada a la función para obtener el nombre del equipo
    fetchTorneoNombre();
  }, [equipo.torneo_equipo]);
  
    return <div>
      <Card m='auto' boxShadow='2xl' w={{base:'sm', lg:'2xl'}}
      my='10px'
      d='flex'
      textAlign='center'
      flexDirection={{base: 'column', lg: 'column'}}
      alignItems={{lg:'center'}}
      maxW={{base: 'sm', lg: 'sm'}}
      minHeight='450px'
      maxH='100%'
      direction={{ base: 'column', sm: 'column' }}
      overflow='hidden'
      variant='outline'
      justifyContent='space-between'
      _hover={{boxShadow: 'dark-lg', transform: 'scale(1.01)'}}
>
<Icon as={FaShieldAlt} boxSize={100} color="blue.700" mx="auto" my='20px' />

  <Stack>
    <CardBody>
      <Heading size='lg' color='blue.500'>{equipo.nombre}</Heading>
      
      <Heading size='sm' mt='10px' textAlign='justify'> {equipo.detalles}</Heading>
      <Heading size='sm' mt='10px' textAlign='justify' color='green'>{torneoNombre}</Heading>
    </CardBody>
  </Stack>
  <CardFooter m='auto'>
  <Button  boxShadow='2xl' mx='1' bg='green.300' flex='1' variant='ghost' onClick={
      ()=>{
        navigate('/editar-equipo/' + equipo.id)
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
}

