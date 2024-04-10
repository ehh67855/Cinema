import { useState } from "react";
import CardsContainer from "./CardsContainer";

function AddCardForm({creditCards}) {

    const [cardTypeInput,setCardTypeInput] = useState();
    const [cardNumberInput,setCardNumberInput] = useState();
    const [cardExpiryInput, setCardExpiryInput] = useState();
    const [billingAddrInput, setBillingAddrInput] = useState();

    const addCard = () => {

    };

    return (
        <div>
            <h1>Add Card Information</h1>
            {(typeof creditCards !== 'undefined' && creditCards.length >= 0)
            && <CardsContainer cards={creditCards}></CardsContainer>}
            <form>
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
                    onChange={(e) => setCardNumber(e.target.value)}
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
                <a className="btn btn-primary" onClick={addCard()}>Add card</a>
            </form>
        </div>
    );
}
export default AddCardForm;