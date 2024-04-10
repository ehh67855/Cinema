import React from "react";

function Reviews({ reviews }) {
  return (
    <div className="review">
      <p><strong>{review.author}:</strong> {review.content}</p>
    </div>
  );
}

export default Reviews;