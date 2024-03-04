import { useEffect, useState } from "react";
import { JugadoresCard } from "./JugadoresCard";  
import { getallJugadores } from "../../api/torneos.api";
import { Box } from "@chakra-ui/react";


export function JugadoresList(){
    const [jugadores,setJugadores]= useState([]);

useEffect(()=> {

    async function loadJugadores(){
        
        const res = await getallJugadores();
        setJugadores(res.data);
    }
    loadJugadores()
}, [])

    return (

        <Box display='flex' flexDirection={{base: 'column', lg:'row'}} flexWrap='wrap' gap={2} justifyContent='space-around' alignItems='center'>
            {jugadores.map(jugador =>(
             <JugadoresCard key={jugador.id} jugador={jugador}/>
            ))}  
        </Box>
    );
}

