import React, { useState } from "react";
import "./AdminPromotionsPage.css";

const AdminPromotionsPage = () => {
    const [enteredPromotionCode, setEnteredPromotionCode] = useState(0);
    const [enteredDicountPercent, setEnteredDiscountPercent] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (enteredDicountPercent < 0 || enteredDicountPercent > 100) {
            alert("You may only enter a discount % between 0 and 100");
            return null;
        }

        await fetch("http://localhost:8080/add-promotion", {
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
            alert("Promotion added")
            console.log(data);
        }).catch(error => {
            console.log("Error adding promotion", error);
        })
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Promotion Code</label>
                <input
                    id="promotionCode"
                    type="number"
                    value={enteredPromotionCode}
                    onChange={e => setEnteredPromotionCode(e.target.value)}
                    required
                /> <br></br>
                <label>Discount %</label>
                <input
                    id="discountPercent"
                    type="number"
                    value={enteredDicountPercent}
                    onChange={e => setEnteredDiscountPercent(e.target.value)}
                    required
                /> <br></br>
                <button className="handleSubmit" type="submit">Add Promotion</button>
            </form>
        </div>
    );
}

export default AdminPromotionsPage;