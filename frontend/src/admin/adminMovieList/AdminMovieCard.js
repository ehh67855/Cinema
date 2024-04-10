import React from "react";
import "../../BrowseMovie/MovieCard/MovieCard.css";
import { Link } from "react-router-dom";
import StarRating from "../../BrowseMovie/StarRating/StarRating";

function AdminMovieCard({movie}) {
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
        <button className="btn btn-primary">Delete</button>
      </div>
    </div>
  );

}

export default AdminMovieCard;