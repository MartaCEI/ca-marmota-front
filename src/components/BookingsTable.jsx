import React from "react";
import { BookingsTableHeader } from "@/components/BookingsTableHeader";
import { BookingsTableBody } from "@/components/BookingsTableBody";

export const BookingsTable = ({ bookings, cancelBooking }) => {
    // Filtrar las reservas por estado
    const bookedBookings = bookings.filter(b => b.status === "booked");
    const cancelledBookings = bookings.filter(b => b.status === "cancelled");

    return (
        <>
            {/* Tabla para los bookings confirmados */}
            <p className="Table-title"><strong>Lista de Bookings Confirmados</strong></p>
            {bookedBookings.length > 0 ? (
                <div className="Table-wrapper">
                    <table className="Table">
                        <BookingsTableHeader />
                        <BookingsTableBody bookings={bookedBookings} cancelBooking={cancelBooking} />
                    </table>
                </div>
            ) : (
                <p className="Table-error">No hay bookings confirmados.</p>
            )}

            {/* Tabla para los bookings cancelados */}
            <p className="Table-title"><strong>Lista de Bookings Cancelados</strong></p>
            {cancelledBookings.length > 0 ? (
                <div className="Table-wrapper">
                    <table className="Table">
                        <BookingsTableHeader />
                        <BookingsTableBody bookings={cancelledBookings} cancelBooking={cancelBooking} />
                    </table>
                </div>
            ) : (
                <p className="Table-error">No hay bookings cancelados.</p>
            )}
        </>
    );
};
