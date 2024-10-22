import React from 'react';
import { useUser } from '@/hooks/useUser'
import { NavLink } from 'react-router-dom';

export const Header = () => {
    const { user, logout } = useUser();

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
                    {/* {(user && user.isAdmin) ? ( */}
                        <li>
                            <NavLink className="Header-a" to={"/admin"}>Admin</NavLink>
                        </li>
                    {/* ) : ( */}
                        <>
                            <li>
                                <NavLink className="Header-a" to={"/servicios"}>Servicos</NavLink>
                            </li>
                            <li>
                                <NavLink className="Header-a" to={"/habitaciones"}>Habitaciones</NavLink>
                            </li>
                        </>
                    {/* )} */}

                    {
                        !user ? (  // If no user is logged in
                            <>
                                <li><NavLink className="Login-btn" to="/login">Login</NavLink></li>
                                <li><NavLink className="Login-btn" to="/register">Registro</NavLink></li>
                            </>
                        ) : (  // If user is logged in
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
}