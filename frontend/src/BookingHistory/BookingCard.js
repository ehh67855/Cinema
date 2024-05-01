import React, { useState } from "react";
import "./BookingCard.css";

function BookingCard({booking}) {

    return (
        <div className="bookingCard">
            <p>Booking Number: {booking.id}</p>
            <p>Movie Title: {booking.movieTitle}</p>
        </div>
    );
    
}
    
export default BookingCard;