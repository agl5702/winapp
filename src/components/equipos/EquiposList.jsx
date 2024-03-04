import { useEffect, useState } from "react";
import { EquiposCard } from "./EquiposCard";  
import { getallEquipos } from "../../api/torneos.api";
import { Box } from "@chakra-ui/react";


export function EquiposList(){
    const [equipos,setEquipos]= useState([]);

useEffect(()=> {

    async function loadEquipos(){
        
        const res = await getallEquipos();
        setEquipos(res.data);
    }
    loadEquipos()
}, [])

    return (

        <Box display='flex' flexDirection={{base: 'column', lg:'row'}} flexWrap='wrap' gap={2} justifyContent='space-around' alignItems='center'>
            {equipos.map(equipo =>(
             <EquiposCard key={equipo.id} equipo={equipo}/>
            ))}  
        </Box>
    );
}

