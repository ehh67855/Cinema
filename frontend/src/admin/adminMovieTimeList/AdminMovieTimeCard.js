import React from "react";
import "./AdminMovieTimeCard.css";

function AdminMovieTimeCard({movieTime}) {
  
  const deleteMovieTimeHandler = (id) => {

    try {
      fetch(`http://localhost:8080/delete-movie-time/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
          }
        )
        .then(response => {
          if (response.status === 200) {
              console.log("Movie Time deleted successfully.");
              alert("Movie Time deleted successfully.");
              location.reload();

          } else {
              alert("Something went wrong");
          }
      })
      .catch(error => {
          console.error("Error occurred during movie time deletion:", error);
      })
    } catch (error) {
      console.error(error);
    }
  }

return (
    <div className="movieTimeCard">
        <div>
            <p>Date: {movieTime.date}</p> <br/>
            <p>Time: {movieTime.time}</p> <br/>
            <p>Theater Number: {movieTime.theatre.id}</p> <br/>
        </div>
        <button className="movieTimeDeleteButton" type="button" onClick={() => deleteMovieTimeHandler(movieTime.id)}>Delete</button>
    </div>
  );

}

export default AdminMovieTimeCard;