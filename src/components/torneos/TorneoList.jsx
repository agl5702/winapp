import { useEffect, useState } from "react";
import { TorneoCard } from "./TorneoCard";
import { getallTorneos } from "../../api/torneos.api";
import { Box } from "@chakra-ui/react";


export function TorneoList(){
    const [torneos,setTorneos]= useState([]);

useEffect(()=> {

    async function loadTorneo(){
        
        const res = await getallTorneos();
        setTorneos(res.data);
    }
    loadTorneo()
}, [])

    return (
        <Box display='flex' flexDirection={{base: 'column', lg:'row'}} flexWrap='wrap' gap={2} justifyContent='space-around' alignItems='center'>
        {torneos.map((torneo) => (
          <TorneoCard key={torneo.id} torneo={torneo} />
        ))}
      </Box>
    );
}

