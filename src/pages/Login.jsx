import { useState } from 'react';
import { FormControl, Input, FormLabel, Button, Box,Text } from "@chakra-ui/react";
import { useNavigate,NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from "../api/torneos.api";
import logo from '../assets/logo.webp'
import './login.css'

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await login(data.username, data.password);
      if (response) {
        // Almacenar los tokens en el localStorage
        try {
          localStorage.setItem('access_token', response.token);
          localStorage.setItem('refresh_token', response['refresh-token']);
          localStorage.setItem('info_user', JSON.stringify(response.user));
          // console.log('Login exitoso');
          // console.log('Token de acceso:', response.token);
          // console.log('Token de actualización:', response['refresh-token']);
          navigate('/');
        } catch (error) {
          console.error('Error al almacenar tokens:', error);
          setError('Error al iniciar sesión'); // Informar al usuario del error
        }
      } else {
        console.error('Error al iniciar sesión');
        setError('Credenciales incorrectas'); // Informar al usuario del error
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      setError('Error al iniciar sesión'); // Informar al usuario del error
    }
  };

  return (
    <Box mx='auto' my='0%' display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" //
      borderRadius='md'
      bgGradient='linear(to-l, white,blue.200,#2A4365)'
 
    >

      <Box bgGradient='linear(to-b, #151A18, #3D3F3E)' mt='90px' w='400px' borderRadius='5%' zIndex='2' >
        <form onSubmit={handleSubmit(onSubmit)} method="post">
          <FormControl display='flex' flexDirection='column' m='auto' my='20px'>
            <FormLabel htmlFor='nombre' mx='40px' color='white'>Nombre</FormLabel>
            <Input
              w='xs'
              m='auto'
              color='black'
              bgColor='white'
              id='nombre'
              placeholder='nombre de usuario'
              {...register('username', { required: true })}
            />
            {errors.username && <span>Este campo es requerido</span>}

            <FormLabel htmlFor='contrasena' mx='40px' color='white'>Contraseña</FormLabel>
            <Input
              w='xs'
              m='auto'
              color='black'
              bgColor='white'
              type='password'
              placeholder='contraseña'
              {...register('password', { required: true })}
            />
            {errors.password && <span>Este campo es requerido</span>}

            {error && <span style={{ color: 'red' }}>{error}</span>}
          </FormControl>
          <Box display='flex' flexDirection='row' justifyContent='space-around'>
          <NavLink to="/register">
            <Text mx='10px' color='#1023DF' _hover={{color: 'white'}}>Registrate aquí</Text>
          </NavLink>
          <NavLink to="/reset-password">
            <Text mx='10px' color='#1023DF' _hover={{color: 'white'}}>¿Olvidaste tu contraseña?</Text>
          </NavLink>
          </Box>
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
      />
    </Box>
  );
}

export default Login;
