import { useUser } from '@/hooks/useUser'
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
    const { user, logout } = useUser();

    return (
        <header className="Header">
            <nav className="Header-nav">
                <NavLink className="Header-a" to="/"><h1 className="Header-h1">Ca Marmota</h1></NavLink>
                <ul className="Header-ul">
                    <li>
                        <NavLink className="Header-a" to={"/"}>Home</NavLink>
                    </li>
                    {(user && user.isAdmin) ? (
                        <li>
                            <NavLink className="Header-a" to={"admin"}>Admin</NavLink>
                        </li>
                    ) : (
                        <>
                            <li>
                                <NavLink className="Header-a" to={"servicios"}>Servicos</NavLink>
                            </li>
                            <li>
                                <NavLink className="Header-a" to={"habitaciones"}>Habitaciones</NavLink>
                            </li>
                        </>
                    )}

                    {user ? (
                        <>
                            <li>
                                <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full" />
                            </li>
                            <h3 className="mt-1">{user.name}</h3>
                            <li><NavLink onClick={logout}>Logout</NavLink></li>
                        </>
                    ) : (
                        <>
                            <NavLink className="Header-btn" to={"login"} >Login o regitro</NavLink>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}