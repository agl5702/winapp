import { useEffect, useState } from "react";
import {PartidosCard} from './PartidosCard'
import { getallPartidos } from "../../api/torneos.api";
import { Box } from "@chakra-ui/react";


export function PartidosList(){
    const [partidos,setPartidos]= useState([]);

useEffect(()=> {

    async function loadPartidos(){
        
        const res = await getallPartidos();
        setPartidos(res.data);
    }
    loadPartidos()
}, [])

    return (

        <Box display='flex' flexDirection={{base: 'column', lg:'row'}} flexWrap='wrap' gap={2} justifyContent='space-around' alignItems='center'>
            {partidos.map(partido =>(
             <PartidosCard key={partidos.id} partido={partido}/>
            ))}  
        </Box>
    );
}

