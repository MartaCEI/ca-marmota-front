import React from 'react';
import { useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { NavLink } from 'react-router-dom';

export const Header = () => {
    const { user, logout } = useUser();

    useEffect(() => {
        if (user) {
            console.log("Usuario logueado:", user);  // Verificar si isAdmin está presente
        } else {
            console.log("No hay usuario logueado");
        }
    }, [user]); // Se ejecuta cada vez que cambia el usuario

    const userId = user ? user._id : null;


    return (
        <header className="Header">
            <nav className="Header-nav">
                <NavLink className="Header-a" to="/">
                    <h1 className="Header-h1">Ca Marmota</h1>
                </NavLink>
                <ul className="Header-ul">
                    <li>
                        <NavLink className="Header-a" to={"/"}>Home</NavLink>
                    </li>
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
                                <img className="Header-img" src={user.image} alt={user.name} />
                                <h3 className="Header-h3">{user.name}</h3>
                                <button className="Login-btn" onClick={logout} type="button">Salir</button>
                            </>
                        )
                    }
                </ul>
            </nav>
        </header>
    );
};
