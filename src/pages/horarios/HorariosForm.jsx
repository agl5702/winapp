import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Textarea
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { crearHorario, getallHorarios } from '../../api/torneos.api';

export default function HorariosForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const horariosData = await getallHorarios();
        setHorarios(horariosData.data); // Asegúrate de ajustar esto según la estructura real de tus datos
      } catch (error) {
        console.error('Error al obtener la lista de horarios:', error);
      }
    };

    fetchHorarios();
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await crearHorario(data);
      console.log(res);

      // Cerrar el formulario después de guardar
      onClose();
      // Limpiar el formulario
      reset();
      // Redirigir a la página de torneos
      navigate('/horario');
      window.location.reload();
    } catch (error) {
      console.error('Error al guardar el equipo:', error);
      console.log('Detalles del error:', error.response.data);
      console.log('Objeto error completo:', error);
    }
  };
 
  return (
    <>
      <Button m='15px' leftIcon={<AddIcon />} bgGradient='linear(to-r, white,gray.300,gray.400)' onClick={onOpen}>
        Añade un Horario!
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={() => { onClose(); navigate('/horario  '); }}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px' bg='purple.100'>Crea  un Horario</DrawerHeader>

          <DrawerBody>
            <form encType='multipart/form-data'>
              <FormControl display='flex' flexDirection='column'>
                

                <FormLabel htmlFor='fecha'>fecha</FormLabel>
                <Input
                  type='date'
                  id='fecha'
                  placeholder='Nombre del equipo'
                  {...register('fecha', { required: true })}
                />
                {errors.nombre && <span>Este campo es requerido</span>}
                <FormLabel htmlFor='hora'>fecha</FormLabel>
                <Input
                  type='time'
                  id='hora'
                  {...register('hora', { required: true })}
                />
                {errors.nombre && <span>Este campo es requerido</span>}
                

                <FormLabel htmlFor='detalles'>Detalles</FormLabel>
                <Textarea
                  id='detalles'
                  placeholder='Descripción'
                  {...register('detalles', { required: true })}
                />
              </FormControl>
            </form>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose} bg='orange.200'>
              Cancelar
            </Button>
            <Button onClick={handleSubmit(onSubmit)} m={3} w='80px' bg='green.200'>
              Guardar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}