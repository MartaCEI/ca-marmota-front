import React from 'react';

const { VITE_BACKEND_URL } = import.meta.env;

export const Galeria = ({ imageUrl, roomName, openPopup }) => {
    return (
        <img 
            className="Galeria-img" 
            src={`${VITE_BACKEND_URL}/img/habitaciones/${imageUrl}`} 
            alt={roomName} 
            onClick={() => openPopup(imageUrl)} // Abre el popup cuando se hace clic
        />
    );
};