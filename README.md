# CAL MARMOTA
Sistenma de reservas de un a casa rural 

## Comprendiendo el problema del Cliente (FrontEnd Primero)

 1. Antes de planificar bases de datos, servidores, vamos a resolver la interacción con el usuario.
 2. Nos centraremos en crear un Layout Básico con las funcionalidades principales, sin preocuparnos por el detras de escena.
 3. Esto nos ayuda a entender mejor las necesidades de nuestros clientes, además de evitar que nos abrumeos con conceptos del backend o base de datos.


## Front

Nuestro Front tendrá:
Páginas: Home Pública, About Pública, Abitaciones, Servicios, Registro, Login, ADMIN Privada para ver las reservas.
Crear carpetas pages, components, hooks, lib, css, lib/routes.

- [x] Crear Front con Vite-React + React-Router-Dom
- [x] Alias @ para Vite `vite.config.js`
- [x] Instalar TailwindCSS (script cdn + tailwind.config.js)
- [x] Crear pagina de error 404.
- [x] Crear Páginas:
        [x]<Layout>
        [x]<Home>
        [x]<About> (Conócenos)
        [x]<Rooms> (Hay 3 habitaciones)
        [x]<Services> (Servicios)
        [x]<Login>
        [x]<Register> (Registro)
        [x]<Admin>
- [x] Crear Layout (Header + Outlet + Footer)
- [x] Configurar Rutas de React-Router-Dom lib/routes/routes.jsx
- [x] Configurar main.jsx con React-Router-Dom <RouterProvider router={router} />
- [x] Mock User (en public/constants.json) para pruebas.
- [x] Formulario de Login - handleLogin()
- [x] Formulario de Registro - handleRegistro()
- [x] Botones de Login + Registro (<Button>)
- [x] Craemos un contexto utilizando useContext para manejar el estado de autenticación y su hook personalizado `hooks/useUser.jsx`
- [x] Header condicional si existe user, botón Logout
- [x] Simulamos guardar datos de usuario en LocalStorage
- [x] Botón de Logout y Limpieza de Sesión
- [x] Proteger ruta privada <PrivateRoute>
- [x] Crear Variables de entorno para VITE
- [x] Crear los fetch para Login y Registro
- [] Token con JWT
- [ ] Upload de Archivos


## Back

Nuestro Back tendrá una API Rest con rutas para Auth y Usuarios. También poseerá un middleware para proteger rutas privadas.

- [] Crear Back con Express y dependencias (cors, nodemon, dotenv, mongoose)
- [] Instalar dependencias de Auth (bcrypt, jsonwebtoken)
- [] Crear variables de entorno
- [] Archivo de config.js
- [] Crear Rutas de Auth (/registro, /login, /users)
- [] Crear una ruta protegida (/admin)
- [] Hash con Bcrypt
- [] JWT con JsonWebToken para protección de rutas privadas
- [] Crear middleware auth.js que devuelve true siempre
- [] Esquemas de Mongoose para usuarios (nombre, email, contraseña)
- [] Conexión a MongoDB Atlas
- [] Testing
- [] Upload de Archivos (Multer)


# Frontend
1. Crear Front con Vite-React + React-Router-Dom
```bash	
npm init vite@latest
npm i react-router-dom
```

2. Alias @ para Vite `vite.config.js`
Para usar el @ en la carpeta src siempre (así no tenemos que hacer ../../)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
})
```

3. Instalar TailwindCSS (script cdn + tailwind.config.js).
- En el index.html escribimos el CDN de TailwindCSS.com dentro del header (CDN = Repositorio oonline para testearlo)
    <script src="https://cdn.tailwindcss.com"></script>
- Para que nos ayude el visual a utilizar tailwind, crearemos un archivo archivo tailwind.config.js y copiamos el código de la página de TailwindCSS. 
IMPORTANTE: aGREFAR JSX Y HTML. 
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,html,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. Crear pagina de error 404.
```js
const Error404 = () => {
    return (
        <div>
            <h1>Error 404</h1>
            <p>Página no encontrada</p>
        </div>
    );
}
```

5. Crear Páginas/components: 
- pages (Home, About, Rooms, Services, Login, Register, Admin)
- components (Header, Footer)
```js 
const Home = () => {
    return (
        <>
                <h1>Home</h1>
                <p>Esta es pública</p>
        </>
    );
}

export default Home;
```

6. Crear Layout (Header + Outlet + Footer)
```js
main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/lib/routes/routes'
import { UserProvider } from '@/hooks/useUser.jsx'
import '@/css/index.css'
import '@/css/header.css'
import '@/css/Register.css'
import '@/css/sections.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> (Contexto de Usuario)
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)


Layout.jsx
const Layout = () => {
    return (
            <div className="Container">
            <Header />
            <main className="Main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
Header.jsx (básico)
const Header = () => {
        return (
                <header className="Header">
            <nav>
                <h1><NavLink to="/">Ca Marmota</NavLink></h1>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/admin">Admin</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/rooms">Rooms</NavLink></li>
                    <li><NavLink to="/services">Services</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/register">Register</NavLink></li>
                    <li>Salir</li>
                </ul>
            </nav>
        </header>
    );
}


// Tambien se puden crear las rutas dentro del archivo main.jsx
main.jsx
import { StrictMode } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
createRoot(document.getElementById('root')).render(
<StrictMode>
        <Router>
                <App />
        </Router>
</StrictMode>
)

App.jsx
<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Error404 />} />
</Routes>
```

7. Configurar Rutas de React-Router-Dom lib/routes/routes.jsx
```js
import Home, About, Rooms, Services, Login, Register, Admin, Error404 from '@/pages'
import { Route } from 'react-router-dom'
export const router = createBrowserRouter (
    [
        {
            path: "/",
            element: <Layout />,
            errorElement: <ErrorPage />,
            children: [
                { 
                    path: "/",
                    element: <Home />
                },
                { 
                    path: "/admin",
                    element: <Admin />
                },
                { 
                    path: "/servicios",
                    element: <Services />
                },
                { 
                    path: "/habitaciones",
                    element: <PrivateRoute><Rooms /></PrivateRoute> 
                },
                {
                    path: "/about",
                    element: <About />
                },
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/registro",
                    element: <Register />
                }
            ]
        }
    ]
)
```

8. Mock User (en public/constants.json) para pruebas y creamos un objeto con los datos del usuario.
IMPORTANTE: Como es una función, las variables no van con comillas. Si fuera un json, si que irian con comillas.
```js
export const user = {
    nombre: "Marta",
    username: "marta@mail.com",
    password: "123456",
    imagen: "https://www.picsum.photos/200"
}
```

9. Formulario de Login - handleLogin()
```js
const Login = () => {
    const [fromData, setFormData] = useState({
        username: "",
        password: "",
        // NOTA: esta info que deberia devolver el backend PERO es para probarlo, por eso está completado. 
        nombre: "Marta",
        imagen: "https://www.picsum.photos/200"
    })
        // IMPORTANTE: Todos los campos del formulario tienen un name y un value. Lo que hace el setFormData es copiar el formulario con ...fromData y se fuja en que input estamos usando con e.target.name y le cambia el valor con el e.target.value.
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value });
    }

        // IMPORTANTE: e.preventDefault() evita que el formulario se envie por defecto.
        const handleSubmit = (e) => {
                e.preventDefault()
                console.log(formData)
        }

        return (
                <form onSubmit={handleSubmit}>
                     <input type="email" 
                        name="username" 
                        placeholder="Email" 
                        value={formData.username} 
                        onChange={handleChange} />
                     <input type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleChange} />
                     <input type="submit" value="Login" />
                </form>
        )
}
```

10. Formulario de Registro - handleRegistro()
```js
const Registro = () => {
        const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        cPassword: "",
        tyc: false,
        image: 'https://picsum.photos/200'
    });

        // Deconstruimos el name, value, type y checked del evento.
        const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({ 
            ...formData, 
            [name]: type==="checkbox" ? checked : value }); 
        //     Mira el name y luego el tipo, su es un checkbox, guarda el valor checked, si no es un checkbox guarda el valor de las variables segun el name.
    }

// Creamos un useState con la variable canSubmit que es false por defecto. Luego creamos un useEffect que se ejecuta cada vez que cambia el formData. Si el formData.name, formData.username, formData.password, formData.cPassword, formData.tyc y formData.password === formData.cPassword son true, entonces canSubmit es true.
const [canSubmit, setCanSubmit] = useState(false);
    useEffect(() => {
        setCanSubmit(formData.name && formData.username &&
            formData.password && formData.cPassword &&
            formData.tyc && formData.password === formData.cPassword);
    }, [formData]);

        const handleSubmit = (e) => {
                e.preventDefault()
                console.log(formData)
        }

        const canSubmit = () => {
                return formData.tyc && formData.password === formData.cPassword;
        }

        return (
                <form onSubmit={handleSubmit}>
                <input type="text" 
                        name="name"
                        placeholder="nombre"
                        value={formData.name} 
                        onChange={handleChange} />
                     <input type="email" 
                        name="username" 
                        placeholder="Email" 
                        value={formData.username} 
                        onChange={handleChange} />
                     <input type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleChange} />
                     <input type="password" 
                        name="cPassword" 
                        placeholder="Confirm Password" 
                        value={formData.cPassword} 
                        onChange={handleChange} />
                     <label htmlFor="cPassword">
                        <input type="checkbox" 
                                checked={formData.tyc}
                                name="tyc" 
                                placeholder="tyc" 
                                onChange={handleChange} />
                        Aceptar terminos y condiciones
                     </label>

                     {canSubmit ? <input type="submit" value="Registro" />
                    : <button disabled>Registro</button>}

                </form>
        )
}
```

IMPORTANTE: Con el usenabigate podemos navegar a otra página. Sin necesidad de un boton. Se pondrá en el handleSubmit.
- importar el hook useNavigate
- Instanciarlo
- Navegar a la página que queramos
```js
import {useNavigate} from 'react-router-dom';
const navigate = useNavigate();
navigate('/admin'); (navega a la página admin)
```

11. Hook de Usuario: UserProvider y useUser (hooks/useUser.jsx)
- Creamos un contexto con createContext y useContext
- Creamos un provider y lo exportamos para usarlo en nuestro main.jsx (IMPORTANTISIMO: ABRAZAR TODA LA APP CON EL PROVIDER).
        - Creamos el useState user para poder acceder a los datos del usuario desde cuanquier sitio.
        - función login
        - función logout
        - función register
        - función getUser
- Creamos un hook personalizado para usar el contexto (useUser)
```js
import { createContext, useContext, useState } from 'react'
// Creamos un contexto con createContext y useContext
const UserContext = createContext();
// Creamos un provider y lo exportamos para usarlo en nuestro main.jsx (IMPORTANTISIMO: ABRAZAR TODA LA APP CON EL PROVIDER)

export const UserProvider = ({children}) => {
// Para acceder a los datos del usuario desde cuanquier sitio. 
    const [user, setUser] = useState(null);

// Login: userData es un objeto con los datos del usuario. 
        const login = (userData) => {
                // Aquí deberíamos hacer un fetch a nuestro backend
                setUser({userData});
        }
        
        // register: userData es un objeto con los datos del usuario
                const register = (userData) => {
                        // Aquí deberíamos hacer un fetch a nuestro backend
                        setUser({userData});
                }

        const logout = () => {
                setUser(null);
        }


        const getUser = () => {
                return user;
        }

        // Este return es el que envuelve a todos los children con el provider de UserContext que abrazará a toda la app en el main. <UserProvider> <RouterProvider router={router} /> </UserProvider>. Le mandaremos como values todas las funciones y el user que se van a usar en toda la app.
        return (
                <UserContext.Provider value={{user, login, logout, register, getUser}}>
                        {children}
                </UserContext.Provider>
        )
}


// Creamos un hook personalizado para usar el contexto
// Crear un custom hook para usar el contexto de usuario
export function useUser() {
    return useContext(UserContext);
}

```

NOTA: Para usar los datos en cualquiero otro lugar importamos el hook useUser y lo instanciamos.
```js
import { useUser } from '@/hooks/useUser.jsx'
const {user, login, logout, register, getUser} = useUser();
```

login.jsx
- importamos el hook useUser
- instanciamos el hook useUser
- dentro de la función handleSubmmit, llamamos a la función login y le pasamos el formData.
```js
const handleSubmmit = (e) => {
    e.preventDefault();
    register(formData);
    navigate('/login');
}
```
register.jsx
```js
const handleSubmmit = (e) => {
    e.preventDefault();
    register(formData);
    navigate('/login');
}
```
Con esto funcionaría el Header. Si el usuario está logueado, aparecerá el botón de salir. Si no está logueado, aparecerá el botón de login. Así como la protección de rutas privadas. siAdmin = true, aparecerá el botón de admin. Si no, aparecerán otra páginas. 
Por ahora al hacer login, el fromData es:   
```js	
const [formData, setFormData] = useState({
        username: "",
        password: "",
        // Estos son de prueba (tiene que traerlo de la bases de datos) y guardarlo en el localStorage.
        image: 'https://picsum.photos/200',
        name: "Marta",
        isAdmin: true
    });
```

## Trabajando con localStorage dentro de useUser.jsx
login:
Aquí, simulamos que el fetch que nos devolverá algo con la constante responseData. Entonces guardamos el usuario en el localStorage.
A la variable le llamaremos 'user' y le pasaremos el objeto responseData.
Pero localStorage solo guarda strings, por lo que lo convertimos en un string con JSON.stringify(responseData).
```js	
// Login: userData es un objeto con los datos del usuario. 
const login = (userData) => {
        // Aquí deberíamos hacer un fetch a nuestro backend

        // el backend nos devolverá el usuario completo con todos los datos
        const responseData = userData;

        // Guardamos el usuario en el localStorage
        localStorage.setItem('user', JSON.stringify(responseData));

        setUser({responseData});
}
```
register:
Aquí, simulamos que el fetch que nos devolverá algo con la constante responseData. Entonces guardamos el usuario en el localStorage.
A la variable le llamaremos 'user' y le pasaremos el objeto responseData.
Pero localStorage solo guarda strings, por lo que lo convertimos en un string con JSON.stringify(responseData).
```js
// register: userData es un objeto con los datos del usuario
const register = (userData) => {
        // Aquí deberíamos hacer un fetch a nuestro backend

        // el backend nos devolverá el usuario completo con todos los datos
        const responseData = userData;

        // Guardamos el usuario en el localStorage
        localStorage.setItem('user', JSON.stringify(responseData));

        setUser({responseData});
}
```

Para comprobar si se está pasando bien, en inspeccionar, en la pestaña de Application, en localStorage, debería aparecer el objeto con los datos del usuario.

- Para ver si hay un usuario ya logueado usaremos un useEffect. Buscaremos con una nueva variable llamada storedUser y recogemos los datos del localStorage con localStorage.getItem('user'). Si existe, lo guardamos en la variable setUser y la parseamos pata convertirlo en un objeto con setUser(JSON.parse(storedUser)). 
```js
useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if(storedUser) {
                setUser(JSON.parse(storedUser));
        }
}, []);

// Corrijo también el logout para que borre el usuario del localStorage
const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
}
```

12. Componente: PrivateRoute.jsx
- Creamos un componente PrivateRoute.jsx
- Importamos el hook useUser e instanciamos user. 
- La lógica es... si el user existe (está logueado), entonces renderiza el children. Si no, renderiza un mensaje de error y un botón para loguearse.
NOTA: Podemos hacer lo mismo pero dentro de admin o dentro del boton Booking para que solo los usuarios logueados puedan hacer un booking.
```js
import { useUser } from '@/hooks/useUser.jsx'

const PrivateRoute = ({children, ...rest}) => {
    const {user} = useUser();
    // Si existe childern, si no existe, navega al login.
    //return user ? children : <Navigate to="/login" />;

    return user ? children 
                : (<>
                    <p className="text-red-500">Acceso restringido para usuarios</p>
                    {/* Podemos incluso cargar componentes como nuestro Login Form aquí también  */}
                    <p className="my-2">Si lo deseas puedes acceder a continuación:</p>
                    <Login />
                  </>)
}

export default PrivateRoute;
```
- En el archivo de rutas, importamos el componente PrivateRoute y lo usamos en la ruta que queramos proteger.
```js
import PrivateRoute from '@/components/PrivateRoute'
.....
{ 
        path: "/habitaciones",
        element: <PrivateRoute><Rooms /></PrivateRoute> 
},
.....
```

14. Crear la variable de entorno para VITE
- Creamos un archivo .env en la raíz del proyecto.
```bash
VITE_API_URL="http://localhost:3000/api/v1"
VITE_BACKEND_URL="http://localhost:3000"
```
Las importamos en el archivo que queramos usarlas:
```js
    const {VITE_API_URL, VITE_BACKEND_URL} = import.meta.env;
```

15. Crear los fetch para Login y Registro
```js
const login = async (userData) => {
    // Llamamos al backend con el fetch
    const response = await fetch(`${VITE_API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
            // "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });

    // El back en me devuelve mi usuario.
    // Response de mi consulta al back. 
    const responseData = await response.json();

    // Si la respuesta no es correcta, lanzamos un error.
    if(!response.ok) {
        console.log("NO FURULA al traer datos del back")
    }

    localStorage.setItem("user", JSON.stringify(responseData));

    console.log("Despues del Fetch: ", responseData);
    
    // Un avez con los datos los guardo en setUser
    setUser(responseData);
};

const register = async (userData) => {
    // Llamamos al backend con el fetch
    const response = await fetch(`${VITE_API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
            // "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });

    // El back en me devuelve mi usuario.
    // Response de mi consulta al back.
    const responseData = await response.json();

    // Si la respuesta no es correcta, lanzamos un error.
    if(!response.ok) {
        console.log("NO FURULA al traer datos del back")
    }

    localStorage.setItem("user", JSON.stringify(responseData));

    console.log("Despues del Fetch: ", responseData);

    // Un avez con los datos los guardo en setUser
    setUser(responseData);

    ```














```bash
bun init
bun i express mongoose dotenv cors
bun i nodemon --dev
bun i bcrypt jsonwebtoken
```

