import { useEffect, useState } from "react";
import { formatDate } from "../utils/date";
import { Link } from "react-router-dom";

const Admin = () => {
    const URL = import.meta.env.VITE_API_URL;
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        getBookings();
        getUsers();
        getRooms();
    }, []);


    const getUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${URL}/users`, {
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
            const response = await fetch(`${URL}/bookings`, {
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

    const getRooms = async () => {
        try {
            const response = await fetch(`${URL}/rooms`);
            const data = await response.json();
            setRooms(data);
        } catch (error) {
            console.error('Error al obtener las habitaciones:', error);
        }
    }

    const cancelBooking = async (bookingId) => {
        const confirmCancel = window.confirm("¿Estás seguro de que deseas cancelar esta reserva?");
        if (!confirmCancel) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${URL}/bookings/${bookingId}`, {
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

            getBookings();
        } catch (error) {
            setError('Error al cancelar la reserva');
            console.error('Error:', error);
        } 
    };

        // Eliminar usuario
        const handleDelete = async (userId) => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${URL}/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                alert('Usuario eliminado correctamente');
                getUsers(); 
            } else {
                alert('Error al eliminar el usuario');
            }
        };
    
        return (
            <>  <div className="flex justify-between">
                    <div></div>
                    <h1 className="text-2xl font-bold mb-4 text-center">Admin</h1>
                </div>
                
                {/* Tabla para los bookings confirmados */}
                <p className="mb-4"><strong>Lista de Bookings Confirmados</strong></p>
                {bookings.filter(b => b.status === "booked").length > 0 ? (
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
                                {bookings.filter(b => b.status === "booked").map(({ _id, roomId, userId, checkIn, checkOut, totalAmount, totalNights, transactionId, status }) => (
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
                ) : (
                    <p className="text-gray-500">No hay bookings confirmados.</p>
                )}

                {/* Tabla para los bookings cancelados */}
                <p className="mb-4"><strong>Lista de Bookings Cancelados</strong></p>
                {bookings.filter(b => b.status === "cancelled").length > 0 ? (
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
                ) : (
                    <p className="text-gray-500">No hay bookings cancelados.</p>
                )}
        
            {/* Tabla para los usuarios */}
            <p className="mb-4"><strong>La lista de usuarios</strong></p>
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Tabla para lo cuartos donde se hace un fetch a los cusrtos y hay un boton de update.*/}
            <p className="mb-4"><strong>Rooms list</strong></p>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-2 px-4 border-r">Room Name</th>
                            <th className="py-2 px-4">Description</th>
                            <th className="py-2 px-4">Rent Per Day</th>
                            <th className="py-2 px-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map(({ _id, roomName, description, rentPerDay }) => (
                            <tr key={_id} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4 border-r">{roomName}</td>
                                <td className="py-2 px-4">{description}</td>
                                <td className="py-2 px-4">{rentPerDay}</td>
                                <td className="py-2 px-4">

                                {/* Hacer un Pop up con background blur y meter el form como un componente en el Pop up */}
                                <Link to={`/UpdateRoom/${_id}`}>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded">Update</button>
                                </Link>
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