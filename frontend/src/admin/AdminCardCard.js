import React from "react";
import "../EditProfile/CardCard.css"

const CardCard = ({card, userId}) => {

    const deleteCard = () => {
      try {
          fetch(`http://localhost:8080/delete-card/${card.id}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                login: userId
              })
            })
            .then(response => {
              if (response.status === 200) {
                  return response.json();
              } else {
                  alert("Something went wrong");
                  return null; 
              }
          }).then(data => {
              if (data) {
                  console.log("Card deleted successfully:", data);
                  window.location.reload();
              }
          })
          .catch(error => {
              console.error("Error occurred during profile update:", error);
          })
      } catch (error) {
        console.error(error);
      }
    };

    return (
        <div className="cardCard">
            Card Type: {card.cardType} <br/>
            Card Number: {card.cardNumber} <br/>
            Card Expiration Date: {card.expirationDate} <br/>
            Card Billing Address: {card.billingAdress} <br/>
            <button onClick={deleteCard}>Delete</button> 
        </div>
    );
}

export default CardCard;