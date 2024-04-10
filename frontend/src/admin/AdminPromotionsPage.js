import React, { useState } from "react";
import "./AdminPromotionsPage.css";

const AdminPromotionsPage = () => {
    const [enteredPromotionCode, setEnteredPromotionCode] = useState('');
    const [enteredDicountPercent, setEnteredDiscountPercent] = useState(0);

    const promotionCodeChangeHandler = (event) => {
        setEnteredPromotionCode(event.target.value);
    }

    const dicountPercentChangeHandler = (event) => {
        setEnteredDiscountPercent(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredPromotion = {
            promotionCode: enteredPromotionCode,
            discountPercent: enteredDicountPercent
        }

        setEnteredPromotionCode('');
        setEnteredDiscountPercent(0);
    }

    return (
        <div>
            <form className="promotionsForm" onSubmit={submitHandler}>
                <label>Promotion Code</label>
                <input
                    id="promotionCode"
                    type="text"
                    value={enteredPromotionCode}
                    onChange={promotionCodeChangeHandler}
                />
                <label>Discount</label>
                <input
                    id="discountPercent"
                    type="number"
                    value={enteredDicountPercent}
                    onChange={dicountPercentChangeHandler}
                />
                <button className="promotionsFormSubmitBtn" type="submit">Add Promotion</button>
            </form>
        </div>
    );
}

export default AdminPromotionsPage;