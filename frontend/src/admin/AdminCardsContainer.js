import React from "react";
import CardCard from "./AdminCardCard";


const CardsContainer = ({cards, id}) => {

    return (
        <>
        <div className="container">
            <div>
                {cards.map((card) => (
                <div key={card.id}>
                    <CardCard card={card} userId={id}/>
                </div>
                ))}
            </div>
        </div>
        </>
    );
}

export default CardsContainer;