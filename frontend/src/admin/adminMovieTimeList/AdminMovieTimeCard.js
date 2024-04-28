import React from "react";
import "./AdminMovieTimeCard.css";

function AdminMovieTimeCard({movieTime}) {
  
//   const deleteMovieHandler = (id) => {

//     try {
//       fetch(`http://localhost:8080/delete-movie/${id}`, {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" }
//           }
//         )
//         .then(response => {
//           if (response.status === 200) {
//               console.log("Movie deleted successfully.");
//               alert("Movie deleted successfully.");
//               location.reload();

//           } else {
//               alert("Something went wrong");
//           }
//       })
//       .catch(error => {
//           console.error("Error occurred during movie deletion:", error);
//       })
//     } catch (error) {
//       console.error(error);
//     }
//   }

return (
    <div className="movieTimeCard">
        <div>
            <p>Date: {movieTime.date}</p> <br/>
            <p>Time: {movieTime.time}</p> <br/>
            <p>Theater Number: {movieTime.theatre.id}</p> <br/>
        </div>
        <button className="movieTimeDeleteButton">Delete</button>
    </div>
  );

}

export default AdminMovieTimeCard;