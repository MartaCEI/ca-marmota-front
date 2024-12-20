import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { formatDate } from '@/utils/date';

function Booking() {
    const { VITE_API_URL, VITE_BACKEND_URL } = import.meta.env;
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

    // Manejo de carga y error
    if (error) return <div>Error: {error}</div>;

    // Asegúrate de que room no sea null
    if (!room) return <div>No se encontró la habitación.</div>;

    const { imagesUrls = [], roomName, rentPerDay, maxCount, type, description, amenities = [], bathRoom } = room;

    return (
        <>
                <h1 className="Section-home-h1">Datos de la reserva</h1>
                <div className="Vertical-div">
                <div className="Vertical-div-container-outter">
                    <div className="Vertical-div-container-img">
                        <img className="Vertical-img" src={`${VITE_BACKEND_URL}/img/${imagesUrls[0]}`} alt={roomName} />
                        <div className="Vertical-img-cover"></div>
                    </div>
                        <div className="Vertical-div-grid">
                            <div className="Vertical-div-inner text">
                                    <p className="Horizontal-p">Para: {user.name}</p>
                                    <p className="Horizontal-p">{roomName}</p>
                                    <p className='Horizontal-p'>Entarda el dia {formatDate(checkIn)}</p>
                                    <p className='Horizontal-p'>Salida el día {formatDate(checkOut)}</p>
                                    <p className="Horizontal-p">{rentPerDay}€ por noche</p>
                                    <p className="Horizontal-p">{totalNights} noches</p>
                                <div className="Vertical-HorizontalLine"></div>
                                    <p className="Horizontal-p">Total: {totalAmount}€</p>
                                    <div className='Rooms-div-btn'>
                                        <button className='Nav-a-user text-center' onClick={handelOnClick}>Reservar</button>
                                    </div>
                            </div>
                        <div className="Vertical-div-inner"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Booking;
