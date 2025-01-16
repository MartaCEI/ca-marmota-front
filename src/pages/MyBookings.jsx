import { useEffect, useState } from "react";
import { formatDate } from "../utils/date";
import { Link, useParams } from "react-router-dom";

const MyBookings = () => {
    const { id } = useParams();
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');


    useEffect(() => {
        getBookingsById();
    }, [bookings]);

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
        <div className="Table-container">
            <h1 className="Table-h1">Mis Reservas</h1>
            {bookings.length > 0 ? (
                <div className="Table-wrapper">
                    <table className="Table">
                        <thead>
                            <tr className="Table-thead">
                                <th className="Table-th">Habitación</th>
                                <th className="Table-th">Checkin</th>
                                <th className="Table-th">Checkout</th>
                                <th className="Table-th">Precio/día</th>
                                <th className="Table-th">Total</th>
                                <th className="Table-th">Noches</th>
                                <th className="Table-th">Transacción</th>
                                <th className="Table-th">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(({ _id, roomId, checkIn, checkOut, totalAmount, totalNights, transactionId, status }) => (
                                status === 'cancelled' ? (
                                    <tr>
                                        <td className="Table-td">{roomId.roomName}</td>
                                        <td className="Table-td">{formatDate(checkIn)}</td>
                                        <td className="Table-td">{formatDate(checkOut)}</td>
                                        <td className="Table-td">{roomId.rentPerDay} €</td>
                                        <td className="Table-td">{totalAmount} €</td>
                                        <td className="Table-td">{totalNights}</td>
                                        <td className="Table-td">{transactionId}</td>
                                        <td className="Table-td">
                                        <p className="Table-td">Reserva cancelada</p>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td className="Table-td">{roomId.roomName}</td>
                                        <td className="Table-td">{formatDate(checkIn)}</td>
                                        <td className="Table-td">{formatDate(checkOut)}</td>
                                        <td className="Table-td">{roomId.rentPerDay} €</td>
                                        <td className="Table-td">{totalAmount} €</td>
                                        <td className="Table-td">{totalNights}</td>
                                        <td className="Table-td">{transactionId}</td>
                                        <td className="Table-td">
                                            <button className="Table-btn" onClick={() => cancelBooking(_id)}>Cancelar</button>
                                        </td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="Table-wrapper">
                    <p className="Table-title">Todavía no hay reservas. ¡Explora nuestras opciones de reserva!</p>
                    <Link className="Marmota-btn" to={"/rooms"}>Habitaciones</Link>
                </div>
            )}
        </div>
    );
};

export default MyBookings;
