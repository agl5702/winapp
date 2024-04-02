import { useState } from 'react';
import { FormControl, Input, FormLabel, Button, Box, Text } from "@chakra-ui/react";
import { useNavigate, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { verifyUserEmail } from "../api/torneos.api";
import logo from '../assets/logo.webp';
import './login.css';

function ResetPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Llama a la función para verificar el correo electrónico
      const response = await verifyUserEmail(data.email);

      // Maneja la respuesta según sea necesario
      if (response && response.id) {
        // Si el correo electrónico es válido, realiza la acción deseada
        navigate('/form-reset-password')
        // Por ejemplo, redirige a una nueva página o muestra un mensaje de éxito
        // console.log('Correo electrónico válido:', data.email);
      } else {
        // Si el correo electrónico no es válido, muestra un mensaje de error
        setError('El correo electrónico proporcionado no está registrado.');
      }
    } catch (error) {
      // Maneja los errores si la llamada a la API falla
      console.error('Error al verificar el correo electrónico:', error);
      setError('Error al verificar el correo electrónico. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <Box mx='auto' my='0%' display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      borderRadius='md'
      bgGradient='linear(to-l, white,blue.200,#2A4365)'
    >
      <Box bgGradient='linear(to-b, #151A18, #3D3F3E)' w='400px' borderRadius='5%' marginTop='120px' zIndex='2'>
        <form onSubmit={handleSubmit(onSubmit)} method="post">
          <FormControl display='flex' flexDirection='column' m='auto' my='20px'>
          
            <FormLabel htmlFor='email' mx='40px' color='white'>Correo Electrónico</FormLabel>
            <Input
              w='xs'
              m='auto'
              color='black'
              bgColor='white'
              id='email'
              placeholder='correo electrónico'
              {...register('email', { required: true })}
            />
            {errors.email && <span>Este campo es requerido</span>}
            {error && <span style={{ color: 'red' }}>{error}</span>} {/* Muestra el mensaje de error si existe */}
          </FormControl>
          <NavLink to="/login">
            <Text mx='40px' color='white' _hover={{color: 'blue.300'}}>¿Ya tienes una cuenta?</Text>
          </NavLink>
          <Button type='submit' display='flex' color='white' margin='auto' bg='green.300' colorScheme='blue' my='20px' w='xs'>
            Entrar
          </Button>
        </form>
      </Box>
      <img
        src={logo}
        style={{
          width: '400px',
          position: 'absolute',
          top: '0',
          left: 'calc(50% - 200px)',
          transform: 'translateX(-50%)',
          zIndex: '1',
          animationName: 'fly-animation',
          animationDuration: '5s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}
        alt="Logo"
      />
    </Box>
  );
}

export default ResetPassword;
