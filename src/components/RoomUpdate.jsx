import React, { useState, useEffect } from 'react';

export const RoomUpdate = ({ roomId, onClose }) => {
    const [roomForm, setRoomForm] = useState({
        roomName: '',
        description: '',
        rentPerDay: ''
    });

    const { VITE_API_URL } = import.meta.env;

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
                rentPerDay: data.rentPerDay || ''
            });
        } catch (error) {
            console.error('Error al cargar los datos de la habitación:', error);
        }
    };

    // Actualizar los campos del formulario sin sobrescribir los demás
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomForm({ ...roomForm, [name]: value });
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
                alert('Room updated successfully');
                onClose();
            } else {
                alert('Error updating room');
            }
        } catch (error) {
            console.error('Error en la actualización de la habitación:', error);
        }
    };

    return (
        <form className="PopUp-form" onSubmit={handleUpdate}>
            <div className="PopUp-div">
                <label className="PopUp-label" htmlFor="roomName">Room Name:</label>
                <input
                    className="PopUp-input"
                    type="text"
                    id="roomName"
                    name="roomName"
                    value={roomForm.roomName}
                    onChange={handleChange}
                />
            </div>
            <div className="PopUp-div">
                <label className="PopUp-label" htmlFor="description">Description:</label>
                <input
                    className="PopUp-input"
                    type="text"
                    id="description"
                    name="description"
                    value={roomForm.description}
                    onChange={handleChange}
                />
            </div>
            <div className="PopUp-div">
                <label className="PopUp-label" htmlFor="rentPerDay">Rent Per Day:</label>
                <input
                    className="PopUp-input"
                    type="number"
                    id="rentPerDay"
                    name="rentPerDay"
                    value={roomForm.rentPerDay}
                    onChange={handleChange}
                />
            </div>
            <button className="PopUp-btn" type="submit">Update</button>
        </form>
    );
};
