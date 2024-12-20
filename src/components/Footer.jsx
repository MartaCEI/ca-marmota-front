export const Footer = () => {
    const { VITE_FRONTEND_IMG } = import.meta.env;
    return (
        <>
            <footer className="Footer">
                <div className="Footer-div">
                    <div className="Footer-container">
                        <ul className="Footer-ul">
                            <li>
                                <a className="Footer-a" href="/">Home</a>
                            </li>
                            <li>
                                <a className="Footer-a" href="/servicios">Servicios</a>
                            </li>
                            <li>
                                <a className="Footer-a" href="/rooms">Habitaciones</a>
                            </li>
                            <li>
                                <a className="Footer-a" href="/login">Login</a>
                            </li>
                        </ul>
                        <img className="Footer-logo" src={`${VITE_FRONTEND_IMG}/logo.png`} alt="logo" />
                        <div className="Footer-div-inner">
                            <p className="Footer-p">© 2024</p>
                            <p className="Footer-p">Todos los derechos reservados</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}