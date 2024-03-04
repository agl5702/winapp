import {Button} from '@chakra-ui/react'
import { useAuth0 } from '@auth0/auth0-react'

export default function LogoutButton() {
    const {logout}= useAuth0();
  return (
    <Button colorScheme='#44337A' onClick={()=>logout()}>Log Out</Button>
  )
}
