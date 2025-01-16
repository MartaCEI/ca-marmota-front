export const RoomsTable = ({ rooms, handlePopUp }) => {
    return (
        <>
            <p className="Table-title">Lista de habitaciones</p>
            <div className="Table-wrapper">
                <table className="Table">
                    <thead>
                        <tr className="Table-thead">
                            <th className="Table-th">Room Name</th>
                            <th className="Table-th">Description</th>
                            <th className="Table-th">Precio</th>
                            <th className="Table-th">Capacidad máxima</th>
                            <th className="Table-th">Tipo</th>
                            <th className="Table-th">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map(({ _id, roomName, description, rentPerDay, maxCount, type }) => (
                            <tr key={_id}>
                                <td className="Table-td">{roomName}</td>
                                <td className="Table-td">{description}</td>
                                <td className="Table-td">{rentPerDay} €</td>
                                <td className="Table-td">{maxCount}</td>
                                <td className="Table-td">{type}</td>
                                <td className="Table-td">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handlePopUp(_id)}>Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}