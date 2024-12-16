// GaleriaContainer.js
import React, { useState } from 'react';
import { Galeria } from '@/components/Galeria';
import Popup from '@/components/Popup';

const GaleriaContainer = ({ imagesUrls, roomName }) => {
    const [activeImage, setActiveImage] = useState(null);

    const openPopup = (imageUrl) => {
        setActiveImage(imageUrl);
    };

    const closePopup = () => {
        setActiveImage(null);
    };

    return (
        <div className="Galeria-div">
            <div className="Galeria-div-inner">
                {imagesUrls.map((imageUrl, index) => (
                    <Galeria 
                        key={index} 
                        imageUrl={imageUrl} 
                        roomName={roomName}  
                        openPopup={() => openPopup(imageUrl)} // Pasa openPopup como prop
                    />
                ))}
            </div>

            {/* Mostrar el Popup si hay una imagen activa */}
            {activeImage && (
                <div className={`Popup-Galeria ${activeImage ? 'active' : ''}`}>
                    <Popup imageUrl={activeImage} roomName={roomName} closePopup={closePopup} />
                </div>
            )}
        </div>
    );
};

export default GaleriaContainer;
