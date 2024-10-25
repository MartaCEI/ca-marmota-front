import { useEffect, useState } from "react";
import { formatDate } from "../utils/date";
import { useParams } from "react-router-dom";

const Admin = () => {
    const { id } = useParams();
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [cancelados, setCancelados] = useState([]);

    useEffect(() => {
        getBookings();
        getUsers();
    }, []);

    const { VITE_API_URL } = import.meta.env;

    const getUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${VITE_API_URL}/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Error al obtener usuarios');
            const responseData = await response.json();
            setUsers(responseData.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${VITE_API_URL}/bookings`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Error al obtener bookings');
            const responseData = await response.json();
            setBookings(responseData.data);
            console.log(responseData.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const cancelBooking = async (bookingId) => {
        const confirmCancel = window.confirm("¿Estás seguro de que deseas cancelar esta reserva?");
        if (!confirmCancel) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${VITE_API_URL}/bookings/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error al cancelar la reserva: ${errorData.message}`);
            }

            getBookingsById();
        } catch (error) {
            setError('Error al cancelar la reserva');
            console.error('Error:', error);
        } 
    };

        // Eliminar usuario
        const handleDelete = async (userId) => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${VITE_API_URL}/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                alert('Usuario eliminado correctamente');
                getUsers(); // Recargar lista de usuarios
            } else {
                alert('Error al eliminar el usuario');
            }
        };
    
        // Actualizar usuario (ejemplo simple para actualizar el username)
        const handleUpdate = async (userId) => {
            const token = localStorage.getItem('token');
            const newUsername = prompt('Ingrese el nuevo nombre de usuario:');
            if (newUsername) {
                const response = await fetch(`${VITE_API_URL}/users/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ username: newUsername })
                });
                if (response.ok) {
                    alert('Usuario actualizado correctamente');
                    getUsers(); // Recargar lista de usuarios
                } else {
                    alert('Error al actualizar el usuario');
                }
            }
        };

        return (
            <>
                <h1 className="text-2xl font-bold mb-4">Admin</h1>
                <small>Sección Privada de Admin</small>
        
                {/* Tabla para los bookings confirmados */}
                <p className="mb-4"><strong>Lista de Bookings Confirmados</strong></p>
                {bookings.filter(b => b.status === "booked").length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="py-2 px-4 border-r">Habitación</th>
                                    <th className="py-2 px-4 border-r">Checkin</th>
                                    <th className="py-2 px-4">Checkout</th>
                                    <th className="py-2 px-4">Nombre</th>
                                    <th className="py-2 px-4">Email</th>
                                    <th className="py-2 px-4">Precio/día</th>
                                    <th className="py-2 px-4">Total</th>
                                    <th className="py-2 px-4">Noches</th>
                                    <th className="py-2 px-4">Transacción</th>
                                    <th className="py-2 px-4">Estado</th>
                                    <th className="py-2 px-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.filter(b => b.status === "booked").map(({ roomId, userId, checkIn, checkOut, totalAmount, totalNights, transactionId, status }) => (
                                    <tr key={transactionId} className="border-b hover:bg-gray-50">
                                        <td className="py-2 px-4 border-r">{roomId.roomName}</td>
                                        <td className="py-2 px-4 border-r">{formatDate(checkIn)}</td>
                                        <td className="py-2 px-4">{formatDate(checkOut)}</td>
                                        <td className="py-2 px-4">{userId ? userId.name : "Usuario eliminado"}</td>
                                        <td className="py-2 px-4">{userId ? userId.username : "Usuario eliminado"}</td>
                                        <td className="py-2 px-4">{roomId.rentPerDay}</td>
                                        <td className="py-2 px-4">{totalAmount}</td>
                                        <td className="py-2 px-4">{totalNights}</td>
                                        <td className="py-2 px-4">{transactionId}</td>
                                        <td className="py-2 px-4">{status}</td>
                                        <td className="py-2 px-4">
                                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => cancelBooking(_id)}>Cancelar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
        
                {/* Tabla para los bookings cancelados */}
                <p className="mb-4"><strong>Lista de Bookings Cancelados</strong></p>
                {bookings.filter(b => b.status === "cancelled").length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="py-2 px-4 border-r">Habitación</th>
                                    <th className="py-2 px-4 border-r">Checkin</th>
                                    <th className="py-2 px-4">Checkout</th>
                                    <th className="py-2 px-4">Nombre</th>
                                    <th className="py-2 px-4">Email</th>
                                    <th className="py-2 px-4">Precio/día</th>
                                    <th className="py-2 px-4">Total</th>
                                    <th className="py-2 px-4">Noches</th>
                                    <th className="py-2 px-4">Transacción</th>
                                    <th className="py-2 px-4">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.filter(b => b.status === "cancelled").map(({ roomId, userId, checkIn, checkOut, totalAmount, totalNights, transactionId, status }) => (
                                    <tr key={transactionId} className="border-b hover:bg-gray-50">
                                        <td className="py-2 px-4 border-r">{roomId.roomName}</td>
                                        <td className="py-2 px-4 border-r">{formatDate(checkIn)}</td>
                                        <td className="py-2 px-4">{formatDate(checkOut)}</td>
                                        <td className="py-2 px-4">{userId ? userId.name : "Usuario eliminado"}</td>
                                        <td className="py-2 px-4">{userId ? userId.username : "Usuario eliminado"}</td>
                                        <td className="py-2 px-4">{roomId.rentPerDay}</td>
                                        <td className="py-2 px-4">{totalAmount}</td>
                                        <td className="py-2 px-4">{totalNights}</td>
                                        <td className="py-2 px-4">{transactionId}</td>
                                        <td className="py-2 px-4">{status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            <p className="mb-4">La lista de usuario es solo accesible por <strong>Usuarios Autenticados</strong></p>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-2 px-4 border-r">Nombre</th>
                            <th className="py-2 px-4">Usuario/Email</th>
                            {/* phoneNumber */}
                            <th className="py-2 px-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(({ _id, name, username }) => (
                            <tr key={_id} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4 border-r">{name}</td>
                                <td className="py-2 px-4">{username}</td>
                                <td className="py-2 px-4">
                                    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete(_id)}>Eliminar</button>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleUpdate(_id)}>Actualizar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Admin;