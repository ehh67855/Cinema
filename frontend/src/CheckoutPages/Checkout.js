import React, { useEffect, useState } from "react";
import './Checkout.css';
import { useLocation } from "react-router-dom";

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
    
    useEffect(() => {
        setFinalPrice((totalTicketPrice - (totalTicketPrice * promoDiscount)) + bookingFees + (totalTicketPrice + (totalTicketPrice * salesTax)))
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