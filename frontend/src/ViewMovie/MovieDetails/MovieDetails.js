import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MovieDetails.css';
import MovieTrailer from '../MovieTrailer/MovieTrailer';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const fetchMovie = async () => {
    try {
      const response = await fetch(`http://localhost:8080/get-movie/?id=${id}`);
      if (response.ok) {
        const movieData = await response.json();
        setMovie(movieData);
      } else {
        console.error('Error fetching movie: HTTP status ', response.status);
      }
    } catch (err) {
      console.error('Error fetching movie:', err);
    }
  }

  useEffect(() => {
    fetchMovie();
  }, [id]); // Ensure useEffect reruns when ID changes

  return movie ? (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <MovieTrailer 
        trailerVideoURL={movie.trailerVideoURL} 
        trailerPictureURL={movie.trailerPictureURL}
        title={movie.title}
      ></MovieTrailer>
      <p><strong>Category:</strong> {movie.category}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Synopsis:</strong> {movie.synopsis}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <p><strong>Coming Soon:</strong> {movie.comingSoon ? 'Yes' : 'No'}</p>
      <div className="reviews">
      <h3>Reviews</h3>
      {movie.reviews.length > 0 ? (
        movie.reviews.map((review, index) => (
          <div key={index} className="review">
            <p><strong>{review.author}</strong></p>
            <p>Rating: {review.rating} stars</p>
            <p>{review.reviewContent}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
      <div className="showings">
        <h3>Show Dates and Times</h3>
        <p3>(UTC)</p3>
        {movie.showings.map((showing, index) => (
          <div key={index} className="showing-button">
            <Link to={`/bookTickets/${showing.id}`} state={ movie.title }>
              Book for {new Date(showing.date).toLocaleDateString()} at {showing.time} PM 
            </Link>
          </div>
        ))}
      </div>
    </div>
  ) : (
      <div>Movie not found.</div>

  );
}

export default MovieDetails;
