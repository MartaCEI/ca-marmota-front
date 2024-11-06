import React from 'react';
import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { NavLink } from 'react-router-dom';

export const Header = () => {
    const { user, logout } = useUser();
    const [info, setInfo] = useState({});
    const { VITE_API_URL, VITE_BACKEND_URL } = import.meta.env;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    
    useEffect(() => {
        if (user) {
            console.log("Usuario logueado:", user);  // Verificar si isAdmin está presente
        } else {
            console.log("No hay usuario logueado");
        }
    }, [user]); // Se ejecuta cada vez que cambia el usuario
    
    const userId = user ? user._id : null;
    
    
    useEffect(() => {
        fetchHomeData();
    }, []);

    const fetchHomeData = async () => {
        try {
            const response = await fetch(`${VITE_API_URL}/home`);
            const objeto = await response.json();
            console.log("Datos del encabezado:", objeto);
            if (objeto.status === "error") {
                setError(`Tuvimos un error: ${objeto.msg}`);
                return;
            }
            setInfo(objeto.data[0]);
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.log("Error al hacer el fetch de los datos:", error);
                setError("Error al cargar los datos");
            }
        }
    };

    const handleOnClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="Header">
            <img className="Header-img-large" src={`${VITE_BACKEND_URL}/img/${info.headerImage}`} alt={info.headerImage} />
            <img className="Header-logo" src={`${VITE_BACKEND_URL}/img/${info.logo}`} alt={info.logo} />

            <nav className={`Nav ${isMenuOpen ? 'isActive' : ''}`}>
                {user ? ( // Si hay un usuario
                        user.isAdmin ? ( // Si es admin
                            <li>
                                <NavLink className="Header-a" to="/admin">Admin</NavLink>
                            </li>
                        ) : ( // Si no es admin
                            <li>
                                <NavLink className="Header-a" to={`/myBookings/${userId}`}>My Bookings</NavLink>
                            </li>
                        )
                    ) : null}
                <ul className="Nav-ul">
                    <li className="Nav-li">
                        <NavLink className="Nav-li" to={"/"}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink className="Header-a" to={"/servicios"}>Servicios</NavLink>
                    </li>
                    <li>
                        <NavLink className="Header-a" to={"/rooms"}>Habitaciones</NavLink>
                    </li>
                    {
                        !user ? (  // Si no hay usuario logueado
                            <>
                                <li><NavLink className="Login-btn" to="/login">Login</NavLink></li>
                                <li><NavLink className="Login-btn" to="/register">Registro</NavLink></li>
                            </>
                        ) : (  // Si hay usuario logueado
                            <>
                                <h3 className="Header-h3">{user.name}</h3>
                                <button className="Login-btn" onClick={logout} type="button">Salir</button>
                            </>
                        )
                    }
                </ul>
            </nav>
            
            <div className="Header-btn" onClick={handleOnClick}>
                <button className={`Header-btn-menu ${isMenuOpen ? 'isHidden' : ''}`}>Menu</button>
                <button className={`Header-btn-cerrar ${isMenuOpen ? '' : 'isHidden'}`}>Cerrar</button>
            </div>
        </header>
    );
};
