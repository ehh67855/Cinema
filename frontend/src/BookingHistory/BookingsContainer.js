import React from "react";
import BookingCard from "./BookingCard";

function BookingsContainer({bookings}) {

    return (
        <>
        <div className="container">
            <div className="row">
                {bookings.map((booking) => (
                <div className="col-md-4" key={booking.id}>
                    <BookingCard booking={booking} />
                </div>
                ))}
            </div>
        </div>
        </>
    );
}

export default BookingsContainer;