import { Flex, Box, Image, Input, FormLabel, FormControl, Button, Link } from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import { createUser } from "../api/torneos.api";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
  
    const onSubmit = async (data) => {
        try {
            const response = await createUser(data);
            if (response.status === 201) {
                // Si el usuario se crea correctamente, redirigir al dashboard
                navigate('/');
            } else {
                console.error('Error al iniciar sesión:', response.data.detail);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };




  return (
    <Flex bgGradient='linear(to-r,#2A4365,blue.200,blue.100)' w='100vw' minH='100vh' justify='center' alignItems='center' position='relative'>
      <Image src={logo} w='600px' opacity='0.8' position='absolute' left='50%' transform='translateX(-50%)' top='0px' zIndex='1' />
      <Box maxW='400px' w='100%' p='6' bg='#151A18' borderRadius='xl' boxShadow='lg' zIndex='2' mt='100px'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel textAlign='center' color='white' fontSize='25px'>Nombre</FormLabel>
            <Input {...register("first_name")} m='auto' color='black' bg='white' placeholder='Ingrese su nombre de usuario' />
          </FormControl>

          <FormControl mt='4'>
            <FormLabel color='white' textAlign='center' fontSize='25px'>Apellido</FormLabel>
            <Input {...register("last_name")} m='auto' color='black' bg='white' placeholder='Ingrese su contraseña' />
          </FormControl>
          <FormControl mt='4'>
            <FormLabel color='white' textAlign='center' fontSize='25px'>Correo Electrónico</FormLabel>
            <Input {...register("email")} m='auto' type="email" color='black' bg='white' placeholder='Ingrese su contraseña' />
          </FormControl>
          <FormControl mt='4'>
            <FormLabel color='white' textAlign='center' fontSize='25px'>Contraseña</FormLabel>
            <Input {...register("password")} m='auto' type='password' color='black' bg='white' placeholder='Ingrese su contraseña' />
          </FormControl>
          <FormControl mt='4'>
            <FormLabel color='white' textAlign='center' fontSize='25px'>Confirmar Contraseña</FormLabel>
            <Input {...register("re_password")} m='auto' type='password' color='black' bg='white' placeholder='Ingrese su contraseña' />
          </FormControl>
          <Button mt='8' colorScheme='teal' variant='solid' type="submit" w='100%'>Entrar</Button>
        </form>

        <Link color='blue.300' href="/register" _hover={{color:'white'}} >Registrate aquí</Link>
      </Box>
    </Flex>
  );
}
