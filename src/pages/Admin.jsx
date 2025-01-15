import { useEffect, useState } from "react";
import { formatDate } from "@/utils/date";
import { RoomUpdate } from "@/components/RoomUpdate";
import { Link } from "react-router-dom";

const Admin = () => {
    const URL = import.meta.env.VITE_API_URL;
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [activeRoomId, setActiveRoomId] = useState(null);



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

    // Modal para actualizar habitaciones
    const handlePopUp = (id) => {
        setActiveRoomId(id); // Abre el modal para la habitación seleccionada.
    };

    const handleClose = () => {
        setActiveRoomId(null);  // Cierra el modal.
    };

    return (
        <div className="Table-container">
            <h1 className="Table-h1">Admin</h1>

            {/* Tabla para los bookings confirmados */}
            <p className="Table-title"><strong>Lista de Bookings Confirmados</strong></p>
            {bookings.filter(b => b.status === "booked").length > 0 ? (
                <table className="Table">
                    <thead>
                        <tr className="Table-thead">
                            <th className="Table-th">Habitación</th>
                            <th className="Table-th">Checkin</th>
                            <th className="Table-th">Checkout</th>
                            <th className="Table-th">Nombre</th>
                            <th className="Table-th">Email</th>
                            <th className="Table-th">Total</th>
                            <th className="Table-th">Noches</th>
                            <th className="Table-th">Transacción</th>
                            <th className="Table-th">Estado</th>
                            <th className="Table-th">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.filter(b => b.status === "booked").map(({ _id, roomId, userId, checkIn, checkOut, totalAmount, totalNights, transactionId, status }) => (
                            <tr key={transactionId} className="border-b hover:bg-gray-50">
                                <td className="Table-td">{roomId.roomName}</td>
                                <td className="Table-td">{formatDate(checkIn)}</td>
                                <td className="Table-td">{formatDate(checkOut)}</td>
                                <td className="Table-td">{userId ? userId.name : "Usuario eliminado"}</td>
                                <td className="Table-td">{userId ? userId.username : "Usuario eliminado"}</td>
                                <td className="Table-td">{totalAmount}</td>
                                <td className="Table-td">{totalNights}</td>
                                <td className="Table-td">{transactionId}</td>
                                <td className="Table-td">{status}</td>
                                <td className="Table-td">
                                    <button className="Table-btn" onClick={() => cancelBooking(_id)}>Cancelar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="Table-error">No hay bookings confirmados.</p>
            )}

            {/* Tabla para los bookings cancelados */}
            <p className="Table-title"><strong>Lista de Bookings Cancelados</strong></p>
            {bookings.filter(b => b.status === "cancelled").length > 0 ? (
                <table className="Table">
                    <thead>
                        <tr className="Table-thead">
                            <th className="Table-th">Habitación</th>
                            <th className="Table-th">Checkin</th>
                            <th className="Table-th">Checkout</th>
                            <th className="Table-th">Nombre</th>
                            <th className="Table-th">Email</th>
                            <th className="Table-th">Total</th>
                            <th className="Table-th">Noches</th>
                            <th className="Table-th">Transacción</th>
                            <th className="Table-th">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.filter(b => b.status === "cancelled").map(({ roomId, userId, checkIn, checkOut, totalAmount, totalNights, transactionId, status }) => (
                            <tr key={transactionId} className="border-b hover:bg-gray-50">
                                <td className="Table-td">{roomId.roomName}</td>
                                <td className="Table-td">{formatDate(checkIn)}</td>
                                <td className="Table-td">{formatDate(checkOut)}</td>
                                <td className="Table-td">{userId ? userId.name : "Usuario eliminado"}</td>
                                <td className="Table-td">{userId ? userId.username : "Usuario eliminado"}</td>
                                <td className="Table-td">{totalAmount}</td>
                                <td className="Table-td">{totalNights}</td>
                                <td className="Table-td">{transactionId}</td>
                                <td className="Table-td">{status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="Table-error">No hay bookings cancelados.</p>
            )}

            {/* Tabla para los usuarios */}
            <p className="Table-title"><strong>La lista de usuarios</strong></p>
                <table className="Table">
                    <thead>
                        <tr className="Table-thead">
                            <th className="Table-th">Nombre</th>
                            <th className="Table-th">Usuario/Email</th>
                            <th className="Table-th">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(({ _id, name, username }) => (
                            <tr key={_id} className="border-b hover:bg-gray-50">
                                <td className="Table-td">{name}</td>
                                <td className="Table-td">{username}</td>
                                <td className="Table-td">
                                    <button className="Table-btn" onClick={() => handleDelete(_id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            {/* Renderizar lista de habitaciones */}
            <p className="Table-title"><strong>Rooms list</strong></p>
                <table className="Table">
                    <thead>
                        <tr className="Table-thead">
                            <th className="Table-th">Room Name</th>
                            <th className="Table-th">Description</th>
                            <th className="Table-th">Rent Per Day</th>
                            <th className="Table-th">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map(({ _id, roomName, description, rentPerDay }) => (
                            <tr key={_id} className="border-b hover:bg-gray-50">
                                <td className="Table-td">{roomName}</td>
                                <td className="Table-td">{description}</td>
                                <td className="Table-td">{rentPerDay}</td>
                                <td className="Table-td">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handlePopUp(_id)}>Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal para RoomUpdate */}
                {activeRoomId && (
                    <div className="Modal-background">
                        <div className="Modal-container">
                            <button
                                className="Popup-Galeria-CloseBtn"
                                onClick={handleClose}
                            >
                                X
                            </button>
                            <RoomUpdate roomId={activeRoomId} onClose={handleClose} />
                        </div>
                    </div>
                )}
        </div>
    );
}

export default Admin;