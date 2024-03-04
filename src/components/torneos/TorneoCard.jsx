import { Card, CardHeader, CardBody, CardFooter, Text, Flex, Box, Heading,Button} from '@chakra-ui/react'
import { useNavigate} from 'react-router-dom'
import { eliminarTorneo } from '../../api/torneos.api'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import {toast} from 'react-hot-toast'
import { useRef } from 'react';



export function TorneoCard({torneo}){
  
 
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleEliminar = async () => {
    await eliminarTorneo(torneo.id);
    onClose();
    navigate('/');
    window.location.reload();

   
      toast.success('Torneo eliminado', {
        position: 'bottom-right'
      });
  };

  const navigate = useNavigate();
    return <div>
      <Card 
      bg='gray.300' m='auto' borderTop='8px solid' borderTopColor='black.400'
      my='10px' maxW='sm' minW='sm'
      maxHeight='320px'  minHeight='320px'
      height='100%'
      boxShadow='2xl' gap={2} flexWrap='wrap' w='350px' 
      textAlign='justify'
      transition='transform 0.2s'
      _hover={{boxShadow: 'dark-lg',transform: 'scale(1.01)',color: 'gray.800',borderTopColor: 'blue.400'}}
      >

    <CardHeader>
      <Flex>
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        
  
          <Box m='auto' textAlign='justify'>
            <Heading size='sm'>{torneo.titulo}</Heading>
            
          </Box>
        </Flex>
      </Flex>
    </CardHeader>
    <CardBody>
      <Flex flexDirection='row'>
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap' flexDirection='row'>
        
          <Text color='black' fontWeight='bold'>Fecha inicial:</Text>
          <Text> {torneo.fecha_inicio}</Text>
        
        </Flex>
        
      </Flex>
    
      <Text>
        {torneo.descripcion}
      </Text>
    </CardBody>
  
    <CardFooter
      justify='space-between'
      flexWrap='wrap'
      sx={{
        '& > button': {
          minW: '60px',
        },
      }}
    >
      <Button  boxShadow='2xl' mx='1' bg='green.300' flex='1' variant='ghost' onClick={
      ()=>{
        navigate('/editar/' + torneo.id)
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
              Eliminar Torneo
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro que quieres eliminar este torneo?
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