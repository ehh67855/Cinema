import React from "react";
import Star from "./Star";

function StarRating({numStars}) {
    return (
        <>
            {Array.from({ length: numStars }, (_, index) => (
                <Star key={index} />
            ))}
        </>
    )
}

export default StarRating;