import { Link } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';

const RoomCard = ({ _id, imagesUrls, roomName, rentPerDay, maxCount, type, description, checkIn, checkOut, bathRoom }) => {
    const { VITE_BACKEND_URL } = import.meta.env;
    const { user } = useUser();

    return (
        <>
        <div className="Vertical-div">
                <div className="Vertical-div-container-outter">
                    <div className="Vertical-div-container-img">
                        <img className="Vertical-img" src={`${VITE_BACKEND_URL}/img/${imagesUrls[0]}`} alt={roomName} />
                        <div className="Vertical-img-cover"></div>
                    </div>
                        <div className="Vertical-div-grid">
                            <div className="Vertical-div-inner text">
                                <h2 className="Vertical-h2">{roomName}</h2>
                                <div className="Vertical-HorizontalLine"></div>
                                    <p className="Horizontal-p">Habitación individual</p>
                                    <p className="Horizontal-p">Baño {bathRoom}</p>
                                    <p className="Horizontal-p">Capacidad máxima: {maxCount}</p>
                                    <p className="Horizontal-p">{type}</p>
                                    <p className="Horizontal-p">{rentPerDay}€ por noche</p>
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
                                        <Link to={`/room/${_id}`}>
                                            <button className="Vertical-btn">Más detalles</button>
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
