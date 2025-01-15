// Popup.js
import React from 'react';

const Popup = ({ imageUrl, roomName, closePopup }) => {
    return (
        <div className="Popup-Galeria-Overlay" onClick={closePopup}>
            <div className="Popup-Galeria-Content" onClick={(e) => e.stopPropagation()}>
                <img 
                    className="Popup-Galeria-Img" 
                    src={`${import.meta.env.VITE_BACKEND_URL}/img//${imageUrl}`} 
                    alt={roomName} 
                />
                <button className="Popup-Galeria-CloseBtn" onClick={closePopup}>X</button>
            </div>
        </div>
    );
};

export default Popup;
