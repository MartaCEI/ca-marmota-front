import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useUser();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [canSubmit, setCanSubmit] = useState(false);
    const [error, setError] = useState(null);



    useEffect(() => {
        setCanSubmit(formData.username && formData.password);
    }, [formData]);


    const handleSubmit = (event) => {
        event.preventDefault();
        // Llamamos al login y manejamos el resultado
        login(formData)
            .then((error) => {
                if (error) {
                    setError(error); // Si hay un error, lo mostramos
                } else {
                    setError(null);  // Limpiamos cualquier error previo
                    navigate("/");   // Navegamos al home solo si no hay error
                }
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // si existe un user llevame a admin, sino al home (antes del return)
    return (
        <div className="Register-container">
            <h1 className="Register-h1">Login</h1>
            <form className="Register-form" onSubmit={handleSubmit}>
                <div className="Register-div">
                    <label className="Register-label" htmlFor="username">Email:</label>
                    <input
                        className="Login-input"
                        type="email"
                        id="username"
                        name="username"
                        placeholder="Correo electrónico"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        autoComplete="username"
                    />
                </div>

                <div className="Register-div">
                    <label className="Register-label" htmlFor="password">Contraseña:</label>
                    <input
                        className="Login-input"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {canSubmit ? <button className="Login-btn" type="submit">Login</button>
                    : <button className="Login-btn-disabled" type="submit" disabled>Login</button>}

            </form>
            {error && <p className="Register-error">{error}</p>}

            {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}

            <p>--- No tienes cuenta ----</p>
            <Link to={"/register"} className="Register-btn">Regístrate</Link>
        </div>
    );
};

export default Login;