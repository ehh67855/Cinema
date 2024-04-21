import { useState } from "react";
import CardsContainer from "../EditProfile/CardsContainer";
import { getAuthToken, getLogin } from "src/services/BackendService";


function AddCardForm({creditCards}) {

    const [cardTypeInput,setCardTypeInput] = useState();
    const [cardNumberInput,setCardNumberInput] = useState();
    const [cardExpiryInput, setCardExpiryInput] = useState();
    const [billingAddrInput, setBillingAddrInput] = useState();

    const addCard = (e) => {
      e.preventDefault();
        try {
          fetch("http://localhost:8080/add-card", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                login: getLogin(getAuthToken()), 
                cardNumber:cardNumberInput,
                cardType:cardTypeInput,
                cardExpiry:cardExpiryInput,
                billingAddr:billingAddrInput
              })
            })
            .then(response => {
              if (response.status === 200) {
                  return response.json();
              } else if (response.status === 401) { 
                alert("You can only have a maximum of three cards");
              } else {
                  alert("Something went wrong");
              }
          }).then(data => {
              if (data) {
                  console.log("Profile updated successfully:", data);
                  alert("Credit Card Successfully Added")
              }
          })
          .catch(error => {
              console.error("Error occurred during profile update:", error);
          })
      } catch (error) {
        console.error(error);
      }
    }

    return (
        <div>
            <h1>Card Information</h1>
            {(typeof creditCards !== 'undefined' && creditCards.length >= 0)
            && <CardsContainer cards={creditCards}></CardsContainer>}
            <form onSubmit={addCard}>
                <label htmlFor="cardType">Card Type</label>
                <input
                    type="text"
                    id="cardType"
                    onChange={(e) => setCardTypeInput(e.target.value)}
                    required
                />
                <br></br>
                <label htmlFor="cardNumber">Card Number</label>
                <input
                    type="number"
                    inputMode='numeric'
                    id="cardNumber"
                    onChange={(e) => setCardNumberInput(e.target.value)}
                    required
                />
                <br></br>
                <label htmlFor="cardExpiry">Expiration Date</label>
                <input
                    type="month"
                    id="cardExpiry"
                    placeholder="MM/YY"
                    onChange={(e) => setCardExpiryInput(e.target.value)}
                    required
                />
                <br></br>      
                <label htmlFor="billingAddr">Billing Address</label>
                <input
                    type="text"
                    id="billingAddr"
                    onChange={(e) => setBillingAddrInput(e.target.value)}
                    required
                />
                <br></br>
                <button 
                    className="btn btn-primary"
                    type="submit">
                    Add Card
                </button>            
            </form>
        </div>
    );
}
export default AddCardForm;