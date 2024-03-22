import { Input, VStack, Button, Box, TableContainer, Table, Thead, Tr, Th, Td, Tbody } from '@chakra-ui/react';
import { useState } from 'react';

export default function ListSorteo() {
    const [valueInput, setValueInput] = useState('');
    const [items, setItems] = useState([]);
    const [enfrentamientos, setEnfrentamientos] = useState([]);

    const handleChange = (event) => {
        setValueInput(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addItem();
        }
    };

    const addItem = () => {
        if (valueInput.trim() !== '') {
            setItems([...items, valueInput.trim()]);
            setValueInput('');
        }
    };

    const realizarSorteo = () => {
        const equipos = [...items];
        const enfrentamientos = [];

        while (equipos.length > 1) {
            const equipo1 = equipos.splice(Math.floor(Math.random() * equipos.length), 1)[0];
            const equipo2 = equipos.splice(Math.floor(Math.random() * equipos.length), 1)[0];

            enfrentamientos.push([equipo1, equipo2]);
        }

        if (equipos.length === 1) {
            enfrentamientos.push([equipos[0], 'Equipo Libre']);
        }

        setEnfrentamientos(enfrentamientos);
    };

    return (
        <VStack spacing={4}>
            <Box display='flex' justifyContent='space-around'>
                <Input
                    value={valueInput}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Agregar equipo y presionar Enter"
                />
                <Button mx='5px' bg='green.100' onClick={addItem}>Agregar</Button>
            </Box>

            <Box display='flex' flexDirection='row' flexWrap='wrap' justifyContent='space-around'>
                {items.map((item, index) => (
                    <Box
                        boxShadow='lg'
                        w='150px'
                        bg='blue.200'
                        my='10px'
                        textAlign='center'
                        mx='10px'
                        borderRadius='10'
                        key={index}
                    >
                        {item}
                    </Box>
                ))}
            </Box>

            <Button onClick={realizarSorteo}>Realizar Sorteo</Button>

            {enfrentamientos.length > 0 && (
                <Box>
                    <h2>Enfrentamientos:</h2>
                    <TableContainer>
                        <Table size='lg'>
                            <Thead>
                                <Tr>
                                    <Th>Equipo 1</Th>
                                    <Th></Th>
                                    <Th>Equipo 2</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {enfrentamientos.map((enfrentamiento, index) => (
                                    <Tr key={index}>
                                        <Td>{enfrentamiento[0]}</Td>
                                        <Td>vs</Td>
                                        <Td>{enfrentamiento[1]}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </VStack>
    );
}
