import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",   
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value });
    }

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
                <input className="Register-btn" type="submit"/>
            </form>
            <p>No tienes cuenta</p>
            <Link to={"/registro"} className="Register-btn">Regístrate</Link>
        </div>
    );
};

export default Login;