import React from "react";
import "./MovieCard.css";
import { Link } from "react-router-dom";
import StarRating from "../StarRating/StarRating";
import MovieTrailer from "../../ViewMovie/MovieTrailer/MovieTrailer";
import { isAuthenticated } from "src/services/BackendService";



function MovieCard({movie}) {

  const canBook = () => {
      if(isAuthenticated()) {
        return <Link to={`/movie/${movie.id}`} className="btn btn-primary">Book</Link>
      }
  }

  return (
      <div class = "card" className="card" style={{ width: '18rem', marginBottom: '20px' }}> 
        <MovieTrailer 
          trailerVideoURL={movie.trailerVideoURL} 
          trailerPictureURL={movie.trailerPictureURL}
          title={movie.title}
        ></MovieTrailer>
        <div className="card-body">
          <h5 className="card-title">{movie.title}</h5>
          <p className="card-text"><strong>Director:</strong> {movie.director}</p> 
          <p className="card-text">{movie.synopsis}</p> 
          <StarRating numStars={movie.numStars}/> <br/> <hr/>
          <p className="card-text">Rating: {movie.rating}</p> 
          {canBook()}
        </div>
      </div>
  );
}



export default MovieCard;