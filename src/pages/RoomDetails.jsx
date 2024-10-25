import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Amenity } from '../components/Amenity';

const RoomDetails = () => {
    const { id } = useParams();
    const [room, setRoom] = useState({});

    const { VITE_API_URL } = import.meta.env;

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

    const cleanImageUrl = (url) => url.replace(/['"]+/g, '');
    const { imagesUrls = [], roomName, rentPerDay, maxCount, type, description, amenities = [] } = room;

    return (
        <>
        <div className='container'>
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
        </>
    );
}

export default RoomDetails;