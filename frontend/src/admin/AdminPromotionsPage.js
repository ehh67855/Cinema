import React, { useState } from "react";
import "./AdminPromotionsPage.css";

const AdminPromotionsPage = () => {
    const [enteredPromotionCode, setEnteredPromotionCode] = useState('');
    const [enteredDicountPercent, setEnteredDiscountPercent] = useState(0);

    const handleSubmit = async () => {
        await fetch("localhost:8080/add-promotion", {
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                promotionCode:enteredPromotionCode,
                promotionDiscount:enteredDicountPercent
            })
        }).then(response => {
            if(response.status === 200) {
                return response.json();
            }
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.log("Error adding promotion", error);
        })
    };

    return (
        <div>
            <form className="promotionsForm" onSubmit={submitHandler}>
                <label>Promotion Code</label>
                <input
                    id="promotionCode"
                    type="text"
                    value={enteredPromotionCode}
                    onChange={setEnteredPromotionCode}
                />
                <label>Discount %</label>
                <input
                    id="discountPercent"
                    type="number"
                    value={enteredDicountPercent}
                    onChange={setEnteredDiscountPercent}
                />
                <button className="handleSubmit" type="submit">Add Promotion</button>
            </form>
        </div>
    );
}

export default AdminPromotionsPage;