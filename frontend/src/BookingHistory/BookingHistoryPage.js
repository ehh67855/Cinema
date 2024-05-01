import React, { useEffect, useState } from "react";
import BookingsContainer from "./BookingsContainer";
import { fetchService } from "src/services/FetchService";
import { getLogin, getAuthToken } from "src/services/BackendService";

const BookingHistoryPage = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const login = getLogin(getAuthToken());
        fetchService(`get-all-user-bookings/${login}`, (data) => {
            setBookings(data);
        });
    }, []);

    return (
        <div>
            <h2>Booking History</h2>
            <BookingsContainer bookings={bookings}/>
        </div>
    );
}

export default BookingHistoryPage;