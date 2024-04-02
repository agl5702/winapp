import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Login from './pages/Login';
import { TorneoFormPages } from './pages/torneos/TorneoFormPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Teams from './pages/Teams';
import Partidos from './pages/Partidos';
import { Toaster } from 'react-hot-toast';
import Sorteos from './pages/Sorteos';
import RegisterPage from './pages/RegisterPage'
import ResetPassword from './pages/ResetPassword';
import FormResetPassword from './pages/FormResetPassword';
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('access_token');
  return token ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="create" element={<PrivateRoute element={<TorneoFormPages />} />} />
        <Route path="equipos" element={<PrivateRoute element={<Teams />} />} />
        <Route path="editar/:id" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="editar-equipo/:id" element={<PrivateRoute element={<Teams />} />} />
        <Route path="editar-jugador/:id" element={<PrivateRoute element={<Profile />} />} />
        <Route path="profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="partidos" element={<PrivateRoute element={<Partidos />} />} />
        <Route path="sorteos" element={<PrivateRoute element={<Sorteos />} />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="form-reset-password" element={<FormResetPassword />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
