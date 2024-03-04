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
  Textarea
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useNavigate,useParams } from 'react-router-dom';
import { crearEquipo, getallEquipos,actualizarEquipo,getEquipo, getallTorneos } from '../../api/torneos.api';

export default function EquiposForm() {

  const { register, handleSubmit, formState: { errors },setValue, reset } = useForm();
  const navigate = useNavigate();
  const params = useParams();

//  console.log(params);


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [redirect, setRedirect] = useState(false);

  const [torneos, setTorneos] = useState([]);
  const [equipos, setEquipos] = useState([]);

  const onSubmit = async (data) => {
    try {
      if (params.id) {
      //  console.log('actualizando');
        await actualizarEquipo(params.id, data);
      } else {
        const res = await crearEquipo(data);
      }

      // Cerrar el formulario después de guardar
      onClose();
      // Limpiar el formulario
      reset();
      // Redirigir a la página de torneos
      navigate('/equipos');
      window.location.reload();
    } catch (error) {
      console.error('Error al guardar el equipo:', error);
      console.log('Detalles del error:', error.response.data);
      console.log('Objeto error completo:', error);
    }
  };

  useEffect(() => {
    
   
    async function loadEquipo() {
      if (params.id) {
        const { data: { nombre, logo,detalles,torneo_equipo } } = await getEquipo(params.id);
        setValue('nombre', nombre);
        setValue('logo',logo)
        setValue('detalles', detalles);
        setValue('torneo_equipo',torneo_equipo)

        // Open the form when params.id exists
        onOpen();
      }
    }
    loadEquipo();
    const fetchTorneos= async()=>{
      try {
        const torneosData= await getallTorneos();
        setTorneos(torneosData.data);
      }catch(error){
        console.error('Error al obtener la lista de los torneos', error);
      }
    }
    const fetchEquipos = async () => {
      try {
        const equiposData = await getallEquipos();
        setEquipos(equiposData.data); // Asegúrate de ajustar esto según la estructura real de tus datos
      } catch (error) {
        console.error('Error al obtener la lista de equipos:', error);
      }
    };
    fetchTorneos()
    fetchEquipos();
  }, [onOpen, params.id, setValue]);

  
  return (
    <>
      <Button m='15px' leftIcon={<AddIcon />}  bgGradient='linear(to-r, white,gray.300,gray.400)' onClick={onOpen}>
        Nuevo Equipo!
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={() => { onClose(); navigate('/equipos'); }}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px' bg='orange.100'>Registra un Equipo</DrawerHeader>

          <DrawerBody>
            <form encType='multipart/form-data'>
              <FormControl display='flex' flexDirection='column'>
                

                <FormLabel htmlFor='nombre'>Nombre del Equipo</FormLabel>
                <Input
                  
                  id='nombre'
                  placeholder='Nombre del equipo'
                  {...register('nombre', { required: true })}
                />
                {errors.nombre && <span>Este campo es requerido</span>}

                <FormLabel alignItems='center' htmlFor='logo'>Logo</FormLabel>
                <Input alignItems='center' mx='-13px' border='none'
                type='file'
                  id='logo'
          
                  {...register('logo', { required: false })}
                />
                {errors.logo && <span>Este campo es requerido</span>}

                

                <FormLabel htmlFor='detalles'>Detalles</FormLabel>
                <Textarea
                  id='detalles'
                  placeholder='Descripción'
                  {...register('detalles', { required: true })}
                />
                <FormLabel htmlFor='equipo'>Torneo</FormLabel>
                <Select placeholder='Selecciona el Torneo' {...register('torneo_equipo', { required: true })}>
                  {torneos.map((torneo) => (
                    <option key={torneo.id} value={torneo.id}>
                      {torneo.titulo}
                    </option>
                  ))}
                </Select>
                {errors.torneo && <span>Este campo es requerido</span>}
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