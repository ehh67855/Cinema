import React from "react";
import { Link } from "react-router-dom";
import StarRating from "src/moviebrowse/StarRating/StarRating";

function AdminMovieCard({movie}) {
  
  const deleteMovieHandler = (id) => {

    try {
      fetch(`http://localhost:8080/delete-movie/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
          }
        )
        .then(response => {
          if (response.status === 200) {
              console.log("Movie deleted successfully.");
              alert("Movie deleted successfully.");
              location.reload();

          } else {
              alert("Something went wrong");
          }
      })
      .catch(error => {
          console.error("Error occurred during movie deletion:", error);
      })
    } catch (error) {
      console.error(error);
    }
  }

return (
    <div className="card" style={{ width: '18rem', marginBottom: '20px' }}> {/* Bootstrap card container */}
      <img src={movie.trailerPictureURL} className="card-img-top" alt={`Trailer for ${movie.title}`} />
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5> {/* Movie title */}
        <p className="card-text"><strong>Director:</strong> {movie.director}</p> {/* Director */}
        <p className="card-text">{movie.synopsis}</p> {/* Synopsis */}
        <StarRating numStars={movie.numStars}/> <br/> <hr/>
        <p className="card-text">Rating: {movie.rating}</p> {/* Synopsis */}
        <Link to={`/editMovie/${movie.id}`} className="btn btn-primary">Edit</Link>
        <button className="btn btn-primary" onClick={() => deleteMovieHandler(movie.id)}>Delete</button>
      </div>
    </div>
  );

}

export default AdminMovieCard;