import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Amenity } from '@/components/Amenity';
import { Link } from 'react-router-dom';
import GaleriaContainer from '@/components/GaleriaContainer';

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
        } catch (error) {
            console.error('Error al obtener la habitación:', error);
        }
    };

    const { imagesUrls = [], roomName, rentPerDay, maxCount, type, bathRoom, description, amenities = [] } = room;

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
                            <p className="Horizontal-p">{description}</p>

                        </div>
                    </div>
                </div>
            </div>
            <div className='Amenity-div'>
                <div className="Amenity-div-inner">
                    <div className="Amenity-div-left">
                        <ul className='Amenity-ul'>
                            {
                                amenities.map((amenity, index) => (
                                    <Amenity key={index} amenity={amenity} />
                                ))
                            }
                        </ul>
                    </div>
                    <div className="Amenity-div-right">
                        <p>Habitación individual</p>
                        <p>Baño {bathRoom}</p>
                        <p>Capacidad máxima: {maxCount}</p>
                        <p>{type}</p>
                        <p>{rentPerDay}€ por noche</p>
                    </div>
                </div>
            </div>
                <GaleriaContainer imagesUrls={imagesUrls} roomName={roomName} />
            <div className='Amenity-div-btn'>
                <Link className="Amenity-btn" to="/rooms">Volver</Link>
            </div>
        </>
    );
}

export default RoomDetails;