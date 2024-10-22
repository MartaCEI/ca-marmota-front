import { createContext, useContext, useState, useEffect } from "react";

// Crear un contexto de usuario
const UserContext = createContext();

// Crear un provider y exportarlo para usarlo en main.js
export function UserProvider({children}) {
    const [user, setUser] = useState(null);

    const {VITE_API_URL, VITE_BACKEND_URL} = import.meta.env;

    // Ver si ya estoy logedin (localStorage cache)
    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Función login
    const login = async (userData) => {
        console.log("Login hook");
        console.log("Antes del Fetch: ", userData);
        
        // Llamamos al backend con el fetch
        const response = await fetch(`${VITE_API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
                // "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });

        // El back en me devuelve mi usuario completo menos la clave.
        // Response de mi consulta al back. 
        const responseData = await response.json();

        if(!response.ok) {
            console.log("NO FURULA al traer datos del back")
        }

        localStorage.setItem("user", JSON.stringify(responseData));

        console.log("Despues del Fetch: ", responseData);

        // Un avez con los datos los guardo en setUser
        setUser(responseData);

        // // Guardamos el JWT token en LocalStorage
        // localStorage.setItem('token', responseData.token);

        // return null; // no hay error
    };

    // Función register
    const register = async (userData) => {
        console.log("Register hook");
        console.log("Antes del Fetch: ", userData);

        const response = await fetch(`${VITE_API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const responseData = await response.json();

        if(!response.ok) {
            console.log("NO FURULA")
        }

        localStorage.setItem("user", JSON.stringify(responseData));

        // Guardamos el JWT token en LocalStorage
        // localStorage.setItem('token', responseData.token);

        console.log("Despues del Fetch: ", responseData);
        // Un avez con los datos los guardo en setUser
        setUser(responseData);
    };

    // Función logout
    const logout = () => {
        localStorage.removeItem("user")
        // localStorage.removeItem('token');
        setUser(null);
        console.log("User logged out");
    };

    return (
        <UserContext.Provider value={{user, login, logout, register}}>
            {children}
        </UserContext.Provider>
    );
}

// Crear un custom hook para usar el contexto de usuario
export function useUser() {
    return useContext(UserContext);
}