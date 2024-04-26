import "./AdminEditTicketsPage.css";
export default function AdminEditPricingPage() {

    return (
        <>
            <div id="editTicketsHeader">
                <h1>Edit Tickets</h1>
            </div>
            <form id="pricingInputForm">
                <div className="inputFields">
                    <label>Senior Ticket Price: </label>
                    <input type="number" min="0" id="seniorTicketPrice"></input>
                    <label>Adult Ticket Price: </label>
                    <input type="number" min="0" id="adultTicketPrice"></input>
                    <label>Child Ticket price: </label>
                    <input type="number" min="0" id="childTicketPrice"></input>
                    <label>Booking Fees: </label>
                    <input type="number" min="0" id="bookingFees"></input>
                </div>
            </form>
        </>
    );
}