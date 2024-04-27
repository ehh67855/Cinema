import { useEffect, useRef } from "react";
import "./AdminEditTicketsPage.css";

export default function AdminEditPricingPage() {
    
    let seniorTicketPrice = useRef();
    let adultTicketPrice = useRef();
    let childTicketPrice = useRef();
    let bookingFees = useRef();
    let theaterSelection = useRef(1);

    useEffect(() => {
        fetch("http://localhost:8080/get-theatre/" + theaterSelection.current.value, {
            method: "GET",
        }).then(response => {
            if (response.status === 200) {
                console.log("OK");
                return response.json();
            } else if (response.status === 404) {
                return Promise.reject(new Error("404 Error"));
            }
        }).then(data => {
            seniorTicketPrice.current = data.seniorTicketPrice;
            adultTicketPrice.current = data.adultTicketPrice;
            childTicketPrice.current = data.childTicketPrice;
        }).catch(error => {
            console.error(error);
        });
    })

    function handleUpdatePricing(e) {
        e.preventDefault();
        fetch("http://localhost:8080/get-theatre/" + theaterSelection.current.value, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: theaterSelection.current.value,
                adultTicketPrice: adultTicketPrice.current.value,
                seniorTicketPrice: seniorTicketPrice.current.value,
                childTicketPrice: childTicketPrice.current.value
            })
        }).then(response => {
            if (response.status === 200) {
                console.log("OK");
                return response.json();
            } else if (response.status === 404) {
                return Promise.reject(new Error("404 Error"));
            }
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <>
            <div id="editTicketsHeader">
                <h1>Edit Tickets</h1>
            </div>
            <form id="pricingInputForm">
                <div className="inputFields">
                    <label for="theaterSelector">Theater</label>
                    <select name="theaterSelector" id="theaterSelector" ref={theaterSelection} onChange={(e) => theaterSelection.current = e.target.value}>
                        <option value="1" selected>Theater 1</option>
                        <option value="2">Theater 2</option>
                        <option value="3">Theater 3</option>
                        <option value="4">Theater 4</option>
                        <option value="5">Theater 5</option>
                    </select>
                    <label for="seniorTicketPrice">Senior Ticket Price: </label>
                    <input type="number" min="0" id="seniorTicketPrice" ref={seniorTicketPrice} onChange={(e) => seniorTicketPrice.current = e.target.value}></input>
                    <label for="adultTicketPrice">Adult Ticket Price: </label>
                    <input type="number" min="0" id="adultTicketPrice" ref={adultTicketPrice} onChange={(e) => adultTicketPrice.current = e.target.value}></input>
                    <label for="childTicketPrice">Child Ticket price: </label>
                    <input type="number" min="0" id="childTicketPrice" ref={childTicketPrice} onChange={(e) => childTicketPrice.current = e.target.value}></input>
                    <label for="bookingFees">Booking Fees: </label>
                    <input type="number" min="0" id="bookingFees" ref={bookingFees}></input> <br/>
                    <button id="submitButton" onClick={handleUpdatePricing}>Update Pricing</button> <br/>
                </div>
            </form>
        </>
    );
}