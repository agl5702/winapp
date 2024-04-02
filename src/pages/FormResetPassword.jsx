import { useState } from 'react';
import { FormControl, Input, FormLabel, Button, Box,Text } from "@chakra-ui/react";
import { useNavigate,NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {  updateUser,login } from "../api/torneos.api";
import logo from '../assets/logo.webp';
import './login.css';

function FormResetPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await updateUser(data.password, data.re_password, data.username, data.email);
      
      try {
        localStorage.removeItem('user_id')
        const loginResponse = await login(data.username, data.password);
        if (loginResponse) {
          // Almacenar los tokens en el localStorage
          localStorage.setItem('access_token', loginResponse.token);
          localStorage.setItem('refresh_token', loginResponse['refresh-token']);
          localStorage.setItem('info_user', JSON.stringify(loginResponse.user));
        //   console.log('Login exitoso');
        //   console.log('Token de acceso:', loginResponse.token);
        //   console.log('Token de actualización:', loginResponse['refresh-token']);
          navigate('/');
        } else {
          console.error('Error al iniciar sesión después del registro');
          setError('Error al iniciar sesión después del registro'); // Informar al usuario del error
        }
      } catch (error) {
        console.error('Error al iniciar sesión después del registro:', error.message);
        setError('Error al iniciar sesión después del registro'); // Informar al usuario del error
      }
    } catch (error) {
      console.error('Error al actualizar:', error.message);
      setError('Error al registrar'); // Informar al usuario del error
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
            <FormLabel htmlFor='contraseña' mx='40px' color='white'>Contraseña</FormLabel>
            <Input
              w='xs'
              m='auto'
              color='black'
              bgColor='white'
              type='password'
              id='password'
              placeholder='contraseña'
              {...register('password', { required: true })}
            />
            {errors.password && <span>Este campo es requerido</span>}
            <FormLabel htmlFor='contraseña-confirmar' mx='40px' color='white'>Confirmar Contraseña</FormLabel>
            <Input
              w='xs'
              m='auto'
              color='black'
              bgColor='white'
              type='password'
              id='contraseña-confirmar'
              placeholder='confirmar contraseña'
              {...register('re_password', { required: true })}
            />
            {errors.re_password && <span>Este campo es requerido</span>}
            {error && <span style={{ color: 'red' }}>{error}</span>}
          </FormControl>
          <NavLink to="/login">
            <Text mx='40px'color='white' _hover={{color: 'blue.300'}}>¿Ya tienes una cuenta?</Text>
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

export default FormResetPassword;
