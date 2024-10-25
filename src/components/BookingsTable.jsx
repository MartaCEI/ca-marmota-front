import { formatDate } from "@/utils/date";

export const BookingsTable = (bookings) => (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr className="bg-gray-100 border-b">
                    <th className="py-2 px-4 border-r">Habitación</th>
                    <th className="py-2 px-4 border-r">Checkin</th>
                    <th className="py-2 px-4">Checkout</th>
                    <th className="py-2 px-4">Nombre</th>
                    <th className="py-2 px-4">Email</th>
                    <th className="py-2 px-4">Precio/día</th>
                    <th className="py-2 px-4">Total</th>
                    <th className="py-2 px-4">Noches</th>
                    <th className="py-2 px-4">Transacción</th>
                    <th className="py-2 px-4">Estado</th>
                    <th className="py-2 px-4">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map(({ roomId, userId, checkIn, checkOut, totalAmount, totalNights, transactionId, status }) => (
                    <tr key={transactionId} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4 border-r">{roomId.roomName}</td>
                        <td className="py-2 px-4 border-r">{formatDate(checkIn)}</td>
                        <td className="py-2 px-4">{formatDate(checkOut)}</td>
                        <td className="py-2 px-4">{userId ? userId.name : "Usuario eliminado"}</td>
                        <td className="py-2 px-4">{userId ? userId.username : "Usuario eliminado"}</td>
                        <td className="py-2 px-4">{roomId.rentPerDay}</td>
                        <td className="py-2 px-4">{totalAmount}</td>
                        <td className="py-2 px-4">{totalNights}</td>
                        <td className="py-2 px-4">{transactionId}</td>
                        <td className="py-2 px-4">{status}</td>
                        <td className="py-2 px-4">
                            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => cancelBooking(transactionId)}>Cancelar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);