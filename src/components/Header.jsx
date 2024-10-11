import { NavLink } from "react-router-dom";

export const Header = () => {
    return (
        <header className="Header">
            <nav className="Header-nav">
                <NavLink className="Header-a" to="/"><h1 className="Header-h1">Cal Marmota</h1></NavLink>
                <ul className="Header-ul">
                    <li>
                        <NavLink className="Header-a" to={"/"}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink className="Header-a" to={"servicios"}>Servicos</NavLink>
                    </li>
                    <li>
                        <NavLink className="Header-a" to={"habitaciones"}>Habitaciones</NavLink>
                    </li>
                    <li>
                        {/* Aquí verificamos más a delante si hay una sesión abierta o no */}
                        <NavLink className="Header-btn" to={"login"} >Login o regitro</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}