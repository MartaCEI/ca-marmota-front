import { createBrowserRouter } from "react-router-dom";
import Layout from "@/Layout";
import ErrorPage from "@/ErrorPage";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import Services from "@/pages/Services";
import Rooms from "@/pages/Rooms";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { PrivateRoute } from "@/components/PrivateRoute";

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