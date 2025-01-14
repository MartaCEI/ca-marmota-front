```js
    const login = async (userData) => {
        try {
            // Llamamos al backend con el fetch
            const response = await fetch(`${VITE_API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(userData)
            });
    
            // Convertimos la respuesta en un objeto JSON.
            const responseData = await response.json();
    
            // Si la respuesta no es exitosa, devolvemos un mensaje de error.
            if (!response.ok) {
                return responseData.message || "Error en el servidor";
            }
    
            // Si la respuesta es exitosa, extraemos los datos y los guardamos en setUser.
            const usuario = responseData.data;
            setUser(usuario);
    
            // Guardamos el usuario en localStorage.
            localStorage.setItem("user", JSON.stringify(usuario));
            console.log("Despues del Fetch: ", usuario);
            // Guardamos el token JWT en localStorage para futuras solicitudes autenticadas.
            localStorage.setItem('token', responseData.token);
    
            return null;
        } catch (e) {
            console.error('Error:', e);
            // Devolvemos un mensaje de error genérico.
            return "Error en el servidor";
        }
    };

    const register = async (userData) => {
    try {
        // Llamamos al backend con el fetch
        const response = await fetch(`${VITE_API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        // Convertimos la respuesta en un objeto JSON para trabajar con los datos.
        const responseData = await response.json();

        // Si la respuesta no es exitosa, devolvemos un mensaje de error.
        if (!response.ok) {
            return responseData.message || "Error en el servidor";
        }

         // Si la respuesta es exitosa, extraemos los datos y los guardamos en setUser.
        const usuario = responseData.data;
        setUser(usuario);

        // Guardamos el usuario en localStorage.
        localStorage.setItem('user', JSON.stringify(usuario));
        // Guardamos el token JWT en localStorage para futuras solicitudes autenticadas.
        localStorage.setItem('token', responseData.token);

        return null;
    } catch (e) {
            console.error('Error:', e);
            // Devolvemos un mensaje de error genérico.
            return "Error en el servidor";
    }
};


const logout = () => {
    // Eliminamos el usuario del localStorage y el token.
    localStorage.removeItem("user");
    localStorage.removeItem('token');
    // Actualizamos el estado global/local a `null`.
    setUser(null);
    console.log("User logged out");
};


```