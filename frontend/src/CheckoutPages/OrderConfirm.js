import React from "react";
import './OrderConfirm.css';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const OrderConfirm = () => {
    const location = useLocation();
    const orderInfo = location.state.orderInfo;

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
                    <h5>{orderInfo.bookingId}</h5>
                </div>
            </div>
            <div id="orderDetailsContainer">
                <div id="orderDetails">
                    <h2 id="orderDetailsHdr">Order Details</h2>
                    <p>Senior Tickets: $ {orderInfo.seniorTicketCost}</p>
                    <p>Adult Tickets: $ {orderInfo.adultTicketCost}</p>
                    <p>Chlid Tickets: $ {orderInfo.childTicketCost}</p>
                    <p>Promo Discount: % {orderInfo.discount}</p>
                    <p>Booking fees: {orderInfo.bookingFee}</p>
                    <p>Tax: % 7</p>
                    <p id="orderDetailsFinalPara">Total: $ {orderInfo.finalPrice}</p>
                </div>
            </div>
            <Link to={"/"}>
                <button>Return to Home Page</button>
            </Link>
        </div>
    )
}

export default OrderConfirm;