import { createBrowserRouter } from "react-router-dom";
import Layout from "@/Layout";
import ErrorPage from "@/ErrorPage";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import Services from "@/pages/Services";
import Rooms from "@/pages/Rooms";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { PrivateRoute } from "@/components/PrivateRoute";
import Booking from "@/pages/Booking";
import RoomDetails from "@/pages/RoomDetails";
import MyBookigns from "@/pages/MyBookings";
import UpdateRooms from "@/pages/UpdateRoom";

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
                    element: <PrivateRoute><Admin /></PrivateRoute>
                },
                { 
                    path: "/servicios",
                    element: <Services />
                },
                {
                    path:"/booking/:roomId/:checkIn/:checkOut", 
                    element: <PrivateRoute><Booking /></PrivateRoute>
                },
                {
                    path:"/myBookings/:id", 
                    element: <PrivateRoute><MyBookigns /></PrivateRoute>
                },
                { 
                    path: "/rooms",
                    element: <Rooms />
                },
                {
                    path: "/room/:id",
                    element: <RoomDetails />
                },
                {   
                    path: "/UpdateRoom/:id",
                    element: <UpdateRooms />
                },
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/register",
                    element: <Register />
                }
            ]
        }
    ]
)