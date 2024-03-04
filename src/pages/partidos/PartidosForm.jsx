import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
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
  Textarea
} from '@chakra-ui/react';
import { crearPartido, getallHorarios,getallEquipos } from '../../api/torneos.api';

export function PartidosForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [horarios, setHorarios] = useState([]);
  const [equipos, setEquipos] = useState([]); 

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const equiposData = await getallEquipos();
        setEquipos(equiposData.data); // Asegúrate de ajustar esto según la estructura real de tus datos
      } catch (error) {
        console.error('Error al obtener la lista de equipos:', error);
      }
    };
    fetchEquipos();
  
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
      const res = await crearPartido(data);
      console.log(res);

      // Cerrar el formulario después de guardar
      onClose();
      // Limpiar el formulario
      reset();
      // Redirigir a la página de torneos
      navigate('/partidos');
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
        Añade un partido!
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={() => { onClose(); navigate('/partidos  '); }}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px' bg='green.200'>Datos del partido</DrawerHeader>

          <DrawerBody>
            <form encType='multipart/form-data'>
              <FormControl display='flex' flexDirection='column'>
                
                <FormLabel htmlFor='equipo_local'>Equipo Local</FormLabel>
                <Select placeholder='Selecciona el equipo' {...register('equipo_local', { required: true })}>
                  {equipos.map((equipo) => (
                    <option key={equipo.id} value={equipo.id}>
                      {equipo.nombre}
                    </option>
                  ))}
                </Select>
                {errors.equipo && <span>Este campo es requerido</span>}
                <FormLabel htmlFor='equipo_local'>Equipo Visitante</FormLabel>
                <Select placeholder='Selecciona el equipo' {...register('equipo_visitante', { required: true })}>
                  {equipos.map((equipo) => (
                    <option key={equipo.id} value={equipo.id}>
                      {equipo.nombre}
                    </option>
                  ))}
                </Select>
                {errors.equipo && <span>Este campo es requerido</span>}

                <FormLabel htmlFor='fecha'>Gol local</FormLabel>
                <Input
                  type='number'
                  id='gol_local'
                  placeholder='goles'
                  {...register('gol_local', { required: true })}
                />
                {errors.gol_local && <span>Este campo es requerido</span>}

                <FormLabel htmlFor='hora'>Gol visitante</FormLabel>
                <Input
                  type='number'
                  id='gol_visitante'
                  placeholder='goles'
                  {...register('gol_visitante', { required: true })}
                />
                {errors.gol_visitante && <span>Este campo es requerido</span>}
                

                <FormLabel htmlFor='detalle'>Detalles</FormLabel>
                <Textarea
                  id='detalle'
                  placeholder='Descripción'
                  {...register('detalle', { required: true })}
                />
                <FormLabel htmlFor='horario_partido'>Horario</FormLabel>
                <Select placeholder='Selecciona el horario' {...register('horario_partido', { required: true })}>
                  {horarios.map((horario) => (
                    <option key={horario.id} value={horario.id}>
                      {horario.fecha}
                    </option>
                  ))}
                </Select>
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
  )
}
