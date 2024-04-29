import { useEffect, useRef, useState } from "react";
import "./AdminEditTicketsPage.css";

export default function AdminEditPricingPage() {
    
    const [seniorTicketPrice, setSeniorTicketPrice] = useState();
    const [adultTicketPrice, setAdultTicketPrice] = useState();
    const [childTicketPrice, setChildTicketPrice] = useState();
    const [theaterSelection, setTheaterSelection] = useState(1);

    function handleUpdatePricing() {
        if (seniorTicketPrice > 0 && adultTicketPrice > 0 && childTicketPrice > 0) {
            fetch("http://localhost:8080/edit-theatre/" + theaterSelection, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                adultTicketPrice: adultTicketPrice,
                seniorTicketPrice: seniorTicketPrice,
                childTicketPrice: childTicketPrice
            })
            }).then(response => {
                if (response.status === 200) {
                    alert("Ticket Prices Successfully Updated!");
                    return response.json();
                } else {
                    alert("Something went wrong!");
                    return Promise.reject(new Error("404 Error"));
                }
            }).then(data => {
                console.log(data);
            }).catch(error => {
                console.error(error);
            });
        } else {
            alert("Ticket prices must be greater thatn $0!");
        }
        
    }


    return (
        <>
            <div id="editTicketsHeader">
                <h1>Edit Tickets</h1>
            </div>
            <form id="pricingInputForm">
                <div className="inputFields">
                    <label for="theaterSelector">Theater</label>
                    <select name="theaterSelector" id="theaterSelector" onChange={(e) => setTheaterSelection(e.target.value)}>
                        <option value="1" selected>Theater 1</option>
                        <option value="2">Theater 2</option>
                        <option value="3">Theater 3</option>
                        <option value="4">Theater 4</option>
                        <option value="5">Theater 5</option>
                    </select>
                    <label for="seniorTicketPrice">Senior Ticket Price: </label>
                    <input type="number" min="1" id="seniorTicketPrice" required onChange={(e) => setSeniorTicketPrice(e.target.value)}></input>
                    <label for="adultTicketPrice">Adult Ticket Price: </label>
                    <input type="number" min="1" id="adultTicketPrice" onChange={(e) => setAdultTicketPrice(e.target.value)} required></input>
                    <label for="childTicketPrice" required>Child Ticket price: </label>
                    <input type="number" min="1" id="childTicketPrice" required onChange={(e) => setChildTicketPrice(e.target.value)}></input>

                    <button id="submitButton" onClick={handleUpdatePricing}>Update Pricing</button> <br/>
                </div>
            </form>
        </>
    );
}