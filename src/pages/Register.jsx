import React, { useState } from 'react';

const Register = () => {

    // const navigate = useNavigate();
    // const {register} = useUser();

    // Información para probar la app
    const [formData, setFormData] = useState({
        name:"",
        username:"",
        password:"",
        tyc:false,
        image: 'https://picsum.photos/200'
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        // register(formData);
        // navigate("/admin"); // me voy al admin
    };

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({ 
            ...formData, 
            [name]: type==="checkbox" ? checked : value }); 
            // En caso de que el type sea checkbox, me miras si esta checked o no,
            // sino, mirame el valor del value. 
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
                    type="name"
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

                <input className="Register-btn" type="submit" />

                <pre>{JSON.stringify(formData, null, 2)}</pre>
            </form>
        </div>
    );
}

export default Register;