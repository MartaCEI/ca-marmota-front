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
- [] Header condicional si existe user, botón Logout
- [] Craemos un contexto utilizando useContext para manejar el estado de autenticación y su hook personalizado `hooks/useUser.jsx`
- [] Simulamos guardar datos de usuario en LocalStorage
- [] Proteger ruta privada <PrivateRoute>
- [] Botón de Logout y Limpieza de Sesión
- [] Crear Variables de entorno para VITE_BACKEND_URL
- [] Crear los fetch para Login y Registro
- [ ] Upload de Archivos

```bash
bun create vite front
bun i react-router-dom
```

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


```bash
bun init
bun i express mongoose dotenv cors
bun i nodemon --dev
bun i bcrypt jsonwebtoken
```