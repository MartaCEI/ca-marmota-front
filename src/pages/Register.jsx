import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';

const Register = () => {
    const navigate = useNavigate();
    const {register} = useUser();
    // Estado para habilitar el botón de registro usando un booleano. 
    const [canSubmit, setCanSubmit] = useState(false);
    // Información para probar la app
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        cPassword: "",
        tyc: false,
        image: 'https://picsum.photos/200'
    });

    // Cada vez que cambia formData se ejecuta el useEffect. Cuando todas son verdaderas, se habilita el botón de registro.
    useEffect(() => {
        setCanSubmit(formData.name && formData.username &&
            formData.password && formData.cPassword &&
            formData.tyc && formData.password === formData.cPassword);
    }, [formData]);


    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({ 
            ...formData, 
            [name]: type==="checkbox" ? checked : value }); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        register(formData);
        navigate("/");
    }

    return (
        <div className="Register-container">
            <h1 className="Register-h1">Regístrate</h1>
            <form className="Register-form" onSubmit={handleSubmit}>
                <div className="Register-div">
                    <label className="Register-label" htmlFor="name">Nombre:</label>
                    <input
                        className="Register-input"
                        id='name'
                        type="text"
                        name="name"
                        placeholder="Nombre de usuario"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autocomplete="name"
                        />
                </div>

                <div className="Register-div">
                    <label className="Register-label" htmlFor="username">Email:</label>
                    <input
                        className="Register-input"
                        id='username'
                        type="email"
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
                        className="Register-input"
                        id='password'
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        />
                </div>

                <div className="Register-div">
                    <label className="Register-label" htmlFor="cPassword">Confirmar Contraseña:</label>
                    <input
                        className="Register-input"
                        id='cPassword'
                        type="password"
                        name="cPassword"
                        placeholder="Confirmar contraseña"
                        value={formData.cPassword}
                        onChange={handleChange}
                        required
                        />
                </div>

                <div className="Register-div">
                    <input
                        className="Register-checkbox"
                        id='tyc'
                        type="checkbox"
                        name="tyc"
                        checked={formData.tyc}
                        onChange={handleChange}
                        />
                    <label className="Register-label" htmlFor="tyc">Acepto los términos y condiciones</label>
                </div>

                {canSubmit ? <input type="submit" value="Registro" />
                    : <button disabled>Registro</button>}

                <pre>{JSON.stringify(formData, null, 2)}</pre>
            </form>
        </div>
    );
}

export default Register;