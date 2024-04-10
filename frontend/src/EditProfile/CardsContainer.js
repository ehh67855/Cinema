import React from "react";
import CardCard from "./CardCard";

const CardsContainer = ({cards}) => {

    return (
        <>
        <div className="container">
            <div>
                {cards.map((card) => (
                <div key={card.id}>
                    <CardCard card={card} />
                </div>
                ))}
            </div>
        </div>
        </>
    );
}

export default CardsContainer;