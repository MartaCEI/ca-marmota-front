import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Amenity } from '../components/Amenity';
import { Link } from 'react-router-dom';

const RoomDetails = () => {
    const { id } = useParams();
    const [room, setRoom] = useState({});

    const { VITE_API_URL, VITE_BACKEND_URL } = import.meta.env;

    useEffect(() => {
        fetchRoom();
    }, []);

    const fetchRoom = async () => {
        try {
            const response = await fetch(`${VITE_API_URL}/rooms/${id}`);
            const data = await response.json();
            setRoom(data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener la habitación:', error);
        }
    };

    const { imagesUrls = [], roomName, rentPerDay, maxCount, type, description, amenities = [] } = room;

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
                            <p className="Horizontal-p">{description}</p>
                            <p className="Horizontal-p">Por dia: ${rentPerDay}</p>
                            <p className="Horizontal-p">Nº de personas: {maxCount}</p>
                            <p className="Horizontal-p">Tipo: {type}</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="p">Amenities: </p>
            <ul className='Amenity-div'>
                {
                    amenities.map((amenity, index) => (
                        <Amenity key={index} amenity={amenity} />
                    ))
                }
            </ul>
            <Link className="Vertical-btn" to="/rooms">Volver</Link>
            <div className="Vertical-div-inner"></div>
        </>
    );
}

export default RoomDetails;