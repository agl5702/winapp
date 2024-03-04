import { useState } from 'react';
import { useEffect } from 'react';
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
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { crearTorneo, actualizarTorneo, getTorneo } from '../../api/torneos.api';
import { useNavigate, useParams } from 'react-router-dom';


export function TorneoFormPages() {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [redirect, setRedirect] = useState(false);
  const onSubmit = async (data) => {
    try {
      if (params.id) {
        console.log('actualizando');
        await actualizarTorneo(params.id, data);
      } else {
        const res = await crearTorneo(data);
      }

      // Cerrar el formulario después de guardar
      onClose();
      // Limpiar el formulario
      reset();

      // Redirigir a la página de torneos
      navigate('/')
      
    } catch (error) {
      console.error('Error al guardar el torneo:', error);
    }
    window.location.reload()
  };

  useEffect(() => {
    async function loadTorneo() {
      if (params.id) {
        const { data: { titulo, descripcion } } = await getTorneo(params.id);
        setValue('titulo', titulo);
        setValue('descripcion', descripcion);

        // Open the form when params.id exists
        onOpen();
      }
    }

    loadTorneo();
  }, [onOpen, params.id, setValue]);

  return (
    <>
      <Button m='15px' leftIcon={<AddIcon />} bgGradient='linear(to-r, white,gray.300,gray.400)' onClick={onOpen}>
        Crea Ahora!
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={() => { onClose(); navigate('/'); }}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton bg='blue.300' />
          <DrawerHeader borderBottomWidth='1px' background='blue.200'>
            Crea un nuevo torneo
          </DrawerHeader>

          <DrawerBody>
            <form>
              <FormControl display='flex' flexDirection='column'>
                <FormLabel htmlFor='titulo'>Nombre</FormLabel>
                <Input
                  id='titulo'
                  placeholder='nombre del torneo'
                  {...register('titulo', { required: true })}
                />
                {errors.titulo && <span>Este campo es requerido</span>}

                <FormLabel htmlFor='descripcion'>Descripción</FormLabel>
                <Textarea
                  id='descripcion'
                  placeholder='Descripción'
                  {...register('descripcion', { required: true })}
                />
                {errors.descripcion && <span>Este campo es requerido</span>}
              </FormControl>
            </form>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px' bg='gray.100'>
            <Button variant='outline' mr={3} onClick={onClose} bg='red.400'>
              Cancelar
            </Button>
            <Button onClick={handleSubmit(onSubmit)} m={3} w='80px' bg='blue.300'>
              Guardar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
