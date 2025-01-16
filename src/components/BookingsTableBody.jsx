import { formatDate } from "@/utils/date";

export const BookingsTableBody = ({ bookings, cancelBooking }) => {
    return ( 
        <tbody>
            {bookings.map(({ _id, roomId, userId, checkIn, checkOut, totalAmount, totalNights, transactionId, status }) => (
                <tr key={`${_id}-${status}`}>
                    <td className="Table-td">{roomId.roomName}</td>
                    <td className="Table-td">{formatDate(checkIn)}</td>
                    <td className="Table-td">{formatDate(checkOut)}</td>
                    <td className="Table-td">{userId ? userId.name : "Usuario eliminado"}</td>
                    <td className="Table-td">{userId ? userId.username : "Usuario eliminado"}</td>
                    <td className="Table-td">{totalAmount} €</td>
                    <td className="Table-td">{totalNights}</td>
                    <td className="Table-td">{transactionId}</td>
                    <td className="Table-td">{status}</td>
                    {status === "booked" && (
                        <td className="Table-td">
                            <button className="Table-btn" onClick={() => cancelBooking(_id)}>Cancelar</button>
                        </td>
                    )}
                </tr>
            ))}
        </tbody>
    );
};
