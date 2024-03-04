import axios from 'axios'

const torneoApi = axios.create({
    baseURL: 'https://winapp-bwfw.onrender.com/'
})

// Peticiones get

// peticion get de todos los torneos
export const getallTorneos= ()=> torneoApi.get('torneoapp/torneos/')
//Torneo individual
export const getTorneo=(id)=> torneoApi.get(`/torneoapp/torneos/${id}/`)

//Equipo individual
export const getEquipo=(id)=> torneoApi.get(`/equipo_jugador/equipos/${id}/`)

//Jugador individual
export const getJugador=(id)=> torneoApi.get(`/equipo_jugador/jugadores/${id}/`)



// Peticion get de todos los equipos
export const getallEquipos= ()=> torneoApi.get('equipo_jugador/equipos/')

// Peticion get de todos los jugadores
export const getallJugadores= ()=> torneoApi.get('equipo_jugador/jugadores/')

// Peticion get de todos los partidos
export const getallHorarios= ()=> torneoApi.get('partidos_horarios/horario/')

export const getallPartidos= ()=> torneoApi.get('partidos_horarios/partido/')





// Peticiones post

// Peticion post formulario para crear torneos
export const crearTorneo= (torneo)=> torneoApi.post('torneoapp/torneos/', torneo)

// Peticion post formulario de equipos
export const crearEquipo= (equipo)=> torneoApi.post('equipo_jugador/equipos/', equipo, {
    headers: {
        'Content-Type': 'multipart/form-data',
      },
})

export const crearHorario = (horario)=>torneoApi.post('partidos_horarios/horario/', horario)
export const crearPartido = (partido)=>torneoApi.post('partidos_horarios/partido/',partido,{
    headers: {
        'Content-Type': 'multipart/form-data',
      },
})
export const crearJugador= (jugador)=>{
    const data = {
        ...jugador,
        jugador_equipo: [jugador.jugador_equipo],
      };
 return torneoApi.post('equipo_jugador/jugadores/', data);
};

// Peticiones delete

// Peticion para borrar torneos
export const eliminarTorneo = (id)=> torneoApi.delete(`torneoapp/torneos/${id}`)
// Peticion para eliminar equipos
export const eliminarEquipo = (id)=> torneoApi.delete(`equipo_jugador/equipos/${id}`)

export const eliminarJugador = (id)=> torneoApi.delete(`equipo_jugador/jugadores/${id}`)

// Peticion para actualizar 

//Peticion para actualizar Torneos
export const actualizarTorneo= (id, torneo)=> torneoApi.put(`torneoapp/torneos/${id}/`,torneo)

//Peticion para actualizar Jugadores
export const actualizarJugador= (id, jugador)=> torneoApi.put(`equipo_jugador/jugadores/${id}/`,jugador)


//Peticion para actualizar Equipos
export const actualizarEquipo= (id, equipo)=> torneoApi.put(`equipo_jugador/equipos/${id}/`,equipo)