import React, { useEffect, useState } from "react";
import "./BookingFeeForm.css"

const BookingFeeForm = () => {

    const [bookingFee,setBookingFee] = useState(0);

    useEffect(()=>{
        fetch("http://localhost:8080/get-booking-fee",{
            method:"GET"
        }).then(response => {
            if(response.status == 200) {
                return response.json();
            }
            throw new Error("error fetching booking fee");
        }).then(data=> {
            setBookingFee(data);
        }).catch(error => {
            console.log(error);
        })
    },[]);

    const handleBookingFeeSubmit = (e) => {
        e.preventDefault();
        if (bookingFee < 0) {
            alert("Please enter a fee of at least 0");
            return null;
        }

        fetch(`http://localhost:8080/update-booking-fee?bookingFee=${bookingFee}`, {
            method:"POST",
            headers: {"Content-Type":"application/json"}
        }).then(response => {
            if(response.status === 200) {
                return response.json();
            }
            throw new Error();
        }).then(data => {
            alert("Booking fee updates")
            console.log(data);
        }).catch(error => {
            console.log("Error updating booking fee", error);
        })
    };


     return (
        <div id="bkingFeeDiv">
            <h2>Set booking fee</h2>
            <form id="bkingFeeForm" onSubmit={handleBookingFeeSubmit}>
                <label>Booking Fee ($)</label>
                <input
                    id="promotionCode"
                    type="number"
                    value={bookingFee}
                    onChange={e => setBookingFee(e.target.value)}
                    required
                /> <br></br>
                <button className="handleSubmit" type="submit">Update Fee</button>
            </form>
        </div>

     );
};
export default BookingFeeForm;