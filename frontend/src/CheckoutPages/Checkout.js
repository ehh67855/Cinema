import React, { useEffect, useState } from "react";
import './Checkout.css';
import { useLocation } from "react-router-dom";
import { getLogin, getAuthToken } from "src/services/BackendService";

/*
    Eventually, change the method to submit to use useEffect and store checkout info in a checkout variable (don't forget to create a submit handler)
*/

const Checkout = () => {
    //if there is an error, try removing the curly brackets around booking (this is just a comment for me - Neil)
    const {booking} = useLocation();

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
    const [creditCards, setCreditCards] = useState([]);
    
    useEffect(() => {
        setFinalPrice((totalTicketPrice - (totalTicketPrice * promoDiscount)) + bookingFees + (totalTicketPrice + (totalTicketPrice * salesTax)))
        console.log("booking CTick: " + location.state.booking.bookingChildTickets +
                    "\nbooking ATick: " + location.state.booking.bookingAdultTickets +
                    "\nbooking STick: " + location.state.booking.bookingSeniorTickets +
                    "\nbooked movie time: " + location.state.booking.bookingMovieTime.toString() +
                    "\ntheatre name: " + location.state.theatre.name);
        console.log(location);

        setTotalSeniorTicketPrice(location.state.booking.bookingSeniorTickets * location.state.theatre.seniorTicketPrice);
        setTotalAdultTicketPrice(location.state.booking.bookingAdultTickets * location.state.theatre.adultTicketPrice);
        setTotalChildTicketPrice(location.state.booking.bookingChildTickets * location.state.theatre.childTicketPrice);

        setBookedMovieTitle(location.state.booking.bookingMovieTitle);
        setMovieTime(location.state.booking.bookingMovieTime);
        setMovieDate(location.state.booking.bookingMovieDate);

        setFinalPrice((totalTicketPrice - (totalTicketPrice * promoDiscount)) + bookingFees + (totalTicketPrice + (totalTicketPrice * salesTax)))

        const login = getLogin(getAuthToken());
        fetch(`http://localhost:8080/get-user/${login}`, {
            method: "GET",
        }).then(response => {
            if(response.status == 200) {
                return response.json();
            }
            if(!response.ok) {
                throw new Error('API call failed (in checkout)');
            }
        }).then(data => {
            setCreditCards(data.creditCards);
        }).catch(error => {
            console.error("Error occurred during user getting (in checkout): ", error);
        });

        

        // for (let i = 0; i < creditCards.length; i++) {
        //     const option = document.createElement('option');
        //     //finish this by taking the substring of the cardNumber of the current card
        //     option.textContent = "Credit card ending in " + creditCards[i].cardNumber.substring(creditCards.length - 4, creditCards.length);
        //     option.value = i;
        //     document.getElementById('cardSelect').appendChild(option);
        // }
    }, [promoDiscount])

    let checkout = {
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

        const totalTicketNum = location.state.booking.bookingSeniorTickets + location.state.booking.bookingAdultTickets + location.state.booking.bookingChildTickets;
        // thing here for setting creditCardId to one that user has selected (use the value of the option tag that the user selected)
        //const creditCardId = creditCards[].id;
        //in the brackets below, use the value of the option tag the user selected
        //setCreditCardNum(creditCards[].cardNumber);

        console.log(creditCards[0].cardNumber);

        try {
            fetch("", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    numOfTickets: totalTicketNum,
                    movieTitle: bookedMovieTitle,
                    creditCardId: creditCardId,
                    creditCardNum: creditCardNum,
                    bookingDate: movieDate,
                    bookingTime: movieTime
                })
            }).then(response => {
                if(response.status === 200) {
                    return response.json();
                } else {
                    alert("Something went wrong");
                }
            }).then(data => {
                if(data) {
                    console.log("Booking added successfully: ", data);
                    alert("Booking added successfully.");
                }
            }).catch(error => {
                console.error("Error occurred during movie addition: ", error);
            })
        } catch (error) {
            console.error(error);
        }

        totalTicketNum = 0;
        setBookedMovieTitle("");
        setCreditCardNum("");
        setMovieDate("");
        setMovieTime("");

        /*
            three for loops for each ticket type creating and entering tickets into database;
            seatCount var that increments by 1 for each ticket created and gives each ticket a seat from the seatSelection array
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
                        <select id="cardSelect">
                            <option value=""></option>
                            <option value="option1">option1</option>
                            <option value="option2">option2</option>
                        </select>
                        <label>Promotion Code:</label>
                        <input id="PromoInputField" placeholder="Enter Promo Code"/>
                        <button id="addPromoBtn">Add Promo</button>
                    </div>
                </form>
                <div className="orderSummary">
                    <h2 className="checkoutAreaHdrs" id="orderSumHdr">Order Summary</h2>
                    <p>Senior Tickets: $ {totalSeniorTicketPrice}</p>
                    <p>Adult Tickets: $ {totalAdultTicketPrice}</p>
                    <p>Child Tickets: $ {totalChildTicketPrice}</p>
                    <p>Promo Discount: % {promoDiscount}</p>
                    <p>Booking fees: $ {bookingFees}</p>
                    <p>Sales tax: % {salesTax}</p>
                    <p id="orderSumFinalPara">Total: $ {finalPrice}</p>
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