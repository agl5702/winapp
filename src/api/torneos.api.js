import axios from 'axios'

const torneoApi = axios.create({
    baseURL: 'https://winapp-bwfw.onrender.com/',
    // baseURL: 'http://localhost:8000/', //que no tenga la 's' el http 
    headers: {
        'Content-Type': 'application/json',
    }
});


const getAccessToken = () => localStorage.getItem('access_token');

const setAccessToken = (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
};

const getRefreshToken = () => localStorage.getItem('refresh_token');

const refreshToken = () => {
    const refreshToken = getRefreshToken();
    return torneoApi.post('api/token/refresh/', { refresh: refreshToken })
        .then(response => {
            const newAccessToken = response.data.access;
            const newRefreshToken = response.data.refresh;
            localStorage.setItem('access_token', newAccessToken);
            localStorage.setItem('refresh_token',newRefreshToken);
            return newAccessToken;
        })
        .catch(error => {
            console.error('Error al renovar el token de acceso:', error);
            throw error;
        });
};

let isRefreshing = false;
let refreshPromise = null;

torneoApi.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            if (!isRefreshing) {
                isRefreshing = true;
                refreshPromise = refreshToken()
                    .then(newAccessToken => {
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        return axios(originalRequest);
                    })
                    .catch(error => {
                        throw error; // Si falla la renovación, rechazar la solicitud original
                    })
                    .finally(() => {
                        isRefreshing = false;
                        refreshPromise = null;
                    });
            }
            return refreshPromise;
        }
        return Promise.reject(error);
    }
);

// Función para manejar errores de solicitud
const handleRequestError = (error) => {
    console.error('Error en la solicitud:', error);
    throw error;
};

// Interceptores de Axios para manejar errores de solicitud
torneoApi.interceptors.response.use((response) => response, handleRequestError);

// Interceptores de Axios para agregar el token de acceso a todas las solicitudes
torneoApi.interceptors.request.use(setAccessToken);

export const login = (username, password) => {
    // Datos de inicio de sesión
    const data = {
        username: username,
        password: password
    };

    // Realizar la solicitud de login
    return torneoApi.post('login/', data)
        .then(response => {
            // Devolver toda la respuesta del servidor
            return response.data;
        })
        .catch(error => {
            // Manejar errores si la solicitud de login falla
            throw error;
        });
};
export const registeruser= (username,email,password,re_password) => {
    const data={
        username: username,
        email: email,
        password: password,
        re_password: re_password
    }
    return torneoApi.post('usuario/usuario/',data)
        .then(response=>{
            return response.data;
        })
        .catch(error=>{

            throw error;
        });
};
export const logout = async () => {
    const accessToken = localStorage.getItem('access_token');
    try {
      await torneoApi.post('logout/', null, { headers: { Authorization: `Bearer ${accessToken}` } });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('info_user');
      
    } catch (error) {
      console.error('Error al realizar el logout:', error);
      // Puedes mostrar un mensaje de error al usuario si lo deseas
    }
  };
export const verifyUserEmail = (email) => {
    const data={
        email: email,
    }
    return torneoApi.post('usuario/verificar-usuario/',data)
    
        .then(response=>{
            console.log(response.data);
            const saveId = response.data.id;
            localStorage.setItem('user_id', saveId);
            return response.data;
            
        })
        .catch(error=>{

            throw error;
        });
};

export const updateUser = (password,re_password,username,email) =>{
    const id = localStorage.getItem('user_id')
    
    const data = {
        password:password,
        re_password: re_password,
        username: username,
        email: email,
    }
    return torneoApi.put(`usuario/usuario/${id}/`,data)
}




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
export const getallEquipos= ()=> torneoApi.get('/equipo_jugador/equipos/')

// Peticion get de todos los jugadores
export const getallJugadores= ()=> torneoApi.get('/equipo_jugador/jugadores/')

// Peticion get de todos los partidos
export const getallHorarios= ()=> torneoApi.get('/partidos_horarios/horario/')

export const getallPartidos= ()=> torneoApi.get('/partidos_horarios/partido/')





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
export const actualizarJugador = (id, jugador) => {

    const data = {
        ...jugador,
        jugador_equipo: [jugador.jugador_equipo[0]], // Convertir a lista
    };
    return torneoApi.put(`equipo_jugador/jugadores/${id}/`, data);
};


//Peticion para actualizar Equipos
export const actualizarEquipo= (id, equipo)=> torneoApi.put(`equipo_jugador/equipos/${id}/`,equipo)