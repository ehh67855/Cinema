import React from "react";
import './TicketOrder.css';

/*
    Eventually, change the method to submit to use useEffect and update ticket amounts in a booking variable (don't forget to create a submit handler)
*/

const TicketOrder = () => {
    return (
        <div id="ticketOrderPage">
            <div id="orderSummaryHdrContainer">
                <h1 id="orderSummaryHdr">Order Summary</h1>
            </div>
            <div id="ticketAmntHdrContainer">
                <h2 id="ticketAmntHdr">Ticket Amounts</h2>
            </div>
            <div id="formContainer">
                <form id="ticketAmountForm">
                    <label>Child ($10):</label><input type="number"/>
                    <label>Adult ($10):</label><input type="number"/>
                    <label>Senior ($10):</label><input type="number"/>
                    <label>Total:</label><input disabled/>
                </form>
            </div>
            <div id="orderCostContainer">
                <div className="orderCost">
                    <h2 id="orderCostHdr">Costs</h2>
                    <p>Senior Tickets: $ </p>
                    <p>Adult Tickets: $ </p>
                    <p>Chlid Tickets: $ </p>
                    <p id="orderCostFinalPara">Total: $ </p>
                </div>
            </div>
            <div className="proceedCancelBtn">
                <input type="submit" form="ticketAmountForm" value="Proceed to checkout"></input>
                <input type="button" value="Cancel"></input>
            </div>
        </div>
    )
}

export default TicketOrder;