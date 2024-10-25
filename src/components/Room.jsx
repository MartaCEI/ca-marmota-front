import { Link } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';


const Room = ({ _id, imagesUrls, roomName, rentPerDay, maxCount, type, description, checkIn, checkOut }) => {
    const { user } = useUser();

    // Verifica si room tiene imágenes y quita las comillas adicionales
    const cleanImageUrl = (url) => url.replace(/['"]+/g, '');
    return (
        <div className="Section">
            <div className="col-md-4">
                <img className="smallimg" src={cleanImageUrl(imagesUrls[0])} alt="image" />
            </div>
            <div>
                <h2>{roomName}</h2>
                <b>
                    <p>Rent per day: ${rentPerDay}</p>
                    <p>Max count: {maxCount}</p>
                    <p>Type: {type}</p>
                </b>
                <div>
                    {/* Mostrar botón "Book Now" solo si checkIn y checkOut están disponibles */}
                    {checkIn && checkOut && (
                        user ? (  // Si hay usuario logueado
                            <Link className="Login-btn" to={`/booking/${_id}/${checkIn}/${checkOut}`}>
                                Book Now
                            </Link>
                        ) : (
                            <Link className="Login-btn" to="/login">Logueate primero</Link>
                        )
                    )}
                    {/* // Crear página roomDetails en rutas */}
                    <Link to={`/room/${_id}`}>
                        <button className="Login-btn m-2">View Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Room;
