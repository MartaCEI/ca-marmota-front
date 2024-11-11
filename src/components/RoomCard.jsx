import { Link } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';

const RoomCard = ({ _id, imagesUrls, roomName, rentPerDay, maxCount, type, description, checkIn, checkOut }) => {
    const { VITE_BACKEND_URL } = import.meta.env;
    const { user } = useUser();

    return (
        <>
        <div className="Vertical-div">
                <div className="Vertical-div-container-outter">
                    <div className="Vertical-div-container-img">
                        <img className="Vertical-img" src={`${VITE_BACKEND_URL}/img/habitaciones/${imagesUrls[0]}`} alt={roomName} />
                        <div className="Vertical-img-cover"></div>
                    </div>
                        <div className="Vertical-div-grid">
                            <div className="Vertical-div-inner text">
                                <h2 className="Vertical-h2">{roomName}</h2>
                                <div className="Vertical-HorizontalLine"></div>
                                    <p className="Horizontal-p">Por dia: ${rentPerDay}</p>
                                    <p className="Horizontal-p">Nº de personas: {maxCount}</p>
                                    <p className="Horizontal-p">Tipo: {type}</p>
                                    <div className='Rooms-div-btn'>
                                        {/* Mostrar botón "Book Now" solo si checkIn y checkOut están disponibles */}
                                        {checkIn && checkOut && (
                                            user ? (  // Si hay usuario logueado
                                                <Link className="Vertical-btn" to={`/booking/${_id}/${checkIn}/${checkOut}`}>
                                                    Reservar
                                                </Link>
                                            ) : (
                                                <Link className="Vertical-btn" to="/login">Login</Link>
                                            )
                                        )}
                                        {/* // Crear página roomDetails en rutas */}
                                        <Link to={`/room/${_id}`}>
                                            <button className="Vertical-btn">más detalles</button>
                                        </Link>
                                    </div>
                            </div>
                        <div className="Vertical-div-inner"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RoomCard;
