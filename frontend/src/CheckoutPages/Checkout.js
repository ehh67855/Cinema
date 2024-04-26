import React, { useEffect, useState } from "react";
import './Checkout.css';
import { useLocation } from "react-router-dom";
import { getLogin } from "src/services/BackendService";

/*
    Eventually, change the method to submit to use useEffect and store checkout info in a checkout variable (don't forget to create a submit handler)
*/

const Checkout = () => {
    const location = useLocation();

    let [totalSeniorTicketPrice, setTotalSeniorTicketPrice] = useState(0);
    let [totalAdultTicketPrice, setTotalAdultTicketPrice] = useState(0);
    let [totalChildTicketPrice, setTotalChildTicketPrice] = useState(0);
    let totalTicketPrice = totalSeniorTicketPrice + totalAdultTicketPrice + totalChildTicketPrice;
    let [promoDiscount, setPromoDiscount] = useState(0);
    let [bookingFees, setBookingFees] = useState();
    let [salesTax, setSalesTax] = useState();
    let [finalPrice, setFinalPrice] = useState(totalTicketPrice + bookingFees + (totalTicketPrice + (totalTicketPrice * salesTax)));
    const [bookedMovieTitle, setBookedMovieTitle] = useState("");
    const [movieTime, setMovieTime] = useState();
    const [movieDate, setMovieDate] = useState();
    const [creditCardNum, setCreditCardNum] = useState("");
    
    const promoHandler = () => {
        setPromoDiscount(document.getElementById('PromoInputField').value);
    };

    useEffect(() => {
        console.log("booking CTick: " + location.state.booking.bookingChildTickets +
                    "\nbooking ATick: " + location.state.booking.bookingAdultTickets +
                    "\nbooking STick: " + location.state.booking.bookingSeniorTickets +
                    "\nbooked movie time: " + location.state.booking.bookingMovieTime.toString() +
                    "\ntheatre name: " + location.state.theatre.name);

        setTotalSeniorTicketPrice(location.state.booking.bookingSeniorTickets * location.state.theatre.seniorTicketPrice);
        setTotalAdultTicketPrice(location.state.booking.bookingAdultTickets * location.state.theatre.adultTicketPrice);
        setTotalChildTicketPrice(location.state.booking.bookingChildTickets * location.state.theatre.childTicketPrice);

        setBookedMovieTitle(location.state.booking.bookingMovieTitle);
        setMovieTime(location.state.booking.bookingMovieTime);
        setMovieDate(location.state.booking.bookingMovieDate);

        setFinalPrice((totalTicketPrice - (totalTicketPrice * promoDiscount)) + bookingFees + (totalTicketPrice + (totalTicketPrice * salesTax)))

        // const List<CreditCard> creditCards = getLogin().creditCards;
    }, [promoDiscount])

    const order = {
        totalAdultTicketPrice,
        totalSeniorTicketPrice,
        totalChildTicketPrice,
        bookingFees,
        salesTax,
        finalPrice,
        promoDiscount,
    }

    const submitHandler = (event) => {
        event.preventDefault();

        /*
            if the user hasn't filled out all the required fields, make sure they are notified that they should (couldn't you just add the required attribute to all the required input fields?)
        */

        /*
            booking gets created and put into database first so that created tickets can have a booking to refer to in their table
        */

        // const totalTicketNum = location.state.booking.bookingSeniorTickets + location.state.booking.bookingAdultTickets + location.state.booking.bookingChildTickets;

        // try {
        //     fetch("", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json"},
        //         body: JSON.stringify({
        //             numOfTickets: totalTicketNum,
        //             movieTitle: bookedMovieTitle,
        //             creditCardNum: ,
        //             bookingDate: movieDate,
        //             bookingTime: movieTime
        //         })
        //     }).then(response => {
        //         if(response.status === 200) {
        //             return response.json();
        //         } else {
        //             alert("Something went wrong");
        //         }
        //     }).then(data => {
        //         if(data) {
        //             console.log("Booking added successfully: ", data);
        //             alert("Booking added successfully.");
        //         }
        //     }).catch(error => {
        //         console.error("Error occurred during movie addition: ", error);
        //     })
        // } catch (error) {
        //     console.error(error);
        // }

        // totalTicketNum = 0;
        // setBookedMovieTitle("");
        // setCreditCardNum("");
        // setMovieDate("");
        // setMovieTime("");

        /*
            three for loops for each ticket type creating and entering tickets into database;
            seatCount var that increments by 1 for each ticket created and gives each ticket a seat from the seatSelection array
        */

        /*
            finally, order gets created and put into database
        */

        /*
            use emailService to send confirmation email to user upon confirming checkout
        */
    };

    return (
        <div id="checkoutPage">
            <div id="checkoutHdrContainer">
                <h1 id="checkoutHdr">Checkout</h1>
            </div>
            <div className="checkoutArea">
                <form id="formSection">
                    <div className="shippingSection">
                        <h2 className="checkoutAreaHdrs">Shipping Address</h2>
                        <label>Address:</label><input value="Saved Address"/>
                    </div>
                    <div className="paymentSection">
                        <h2 className="checkoutAreaHdrs">Payment</h2>
                        <label>Card:</label>
                        <select>
                            <option value=""></option>
                            <option value="option1">option1</option>
                            <option value="option2">option2</option>
                        </select>
                        <label>Promotion Code:</label>
                        <input id="PromoInputField" placeholder="Enter Promo Code"/>
                        <button id="addPromoBtn" type="button" onClick={promoHandler}>Add Promo</button>
                    </div>
                </form>
                <div className="orderSummary">
                    <h2 className="checkoutAreaHdrs" id="orderSumHdr">Order Summary</h2>
                    <p>Senior Tickets: ${totalSeniorTicketPrice}</p>
                    <p>Adult Tickets: ${totalAdultTicketPrice}</p>
                    <p>Child Tickets: ${totalChildTicketPrice}</p>
                    <p>Promo Discount: {promoDiscount}%</p>
                    <p>Booking fees: ${bookingFees}</p>
                    <p>Sales tax: {salesTax}%</p>
                    <p id="orderSumFinalPara">Total: ${finalPrice}</p>
                </div>
            </div>
            <div className="confirmCancelBtn">
                <input type="submit" form="formSection" value="Confirm"></input>
                <input type="button" value="Cancel"></input>
            </div>
        </div>
    )
}

export default Checkout;