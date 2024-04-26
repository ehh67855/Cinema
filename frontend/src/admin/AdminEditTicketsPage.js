import { useEffect, useRef } from "react";
import "./AdminEditTicketsPage.css";

export default function AdminEditPricingPage() {
    
    let seniorTicketPrice = useRef();
    let adultTicketPrice = useRef();
    let childTicketPrice = useRef();
    let bookingFees = useRef();
    let theaterSelection = useRef();

    useEffect(() => {

    })

    return (
        <>
            <div id="editTicketsHeader">
                <h1>Edit Tickets</h1>
            </div>
            <form id="pricingInputForm">
                <div className="inputFields">
                    <label for="theaterSelector">Theater</label>
                    <select name="theaterSelector" id="theaterSelector" ref={theaterSelection}>
                        <option value="1">Theater 1</option>
                        <option value="2">Theater 2</option>
                        <option value="3">Theater 3</option>
                        <option value="4">Theater 4</option>
                        <option value="5">Theater 5</option>
                    </select>
                    <label for="seniorTicketPrice">Senior Ticket Price: </label>
                    <input type="number" min="0" id="seniorTicketPrice" ref={seniorTicketPrice}></input>
                    <label for="adultTicketPrice">Adult Ticket Price: </label>
                    <input type="number" min="0" id="adultTicketPrice" ref={adultTicketPrice}></input>
                    <label for="childTicketPrice">Child Ticket price: </label>
                    <input type="number" min="0" id="childTicketPrice" ref={childTicketPrice}></input>
                    <label for="bookingFees">Booking Fees: </label>
                    <input type="number" min="0" id="bookingFees" ref={bookingFees}></input> <br/>
                    <button id="submitButton">Update Pricing</button> <br/>
                </div>
            </form>
        </>
    );
}