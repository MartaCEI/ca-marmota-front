import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Booking() {
    const { roomId, checkIn, checkOut } = useParams(); // Obtiene roomId, checkIn y checkOut de la URL
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalNights, setTotalNights] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        async function fetchRoomDetails() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`);
                const data = await response.json();
                setRoom(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }

        fetchRoomDetails();
    }, [roomId]);

    // Calcular el total de noches y el monto total
    useEffect(() => {
        if (room && room.rentPerDay && checkIn && checkOut) {
            const newCheckIn = new Date(checkIn); // Convertir checkIn de cadena a objeto Date
            const newCheckOut = new Date(checkOut); // Convertir checkOut de cadena a objeto Date
            const nights = Math.ceil((newCheckOut - newCheckIn) / (1000 * 60 * 60 * 24)); // Diferencia en días
            setTotalNights(nights);
            setTotalAmount(nights * room.rentPerDay); // Calcular el costo total
        }
    }, [room, checkIn, checkOut]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>{room.roomName}</h1>
            <p>{room.description}</p>
            <p>Check-In: {checkIn}</p>
            <p>Check-Out: {checkOut}</p>
            <p>Precio por noche: ${room.rentPerDay}</p>
            <p>Total de noches: {totalNights}</p>
            <p>Monto total: ${totalAmount}</p>
        </div>
    );
}

export default Booking;