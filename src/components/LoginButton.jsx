import {Button} from '@chakra-ui/react'
import { useAuth0 } from '@auth0/auth0-react'


export default function LoginButton() {


  const {loginWithRedirect}= useAuth0();


  return (
    <Button bgGradient='linear(to-r, white,gray.300,gray.400)' color='gray.700' boxShadow='lg' onClick={loginWithRedirect}>Log in</Button>
  )
}
