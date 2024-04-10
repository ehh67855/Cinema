import React from "react";
import './OrderConfirm.css';

const OrderConfirm = () => {
    return (
        <div id="orderConfirmPage">
            <div id="orderConfirmHdrContainer">
                <div id="orderConfirmHdr">
                    <h1 id="orderPartHdr">Order</h1>
                    <h1 id="confirmPartHdr">Confirmation</h1>
                </div>
            </div>
            <div id="thankYouMsgContainer">
                <div id="thankYouMsg">
                    <h2>Thank You</h2>
                    <h5>A receipt has been sent to your email.</h5>
                    <h5>Your booking number is:</h5>
                    <h5>A123</h5>
                </div>
            </div>
            <div id="orderDetailsContainer">
                <div id="orderDetails">
                    <h2 id="orderDetailsHdr">Order Details</h2>
                    <p>Senior Tickets: $ </p>
                    <p>Adult Tickets: $ </p>
                    <p>Chlid Tickets: $ </p>
                    <p>Promo Discount: % </p>
                    <p>Booking fees: </p>
                    <p>Tax: % </p>
                    <p id="orderDetailsFinalPara">Total: $ </p>
                </div>
            </div>
            <button>Return to Home Page</button>
        </div>
    )
}

export default OrderConfirm;