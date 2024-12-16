import { useEffect, useState } from "react";
import { formatDate } from "../utils/date";
import { useParams } from "react-router-dom";

const MyBookings = () => {
    const { id } = useParams();
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');


    useEffect(() => {
        getBookingsById();
    }, []);

    const { VITE_API_URL } = import.meta.env;

    const getBookingsById = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${VITE_API_URL}/bookings/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Error al obtener reservas');

            const responseData = await response.json();
            setBookings(responseData.data);
        } catch (error) {
            setError('Error al cargar las reservas');
            console.error('Error:', error);
        }

    };

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

    return (
        <>
            <h1>Mis Reservas</h1>
            {/* {error && <p className="text-red-500">{error}</p>} Mensaje de error */}
            {bookings.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-500">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="py-2 px-4 border-r">Habitación</th>
                                <th className="py-2 px-4 border-r">Checkin</th>
                                <th className="py-2 px-4">Checkout</th>
                                <th className="py-2 px-4">Precio/día</th>
                                <th className="py-2 px-4">Total</th>
                                <th className="py-2 px-4">Noches</th>
                                <th className="py-2 px-4">Transacción</th>
                                <th className="py-2 px-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(({ _id, roomId, checkIn, checkOut, totalAmount, totalNights, transactionId, status }) => (
                                status === 'cancelled' ? (
                                    <tr key={transactionId} className="border-b hover:bg-gray-50">
                                        <td className="py-2 px-4 border-r">{roomId.roomName}</td>
                                        <td className="py-2 px-4 border-r">{formatDate(checkIn)}</td>
                                        <td className="py-2 px-4">{formatDate(checkOut)}</td>
                                        <td className="py-2 px-4">{roomId.rentPerDay}</td>
                                        <td className="py-2 px-4">{totalAmount}</td>
                                        <td className="py-2 px-4">{totalNights}</td>
                                        <td className="py-2 px-4">{transactionId}</td>
                                        <td className="py-2 px-4">
                                        <p className="py-2 px-4">Reserva cancelada</p>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr key={transactionId} className="border-b hover:bg-gray-50">
                                        <td className="py-2 px-4 border-r">{roomId.roomName}</td>
                                        <td className="py-2 px-4 border-r">{formatDate(checkIn)}</td>
                                        <td className="py-2 px-4">{formatDate(checkOut)}</td>
                                        <td className="py-2 px-4">{roomId.rentPerDay}</td>
                                        <td className="py-2 px-4">{totalAmount}</td>
                                        <td className="py-2 px-4">{totalNights}</td>
                                        <td className="py-2 px-4">{transactionId}</td>
                                        <td className="py-2 px-4">
                                            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => cancelBooking(_id)}>Cancelar</button>
                                        </td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Todavía no hay reservas. ¡Explora nuestras opciones de reserva!</p>
            )}
        </>
    );
};

export default MyBookings;
