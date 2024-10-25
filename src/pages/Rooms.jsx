import { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import Room from '../components/Room';

function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [dates, setDates] = useState({ checkIn: '', checkOut: '' });

    useEffect(() => {
        async function fetchRooms() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`);
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error('Error al obtener las habitaciones:', error);
            }
        }
        fetchRooms();
    }, []);

    async function filterRooms() {
        if (!dates.checkIn || !dates.checkOut) return; // Asegurarse de que las fechas estén definidas

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/availability`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dates),
            });

            const data = await response.json();
            setFilteredRooms(data); // Actualiza con habitaciones disponibles
        } catch (error) {
            console.error('Error al filtrar las habitaciones:', error);
        }
    }

    return (
        <>
            <div className='flex gap-4 m-auto'>
                <DatePicker.RangePicker
                    onChange={(dates) => {
                        if (dates) {
                            setDates({
                                checkIn: dates[0].format('YYYY-MM-DD'),
                                checkOut: dates[1].format('YYYY-MM-DD'),
                            });
                        } else {
                            setDates({ checkIn: '', checkOut: '' });
                        }
                    }}
                />
                <button className='Login-btn' onClick={filterRooms} disabled={!dates.checkIn || !dates.checkOut}>
                    Check Availability
                </button>
            </div>
            <div>
                <h1>Rooms</h1>
                {filteredRooms.length > 0 ? (
                    filteredRooms.map(room => (
                        <div className="Section" key={room._id}>
                            <Room {...room} checkIn={dates.checkIn} checkOut={dates.checkOut} />
                        </div>
                    ))
                ) : (
                    rooms.map(room => (
                        <div key={room._id}>
                            <Room {...room} />
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default Rooms;