import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import {Button} from '@/components/Button';

const Register = () => {
    // Información para probar la app
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        cPassword: "",
        tyc: false,
        image: 'https://picsum.photos/200'
    });

    // solo para habilitar el botón de submit
    const [canSubmit, setCanSubmit] = useState(false);
    const [error, setError] = useState(null); // Mensajes de error del formulario
    // Traemos las funciones de useUser
    const { register, user } = useUser();
    // Navigate me permite ir a cualquier sección usando JS
    const navigate = useNavigate();

    // Botón de Submit: si todo es true, setear canSubmit a true
    useEffect(() => {
        setCanSubmit(formData.name && formData.username && formData.password && formData.tyc && (formData.password === formData.cPassword));
    }, [formData]);

    // si entran a /registro y ya están logueados, los redirigimos al /home
    useEffect(() => {
        if (user) { navigate('/'); }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar si las contraseñas coinciden
        if (formData.password !== formData.cPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }
        // Si hay un error de verificacion del password o terminos o qie el usuario ya existe 
        //entonces no da el mensaje, sino, introduce los datos en el formulario y redirige la pagina al login. 
        const errorMessage = await register(formData);
        if (errorMessage) {
            setError(errorMessage); // mostramos mensaje de error si lo hay
        } else {
            setError(null); // quitamos el error si se ha solucionado
            navigate('/login'); // redirigimos a la home

        // Restablecer los datos del formulario
        setFormData({
            name: "",
            username: "",
            password: "",
            cPassword: "",
            tyc: false,
            image: 'https://picsum.photos/200'
        });
        }
    };

    return (
        <div className="Register-container">
            <h1 className="Register-h1">Regístrate</h1>
            <form className="Register-form" onSubmit={handleSubmit}>
            {error && <p className="Register-h1" style={{color:"red"}}>{error}</p>}
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

                <Button type="submit" disabled={!canSubmit}>
                    {canSubmit ? 'Registrarse' : 'Complete TODOS los datos'}
                </Button>

                <pre>{JSON.stringify(formData, null, 2)}</pre>
            </form>
        </div>
    );
}

export default Register;