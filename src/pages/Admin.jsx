import { useEffect, useState } from "react";
import { RoomUpdate } from "@/components/RoomUpdate";
import { BookingsTable } from "@/components/BookingsTable";
import { UsersTable } from "../components/UsersTable";
import { RoomsTable } from "../components/RoomsTable";

const Admin = () => {
    const URL = import.meta.env.VITE_API_URL;
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [activeRoomId, setActiveRoomId] = useState(null);
    // Modal para actualizar habitaciones
    const handlePopUp = (id) => {
        setActiveRoomId(id); // Abre el modal para la habitación seleccionada.
    };

    const handleClose = () => {
        setActiveRoomId(null);  // Cierra el modal.
    };

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
        <div className="Table-container">
            <h1 className="Table-h1">Área Admin</h1>
            {/* Tablas de bookings */}
            <BookingsTable bookings={bookings} cancelBooking={cancelBooking} />
            
            {/* Tabla de usuarios */}
            <UsersTable users={users} handleDelete={handleDelete} />

            {/* Lista de habitaciones */}
            <RoomsTable rooms={rooms} handlePopUp={handlePopUp} />
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
                        <RoomUpdate roomId={activeRoomId} onClose={handleClose} getRooms={getRooms} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;