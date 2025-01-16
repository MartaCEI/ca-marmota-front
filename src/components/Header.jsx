import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '@/hooks/useUser';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
    const { user, logout } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null); // Referencia para el menú

    useEffect(() => {
        if (user) {
            console.log("Usuario logueado:", user);
        } else {
            console.log("No hay usuario logueado");
        }
    }, [user]);

    const userId = user ? user._id : null;

    // Cerrar el menú al hacer scroll
    useEffect(() => {
        const handleScroll = () => {
            if (isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMenuOpen]);

    // Cerrar el menú al hacer clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Función para manejar el botón de cerrar
    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    // Función para alternar el menú
    const handleOnClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="Header">
            <nav 
                className={`Nav ${isMenuOpen ? 'isActive' : ''}`} 
                ref={menuRef} // Asignamos la referencia al menú
            >
                <div className='Nav-div'>
                    <div className='Nav-div-upper'>
                        {user ? (
                            user.isAdmin ? (
                                <ul className="Nav-ul-user">
                                    <li>
                                        <p className="Nav-p-user">Bienvenid@</p>
                                    </li>
                                    <li>
                                        <p className="Nav-p-user">{user.name}</p>
                                    </li>
                                    <li>
                                        <NavLink className="Nav-a-user" to="/admin">Área admin</NavLink>
                                    </li>
                                </ul>
                            ) : (
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
                        ) : null}
                    </div>
                    <ul className="Nav-ul">
                        <li className="Nav-li">
                            <NavLink className="Header-a" to={"/"}>Home</NavLink>
                        </li>
                        <li className="Nav-li">
                            <NavLink className="Header-a" to={"/restaurante"}>Restaurante</NavLink>
                        </li>
                        <li>
                            <NavLink className="Header-a" to={"/servicios"}>Servicios</NavLink>
                        </li>
                        <li>
                            <NavLink className="Header-a" to={"/rooms"}>Habitaciones</NavLink>
                        </li>
                    </ul>
                    <ul className="Nav-ul-user">
                        {!user ? (
                            <li>
                                <NavLink className="Nav-a-user" to="/login">Login</NavLink>
                            </li>
                        ) : (
                            <li>
                                <button className="Nav-a-user" onClick={logout} type="button">Logout</button>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
            <div className='Header-menu'>
                <div className="Header-btn">
                    <Link to="/rooms" className='Header-btn-Habitaciones'>Habitaciones &#8811;</Link>
                </div>
                <div className="Header-btn">
                    {/* Botón de menú para abrir */}
                    <button 
                        className={`Header-btn-menu ${isMenuOpen ? 'isHidden' : ''}`} 
                        onClick={handleOnClick}
                    >
                        Menu &#8811;
                    </button>
                    {/* Botón de cerrar para cerrar */}
                    <button 
                        className={`Header-btn-cerrar ${isMenuOpen ? '' : 'isHidden'}`} 
                        onClick={handleCloseMenu}
                    >
                        Cerrar &#8810;
                    </button>
                </div>
            </div>
        </header>
    );
};
