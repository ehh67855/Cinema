import { useEffect, useRef } from "react";
import "./AdminEditTicketsPage.css";

export default function AdminEditPricingPage() {
    
    let seniorTicketPrice = useRef();
    let adultTicketPrice = useRef();
    let childTicketPrice = useRef();
    let bookingFees = useRef();

    useEffect(() => {
        
    })

    return (
        <>
            <div id="editTicketsHeader">
                <h1>Edit Tickets</h1>
            </div>
            <form id="pricingInputForm">
                <div className="inputFields">
                    <label>Senior Ticket Price: </label>
                    <input type="number" min="0" id="seniorTicketPrice" ref={seniorTicketPrice}></input>
                    <label>Adult Ticket Price: </label>
                    <input type="number" min="0" id="adultTicketPrice" ref={adultTicketPrice}></input>
                    <label>Child Ticket price: </label>
                    <input type="number" min="0" id="childTicketPrice" ref={childTicketPrice}></input>
                    <label>Booking Fees: </label>
                    <input type="number" min="0" id="bookingFees" ref={bookingFees}></input> <br/>
                    <button id="submitButton">Update Pricing</button> <br/>
                </div>
            </form>
        </>
    );
}