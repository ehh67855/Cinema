import React from "react";
import "./CardCard.css"

const CardCard = ({card}) => {
    return (
        <div className="cardCard">
            {/* attributes of a card go here:*/}
            Card Type: {card.cardType} <br/>
            Card Number: {card.cardNumber} <br/>
            Card Expiration Date: {card.expirationDate} <br/>
            Card Billing Address: {card.billingAdress} <br/>
            {/* Delete button needs implementation */}
            <button>Delete</button> 
        </div>
    );
}

export default CardCard;