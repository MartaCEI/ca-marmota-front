import { Link } from 'react-router-dom';


const Room = ({ _id, imagesUrls, name, rentPerDay, maxCount, type, description, checkIn, checkOut }) => {

    return (
        <div className="Section">
            <div className="col-md-4">
                <img className="smallimg" src={imagesUrls[0]} alt="image" />
            </div>
            <div>
                <h2>{name}</h2>
                <b>
                    <p>Rent per day: ${rentPerDay}</p>
                    <p>Max count: {maxCount}</p>
                    <p>Type: {type}</p>
                </b>
                <div>
                    {/* Mostrar botón "Book Now" solo si checkIn y checkOut están disponibles */}
                    {checkIn && checkOut && (
                        <Link to={`/booking/${_id}/${checkIn}/${checkOut}`}>
                            <button className="Login-btn">Book Now</button>
                        </Link>
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
