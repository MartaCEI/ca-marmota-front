import { useEffect, useState } from "react";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        getBookings();
        getUsers();
    }, []);

    // Cargar variable de entorno VITE_BACKEND_URL
        const {VITE_API_URL } = import.meta.env;
    const getUsers = async () => {
        const token = localStorage.getItem('token'); // obtengo el Token JWT del localStorage

        const response = await fetch(`${VITE_API_URL}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const responseData = await response.json();
        console.log(responseData);
        setUsers(responseData.data);
    }

    const getBookings = async () => {
        const token = localStorage.getItem('token'); // obtengo el Token JWT del localStorage

        const response = await fetch(`${VITE_API_URL}/bookings`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const responseData = await response.json();
        console.log(responseData);
        setBookings(responseData.data);
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Admin</h1>
            <small>Sección Privada</small>

            <p className="mb-4">La lista bookings solo accesible por <strong>Usuarios Autenticados</strong></p>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-2 px-4 border-r">Checkin</th>
                            <th className="py-2 px-4">Checkout</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(({ checkIn, checkOut }) => (
                            <tr className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4 border-r">{checkOut}</td>
                                <td className="py-2 px-4">{checkOut}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <p className="mb-4">La lista de usuario es solo accesible por <strong>Usuarios Autenticados</strong></p>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-2 px-4 border-r">Nombre</th>
                            <th className="py-2 px-4">Usuario/Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(({ name, username }) => (
                            <tr className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4 border-r">{name}</td>
                                <td className="py-2 px-4">{username}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Admin;