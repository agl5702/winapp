import { useEffect, useState } from "react";
import { HorariosCard } from "./HorariosCard";  
import { getallHorarios } from "../../api/torneos.api";
import { Box } from "@chakra-ui/react";


export function HorariosList(){
    const [horarios,setHorarios]= useState([]);

useEffect(()=> {

    async function loadHorarios(){
        
        const res = await getallHorarios();
        setHorarios(res.data);
    }
    loadHorarios()
}, [])

    return (

        <Box display='flex' flexDirection={{base: 'column', lg:'row'}} flexWrap='wrap' gap={2} justifyContent='space-around' alignItems='center'>
            {horarios.map(horario =>(
             <HorariosCard key={horario.id} horario={horario}/>
            ))}  
        </Box>
    );
}

