import React from 'react';
import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { NavLink } from 'react-router-dom';

export const Header = () => {
    const { user, logout } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (user) {
            console.log("Usuario logueado:", user);  // Verificar si isAdmin está presente
        } else {
            console.log("No hay usuario logueado");
        }
    }, [user]); // Se ejecuta cada vez que cambia el usuario
    
    const userId = user ? user._id : null;

    const handleOnClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="Header">
            <nav className={`Nav ${isMenuOpen ? 'isActive' : ''}`}>
                <div className='Nav-div'>
                    <div className='Nav-div-upper'>
                    {
                    user ? ( // Si hay un usuario
                            user.isAdmin ? ( // Si es admin
                                <ul className="Nav-ul-user">
                                    <li>
                                        <p className="Nav-p-user">Bienvenid@</p>
                                    </li>
                                    <li>
                                        <p className="Nav-p-user">{user.name}</p>
                                    </li>
                                    <li>
                                        <NavLink className="Nav-a-user" to="/admin">Area admin</NavLink>
                                    </li>
                                </ul>
                            ) : ( // Si no es admin
                                <ul className="Nav-ul-user">
                                    <li>
                                        <p className="Nav-p-user">Bienvenid@</p>
                                    </li>
                                    <li>
                                        <p className="Nav-p-user">{user.name}</p>
                                    </li>
                                    <li>
                                        <NavLink className="Nav-a-user" to={`/myBookings/${userId}`}>Mis reservas</NavLink>
                                    </li>
                                </ul>
                            )
                        ) : null
                    }
                    </div>
                    <ul className="Nav-ul">
                        <li className="Nav-li">
                            <NavLink className="Header-a" to={"/"}>Home</NavLink>
                        </li>
                        <li className="Nav-li">
                            <NavLink className="Header-a" to={"/restaurante"}>Restuarante</NavLink>
                        </li>
                        <li>
                            <NavLink className="Header-a" to={"/servicios"}>Servicios</NavLink>
                        </li>
                        <li>
                            <NavLink className="Header-a" to={"/rooms"}>Habitaciones</NavLink>
                        </li>
                    </ul>
                    <ul className="Nav-ul-user">
                        {
                            !user ? (  // Si no hay usuario logueado
                                <li>
                                    <NavLink className="Nav-a-user" to="/login">Login</NavLink>
                                </li>
                            ) : (  // Si hay usuario logueado
                                <li>
                                    <button className="Nav-a-user" onClick={logout} type="button">Logout</button>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </nav>
            
            <div className="Header-btn" onClick={handleOnClick}>
                <button className={`Header-btn-menu ${isMenuOpen ? 'isHidden' : ''}`}>Menu &#8811;</button>
                <button className={`Header-btn-cerrar ${isMenuOpen ? '' : 'isHidden'}`}>Cerrar &#8810;</button>
            </div>
        </header>
    );
};
