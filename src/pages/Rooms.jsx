import { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import RoomCard from '@/components/RoomCard';
import { usePageInfo } from "@/hooks/usePageInfo";

function Rooms() {
    const URL = import.meta.env.VITE_API_URL;
    const { VITE_BACKEND_URL } = import.meta.env;
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
    const { pageInfo, fetchPageInfo, error } = usePageInfo(); // Extraer pageInfo y error del contexto

    useEffect(() => {
        fetchPageInfo("habitaciones"); // Llamada para cargar la información de la página "habitaciones"
    }, [fetchPageInfo]);

    const info = pageInfo; // Renombramos pageInfo para usar info en el componente

    useEffect(() => {
        async function fetchRooms() {
            try {
                const response = await fetch(`${URL}/rooms`);
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
    
        console.log('Fechas enviadas:', dates); // Verifica las fechas en la consola
    
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/availability`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dates),
            });
    
            const data = await response.json();
            console.log('Habitaciones filtradas:', data); // Verifica la respuesta
            setFilteredRooms(data); // Actualiza con habitaciones disponibles
        } catch (error) {
            console.error('Error al filtrar las habitaciones:', error);
        }
    }

    return (
        <>

<div className="Home-header">
                <img
                    className="Home-header-img"
                    src={`${VITE_BACKEND_URL}/img/${info.image}`}
                    alt={info.image || "Header"}
                />
                <img
                    className="Home-header-logo"
                    src={`${VITE_BACKEND_URL}/img/${info.logo}`}
                    alt={info.logo || "Logo"}
                />
            </div>
            <section className="Section-home">
                <h1 className="Section-home-h1">{info.title}</h1>
                <p className="Section-home-p">{info.subtitle}</p>
            </section>

            <div className='Habitaciones-div'>
                <DatePicker.RangePicker
                className="Habitaciones-range-picker"
                placeholder={['Fecha de inicio', 'Fecha de fin']}
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
                
                <button className='Nav-a-user' onClick={filterRooms} disabled={!dates.checkIn || !dates.checkOut}>
                    Check Availability
                </button>
            </div>
            <div>
                {filteredRooms.length > 0 ? (
                    filteredRooms.map(room => (
                        <div className="Section" key={room._id}>
                            <RoomCard {...room} checkIn={dates.checkIn} checkOut={dates.checkOut} />
                        </div>
                    ))
                ) : (
                    rooms.map(room => (
                        <div key={room._id}>
                            <RoomCard {...room} />
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default Rooms;