import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Amenity } from '@/components/Amenity';
import { useUser } from '@/hooks/useUser';
import { formatDate } from '@/utils/date';

function Booking() {
    const { VITE_API_URL } = import.meta.env;
    const { user } = useUser();
    const { roomId, checkIn, checkOut } = useParams(); // Obtiene roomId, checkIn y checkOut de la URL
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalNights, setTotalNights] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);


    useEffect(() => {
        fetchRoom();
    }, [roomId]);

    const fetchRoom = async () => {
        try {
            const response = await fetch(`${VITE_API_URL}/rooms/${roomId}`);
            if (!response.ok) {
                throw new Error('Error al obtener la habitación');
            }
            const data = await response.json();
            setRoom(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // Asegúrate de establecer loading en false al final
        }
    };

    // Calcular el total de noches y el monto total
    useEffect(() => {
        if (room && room.rentPerDay && checkIn && checkOut) {
            const newCheckIn = new Date(checkIn);
            const newCheckOut = new Date(checkOut);
            const nights = Math.ceil((newCheckOut - newCheckIn) / (1000 * 60 * 60 * 24));
            setTotalNights(nights);
            setTotalAmount(nights * room.rentPerDay);
        }
    }, [room, checkIn, checkOut]);

    const bookRoom = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = user._id 
    
            console.log('User ID:', userId); // Verifica el valor de userId
    
            if (!userId) {
                alert('Error: No se encontró el usuario. Por favor, inicie sesión.');
                return;
            }

            const response = await fetch(`${VITE_API_URL}/booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId,
                    roomId,
                    checkIn,
                    checkOut,
                    totalAmount,
                    totalNights,
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Reserva exitosa');
            } else {
                alert('Error al reservar: ' + data.message);
            }
        } catch (error) {
            console.error('Error al realizar la reserva:', error);
            alert('Error al realizar la reserva');
        }
    };

    const handelOnClick = () => {
        bookRoom();
    };

    const cleanImageUrl = (url) => url.replace(/['"]+/g, '');

    // Manejo de carga y error
    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    // Asegúrate de que room no sea null
    if (!room) return <div>No se encontró la habitación.</div>;

    const { imagesUrls = [], roomName, rentPerDay, maxCount, type, description, amenities = [] } = room;

    return (
        <>
            <div className='container'>
                <h1>{user.name} Aqui están los datos de tu reserva</h1>
                <h2 className='text-center'>{roomName}</h2>
                {/* Verifica si hay imágenes antes de renderizar */}
                {imagesUrls.length > 0 ? (
                    <img src={cleanImageUrl(imagesUrls[0])} alt="room" />
                ) : (
                    <p>No images available</p> // Mensaje alternativo si no hay imágenes
                )}
                <p>{description}</p>
                <p>Max count: {maxCount}</p>
                <p>Rent per day: ${rentPerDay}</p>
                <p>Type: {type}</p>
                <p>Amenities: </p>
                {
                    amenities.map((amenity, index) => (
                        <Amenity key={index} amenity={amenity} />
                    ))
                }
            </div>
            <p>Total de noches: {totalNights}</p>
            <p>Monto total: ${totalAmount}</p>
            <p>CheckIn: {formatDate(checkIn)}</p>
            <p>CheckOut: {formatDate(checkOut)}</p>
            <button onClick={handelOnClick}>Book</button>
        </>
    );
}

export default Booking;
