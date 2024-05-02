import React, { useState } from 'react';
import "./EditPromotionsForm.css"

const EditPromotionsForm = ({ promotions }) => {

    const [editedPromotions, setEditedPromotions] = useState(promotions);

    const handleInputChange = (index, field, value) => {
        const newPromotions = [...editedPromotions];
        newPromotions[index][field] = value;
        setEditedPromotions(newPromotions);
    };

    const updatePromotionHandler = (id, promoCode, discount) => {

        if (discount < 0 || discount > 100) {
            alert("You may only enter a discount % between 0 and 100");
            return null;
        }


        fetch("http://localhost:8080/update-promotion", {
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                id:id,
                promotionCode:promoCode,
                promotionDiscount:discount
            })
        }).then(response => {
            if(response.status === 200) {
                return response.json();
            } else if (response.status == 409) {
                alert("promotion code in use.");
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
        <div id='editPromoDiv'>
            <h2>Edit Promotions</h2>
            <table>
                <thead>
                    <tr>
                        <th className='tableHeadField'>ID</th>
                        <th className='tableHeadField'>Discount Code</th>
                        <th className='tableHeadField'>Discount %</th>
                    </tr>
                </thead>
                <tbody>
                    {editedPromotions.map((promotion, index) => (
                        <tr key={index}>
                            <td>{promotion.id}</td>
                            <td>
                                <input 
                                    value={promotion.promoCode} 
                                    onChange={(e) => handleInputChange(index, 'promoCode', e.target.value)}
                                    type="number"
                                />
                            </td>
                            <td>
                                <input 
                                    value={promotion.discount}
                                    onChange={(e) => handleInputChange(index, 'discount', e.target.value)}
                                    type="number"
                                />
                            </td>
                            <td>
                                <button onClick={() => updatePromotionHandler(promotion.id, promotion.promoCode, promotion.discount)}>
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EditPromotionsForm;
