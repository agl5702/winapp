import { FormControl,Input,FormLabel,Button, Box } from "@chakra-ui/react"
import { useForm } from 'react-hook-form';
function Login() {
    const { register,  formState: { errors }, } = useForm();

  return (
        <Box mx='auto' my='10%'>
            <form>
              <FormControl display='flex' flexDirection='column' w='300px' m='auto'>
                <FormLabel htmlFor='titulo'>Nombre</FormLabel>
                <Input
                  id='nombre'
                  placeholder='nombre de usuario'
                  {...register('titulo', { required: true })}
                />
                {errors.titulo && <span>Este campo es requerido</span>}

                <FormLabel htmlFor='titulo'>Contraseña</FormLabel>
                <Input
                  id='contrasena'
                  placeholder='contraseña'
                  {...register('titulo', { required: true })}
                />
                {errors.titulo && <span>Este campo es requerido</span>}
              </FormControl>
              <Button display='flex' margin='auto' bg='blue.400' my='20px'>
            Entrar
          </Button>
            </form>
            
        </Box>
    
    
            
  )
}

export default Login