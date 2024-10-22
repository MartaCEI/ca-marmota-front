import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const {login} = useUser();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        // Estos son de prueba (tiene que traerlo de la bases de datos)
        image: 'https://picsum.photos/200',
        name: "Marta",
        isAdmin: true
    });
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        setCanSubmit(formData.username && formData.password);
    }, [formData]);


    const handleSubmit = (event) => {
        event.preventDefault();
        login(formData)
        // if user && user.isAdmin llevame a admin, sino, al home
        // navigate(user.isAdmin ? "/admin" : "/");
        navigate("/"); // me voy al home
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
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
                        autocomplete="username"
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
                : <button className="Login-btn" type="submit" disabled>Login</button>}

            </form>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
            
            <p>--- No tienes cuenta ----</p>
            <Link to={"/register"} className="Register-btn">Regístrate</Link>
        </div>
    );
};

export default Login;