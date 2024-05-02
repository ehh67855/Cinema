import { useState } from "react";
import "./PromotionForm.css"

const PromotionForm = ({setDiscount,promotionsEnabled}) => {

    const [promoCode,setPromoCode] = useState(0);

    const handlePromo = (e) => {
        e.preventDefault();
        if (!promotionsEnabled) {
            alert("Not enrolled in promotions");
            return;
        }

        fetch(`http://localhost:8080/get-promotion?promoCode=${promoCode}`,{
            method:"GET"
        }).then(response=> {
            if(response.status==200) {
                return response.json()
            } else if (response.status==400) {
                alert("Invalid promotion code");
                throw new Error();
            }
        }).then(data=>{
            setDiscount(data.discount);
            alert("Promotion applied")
        }).catch(error=>{
            console.log("error fetching poromotion code",error)
        });

    };

    return (
        <form id="promoForm">
            <label>Promotion Code:</label>
            <input 
                id="PromoInputField" 
                placeholder="Enter Promo Code"
                type="number"
                value={promoCode}
                onChange={(e)=>setPromoCode(e.target.value)}
                />
            <button 
                id="addPromoBtn"
                onClick={handlePromo}
            >Add Promo</button>
        </form>
    );
};

export default PromotionForm;