import { Box, Flex, List, ListItem } from "@chakra-ui/react"
export default function HomePage() {
  return (
    <Box>
      <Flex bgGradient='linear(to-r, white,blue.200,#2A4365)' minW='100vw' as='nav' p='10px' justify='space-between' maxH='100px' wrap='wrap' gap='2' margin='auto' alignItems='center' boxShadow='2xl' border='none'>
        <List display='flex' textAlign='center' m='auto' fontSize='20px'>
          <ListItem mx='20px'>Inicio</ListItem>
          <ListItem mx='20px'>sobre mi</ListItem>
          <ListItem mx='20px'>login</ListItem>
        </List>
      </Flex>
    </Box>
  )
}
