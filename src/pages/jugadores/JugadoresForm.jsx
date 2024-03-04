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
  Select,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { crearJugador, getallEquipos,actualizarJugador,getJugador } from '../../api/torneos.api';

export default function JugadoresForm() {
  const { register, handleSubmit, formState: { errors },setValue, reset } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [equipos, setEquipos] = useState([]);

  const [jugador, setJugador] = useState([]);

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        console.log('actualizando');
        await actualizarJugador(params.id, data);
      } else {
        const res = await crearJugador(data);
      }


      // Cerrar el formulario después de guardar
      onClose();
      // Limpiar el formulario
      reset();
      // Redirigir a la página de torneos
      navigate('/profile');
      window.location.reload();
    } catch (error) {
      console.error('Error al guardar el torneo:', error);
      console.log('Detalles del error:', error.response.data);
      console.log('Objeto error completo:', error);
    }
  };


  useEffect(() => {

    async function loadJugador() {
      if (params.id) {
        const { data: { id_jugador,nombre, numero_ficha,jugador_equipo } } = await getJugador(params.id);
        setValue('id_jugador',id_jugador);
        setValue('nombre', nombre);
        setValue('numero_ficha', numero_ficha);
        setValue('jugador_equipo',jugador_equipo);
        // Open the form when params.id exists
        onOpen();
      }
    }
    loadJugador();


    const fetchEquipos = async () => {
      try {
        const equiposData = await getallEquipos();
        setEquipos(equiposData.data); // Asegúrate de ajustar esto según la estructura real de tus datos
      } catch (error) {
        console.error('Error al obtener la lista de equipos:', error);
      }
    };

    fetchEquipos();
  }, [onOpen, params.id, setValue]);

  
  return (
    <>
      <Button m='15px' leftIcon={<AddIcon />} bgGradient='linear(to-r, white,gray.300,gray.400)' onClick={onOpen}>
        Nuevo Jugador!
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={() => { onClose(); navigate('/profile'); }}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px' bg='blue.100'>Registra un Jugador</DrawerHeader>

          <DrawerBody>
            <form>
              <FormControl display='flex' flexDirection='column'>
                

                <FormLabel htmlFor='nombre'>Nombre del Jugador</FormLabel>
                <Input
                  
                  id='nombre'
                  placeholder='Nombre del jugador'
                  {...register('nombre', { required: true })}
                />
                {errors.nombre && <span>Este campo es requerido</span>}

                <FormLabel htmlFor='id_jugador'>Número de Documento</FormLabel>
                <Input
                type='number'
                  id='id_jugador'
                  placeholder='Número de documento'
                  {...register('id_jugador', { required: true })}
                />
                {errors.id_jugador && <span>Este campo es requerido</span>}

                <FormLabel htmlFor='equipo'>Equipo</FormLabel>
                <Select placeholder='Selecciona el equipo' {...register('jugador_equipo', { required: true })}>
                  {equipos.map((equipo) => (
                    <option key={equipo.id} value={equipo.id}>
                      {equipo.nombre}
                    </option>
                  ))}
                </Select>
                {errors.equipo && <span>Este campo es requerido</span>}

                <FormLabel htmlFor='numero_ficha'>Número de Ficha</FormLabel>
                <Input
                type='number'
                  id='numero_ficha'
                  placeholder='Número de ficha'
                  {...register('numero_ficha', { required: true })}
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