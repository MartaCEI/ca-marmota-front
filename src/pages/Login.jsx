import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/Button';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState(null); // Mensajes de error del formulario

    // uso de mi custom hook useUser
    const { login, user } = useUser();
    // Navigate me permite ir a cualquier sección usando JS
    const navigate = useNavigate();

    // si entran a /login y ya están logueados, los redirigimos a /admin
    useEffect(() => {
        if (user) { navigate('/'); }
    }, [user, navigate]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorMessage = await login(formData);
        if (errorMessage) {
            setError(errorMessage);
        } else {
            setError(null);
            // Aquí puedes restablecer el formulario
            setFormData({ username: "", password: "" }); // Resetea el formulario
        }
    };

    return (
        <div className="Register-container">
            <h1 className="Register-h1">Login</h1>
            <form className="Register-form" onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
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
                <Button type="submit">Login</Button>
            </form>
            <p>--- No tienes cuenta ----</p>
            <Link to={"/registro"} className="Register-btn">Regístrate</Link>
        </div>
    );
};

export default Login;