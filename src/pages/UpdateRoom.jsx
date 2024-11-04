
import { useState } from 'react';

// Tengo que mandar los datos como si fuera un componente o hacer un fetch con el _id como useParams().
const UpdateRooms = ({ _id, imagesUrls, roomName, rentPerDay, maxCount, type, description}) => {
    const [room, setRoom] = useState({
        roomName: roomName,
        description: description,
        rentPerDay: rentPerDay,
        maxCount: maxCount,
        type: type,
        imagesUrls: [],
    });
    return (
        <>
            <h1>Update Rooms</h1>

            <p>Form</p>
            <p>Multer</p>
        </>
    );
}

export default UpdateRooms;