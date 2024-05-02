import React, { useEffect, useState } from "react";
import "./AdminPromotionsPage.css";
import EditPromotionsForm from "./EditPromotionsForm";
import BookingFeeForm from "./BookingFeeForm";

const AdminPromotionsPage = () => {
    const [enteredPromotionCode, setEnteredPromotionCode] = useState(0);
    const [enteredDicountPercent, setEnteredDiscountPercent] = useState(0);
    const [promotions,setPromotions] = useState();

    useEffect(()=>{
        fetch('http://localhost:8080/get-all-promotions', {
            method:"GET"
        }).then(response => {
            if(response.status == 200) {
                return response.json();
            }
            throw Error("An error occured");
        }).then(data => {
            setPromotions(data)
        }).catch(error => {
            console.log(error);
            alert("something went wrong");
        })
    },[]);

    useEffect(() => {
        console.log(promotions);
    },[promotions])

    const handleSubmit = async (e) => {
        
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
            } else if (response.status == 409) {
                alert("promotion code already exists");
                throw new Error();
            }
        }).then(data => {
            alert("Promotion added")
            console.log(data);
        }).catch(error => {
            console.log("Error adding promotion", error);
        })
    };



    return (
        <div id="adminPromoPgDiv">
            <BookingFeeForm></BookingFeeForm>
            <h2>Create new promotion</h2>
            <form id="adminPromoPgForm" onSubmit={handleSubmit}>
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
            {promotions && <EditPromotionsForm promotions={promotions}></EditPromotionsForm>}
        </div>
    );
}

export default AdminPromotionsPage;