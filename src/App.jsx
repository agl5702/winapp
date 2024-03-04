import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import { TorneoFormPages } from './pages/torneos/TorneoFormPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Teams from './pages/Teams';
import Horarios from './pages/Horarios';
import Partidos from './pages/Partidos';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='create' element={<TorneoFormPages />} />
        <Route path='equipos' element={<Teams />} />
        <Route path='editar/:id' element={<Dashboard />} />
        <Route path='editar-equipo/:id' element={<Teams/>}/>
        <Route path='editar-jugador/:id' element={<Profile/>}/>
        <Route path='profile' element={<Profile />} />
        <Route path='horario' element={<Horarios />} />
        <Route path='partidos' element={<Partidos />} />
      </Route>

  )
);

function App() {
  return (
<div><RouterProvider router={router} />
      <Toaster /></div>
      

  );
}

export default App;
