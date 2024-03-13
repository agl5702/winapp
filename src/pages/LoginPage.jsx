import { Flex, Box, Image, Input, FormLabel, FormControl, Button, Link } from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import { createSesionUser } from "../api/torneos.api";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await createSesionUser(data);

      if (response.data.access) {
        localStorage.setItem('token', response.data.access);
        navigate('/');
      } else {
        // Manejar el fallo del inicio de sesión aquí, p. ej., mostrar un mensaje de error al usuario
        console.error('Error al iniciar sesión:', response.data.detail);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Manejar errores de red u otros problemas inesperados aquí
    }
  };

  return (
    <Flex bgGradient='linear(to-r,#2A4365,blue.200,blue.100)' w='100vw' minH='100vh' justify='center' alignItems='center' position='relative'>
      <Image src={logo} w='400px' opacity='0.8' position='absolute' left='50%' transform='translateX(-50%)' top='0px' zIndex='1' />
      <Box maxW='400px' w='100%' p='6' bg='#151A18' borderRadius='xl' boxShadow='lg' zIndex='2' mt='100px'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel textAlign='center' color='white' fontSize='25px'>Nombre de Usuario</FormLabel>
            <Input {...register("email")} type="email" m='auto' color='black' bg='white' placeholder='Ingrese su nombre de usuario' />
          </FormControl>

          <FormControl mt='4'>
            <FormLabel color='white' textAlign='center' fontSize='25px'>Contraseña</FormLabel>
            <Input {...register("password")} m='auto' type='password' color='black' bg='white' placeholder='Ingrese su contraseña' />
          </FormControl>

          <Button mt='8' colorScheme='teal' variant='solid' type="submit" w='100%'>Entrar</Button>
        </form>

        <Link color='blue.300' href="/register" _hover={{color:'white'}} >Registrate aquí</Link>
      </Box>
    </Flex>
  );
}
