import React, { useState, useEffect } from 'react';

export const RoomUpdate = ({ roomId, onClose, getRooms }) => {
    const [roomForm, setRoomForm] = useState({
        roomName: '',
        description: '',
        rentPerDay: '',
        maxCount: '',
        type: ''
    });

    const { VITE_API_URL } = import.meta.env;

    const [image, setImage] = useState(null);

    // Cargar datos de la habitación cuando se abra el popup
    useEffect(() => {
        if (roomId) getRoomById();
    }, [roomId]);

    // Obtener los datos de la habitación por ID
    const getRoomById = async () => {
        try {
            const response = await fetch(`${VITE_API_URL}/rooms/${roomId}`);
            const data = await response.json();
            setRoomForm({
                roomName: data.roomName || '',
                description: data.description || '',
                rentPerDay: data.rentPerDay || '',
                maxCount: data.maxCount || '',
                type: data.type || ''
            });
        } catch (error) {
            console.error('Error al cargar los datos de la habitación:', error);
        }
    };

    // Actualizar los campos del formulario sin sobrescribir los demás
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomForm({ ...roomForm, [name]: value });
        const file = e.target.files[0];
        setImage(file);  // Almacenar el archivo seleccionado
    };

    // Manejo de actualización de la habitación
    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch(`${VITE_API_URL}/rooms/${roomId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(roomForm)
            });
    
            if (response.ok) {
                alert('La habitación se ha actualizado correctamente');
                onClose();  // Cerrar el modal
                getRooms();  // Actualizar la lista de habitaciones

                // Fetch de la subida de la imagen al backend public/uploads
            if (image) {
                const formData = new FormData();
                formData.append('image', image);

                const imageResponse = await fetch(`${VITE_API_URL}/upload`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });

                if (imageResponse.ok) {
                    alert('Imagen subida correctamente');
                } else {
                    alert('Error al subir la imagen');
                }
            }

            } else {
                alert('Error en la actualización de la habitación');
            }
        } catch (error) {
            console.error('Error en la actualización de la habitación:', error);
        }
    };
    

    return (
        <form className="Modal-form" onSubmit={handleUpdate}>
            <div className="Modal-div">
                <label className="Modal-label" htmlFor="roomName">Habitación:</label>
                <input
                    className="Modal-input"
                    type="text"
                    id="roomName"
                    name="roomName"
                    value={roomForm.roomName}
                    onChange={handleChange}
                />
            </div>
            <div className="Modal-div">
                <label className="Modal-label" htmlFor="description">Descripción:</label>
                <textarea
                    className="Modal-input"
                    type="text"
                    id="description"
                    name="description"
                    value={roomForm.description}
                    onChange={handleChange}
                />
            </div>
            <div className="Modal-div">
                <label className="Modal-label" htmlFor="rentPerDay">Precio por noche:</label>
                <input
                    className="Modal-input"
                    type="number"
                    id="rentPerDay"
                    name="rentPerDay"
                    value={roomForm.rentPerDay}
                    onChange={handleChange}
                />
            </div>
            <div className="Modal-div">
                <label className="Modal-label" htmlFor="maxCount">Capacidad máxima:</label>
                <input
                    className="Modal-input"
                    type="number"
                    id="maxCount"
                    name="maxCount"
                    value={roomForm.maxCount}
                    onChange={handleChange}
                />
            </div>
            <div className="Modal-div">
                <label className="Modal-label" htmlFor="type">Tipo:</label>
                <input
                    className="Modal-input"
                    type="text"
                    id="type"
                    name="type"
                    value={roomForm.type}
                    onChange={handleChange}
                />
            </div>
            {/* Campo para subir imagen */}
            <div className="Modal-div">
                <label className="Modal-label" htmlFor="image">Imagen:</label>
                <input
                    className="Modal-input"
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleChange}
                />
            </div>
            <button className="Login-btn" type="submit">Update</button>
        </form>
    );
};
