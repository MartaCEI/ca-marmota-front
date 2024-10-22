
// Formulario de Login para mostrar en página de acceso restringido
import Login from '@/pages/Login'
import { useNavigate } from 'react-router-dom';


// Hooks
import {useUser} from '@/hooks/useUser'

export const PrivateRoute = ({ children }) => {
    const { user } = useUser();
    const navigate = useNavigate();
    
    // Si existe children, si no existe, navega al login (no se puede acceder a la página)
    // return user ? children : navigate("/login");

    return user ? children 
                : (<div className='p-2 text-center'>
                    <p className="text-red-500">Acceso restringido para usuarios</p>
                    <Login />
                  </div>)
}
