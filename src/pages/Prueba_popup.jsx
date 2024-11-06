import React, { useState, useEffect } from 'react';
import { RoomUpdate } from '@/components/RoomUpdate';
import '@/css/Admin.css';

const Prueba_popup = () => {
    const URL = import.meta.env.VITE_API_URL;
    const [rooms, setRooms] = useState([]);
    const [activeRoomId, setActiveRoomId] = useState(null);

    useEffect(() => {
        getRooms();
    }, []);

    const getRooms = async () => {
        try {
            const response = await fetch(`${URL}/rooms`);
            const data = await response.json();
            setRooms(data);
        } catch (error) {
            console.error('Error al obtener las habitaciones:', error);
        }
    };

    const handlePopUp = (id) => {
        setActiveRoomId(id);
    };

    const handleClose = () => {
        setActiveRoomId(null);
    };

    return (
        <>
            <p className="mb-4"><strong>Rooms list</strong></p>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-2 px-4 border-r">Room Name</th>
                            <th className="py-2 px-4">Description</th>
                            <th className="py-2 px-4">Rent Per Day</th>
                            <th className="py-2 px-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map(({ _id, roomName, description, rentPerDay }) => (
                            <tr key={_id} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4 border-r">{roomName}</td>
                                <td className="py-2 px-4">{description}</td>
                                <td className="py-2 px-4">{rentPerDay}</td>
                                <td className="py-2 px-4">
                                    <button className="PopUp-btn" onClick={() => handlePopUp(_id)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className={`PopUp ${activeRoomId ? 'active' : ''}`}>
                    <button className="cerrar" onClick={handleClose}>Cerrar</button>
                    <RoomUpdate roomId={activeRoomId} onClose={handleClose} />
                </div>
            </div>
        </>
    );
};

export default Prueba_popup;


