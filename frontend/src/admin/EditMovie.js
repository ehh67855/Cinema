import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./EditMovie.css";
import { fetchService } from "src/services/FetchService";
import AdminMovieTimesContainer from "./adminMovieTimeList/AdminMovieTimesContainer";

const EditMovie = () => {
    const { id } = useParams();

    const [enteredMovieTitle, setEnteredMovieTitle] = useState('');
    const [enteredCategory, setEnteredCategory] = useState('');
    const [enteredCast, setEnteredCast] = useState('');
    const [comingSoon, setComingSoon] = useState(false);
    const [enteredDirector, setEnteredDirector] = useState('');
    const [enteredProducer, setEnteredProducer] = useState('');
    const [enteredSynopsis, setEnteredSynopsis] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredTrailerPictureURL, setEnteredTrailerPictureURL] = useState('');
    const [enteredTrailerVideoURL, setEnteredTrailerVideoURL] = useState('');
    const [enteredRating, setEnteredRating] = useState('');
    const [enteredNumStars, setEnteredNumStars] = useState(1);
    const [enteredDatetime, setEnteredDatetime] = useState('');
    const [enteredNumTheatre, setEnteredNumTheatre] = useState(1);
    const [movieTimes, setMovieTimes] = useState([]);
    const [enteredReview, setEnteredReview] = useState('');
    const [enteredReviewNumStars, setEnteredReviewNumStars] = useState(1);
    const [enteredReviewAuthor, setEnteredReviewAuthor] = useState('');

    const [currentDate, setCurrentDate] = useState(new Date());
    currentDate.setTime(Date.now() - (4 * 60 * 60 * 1000)); //(4 * 60 * 60 * 1000) milliseconds removed to account for our timezone
    useEffect(() => {
        const timer = setInterval(() => { // Creates an interval which will update the current data every 3 seconds
            const newCurrentDate = new Date();
            newCurrentDate.setTime(Date.now() - (4 * 60 * 60 * 1000));
            setCurrentDate(newCurrentDate);
        }, 3 * 1000);
        return () => {
            clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
        }
    }, []);

      useEffect(() => {
        fetchService(`get-movie/?id=${id}`, (data) => {
          setEnteredMovieTitle(data.title);
          setEnteredCategory(data.category);
          setEnteredCast(data.cast);
          setEnteredDirector(data.director);
          setEnteredProducer(data.producer);
          setEnteredSynopsis(data.synopsis);
          setEnteredDescription(data.description);
          setEnteredTrailerPictureURL(data.trailerPictureURL);
          setEnteredTrailerVideoURL(data.trailerVideoURL);
          setEnteredRating(data.rating);
          setEnteredNumStars(data.numStars);
          setComingSoon(data.comingSoon);
          setMovieTimes(data.showings);
        });
    }, []);

    const movieTitleChangeHandler = (event) => {
        setEnteredMovieTitle(event.target.value);
    }

    const categoryChangeHandler = (event) => {
        setEnteredCategory(event.target.value);
    }

    const castChangeHandler = (event) => {
        setEnteredCast(event.target.value);
    }

    const directorChangeHandler = (event) => {
        setEnteredDirector(event.target.value);
    }

    const producerChangeHandler = (event) => {
        setEnteredProducer(event.target.value);
    }

    const synopsisChangeHandler = (event) => {
        setEnteredSynopsis(event.target.value);
    }

    const descriptionChangeHandler = (event) => {
        setEnteredDescription(event.target.value);
    }

    const trailerPictureURLChangeHandler = (event) => {
        setEnteredTrailerPictureURL(event.target.value);
    }

    const trailerVideoURLChangeHandler = (event) => {
        setEnteredTrailerVideoURL(event.target.value);
    }

    const ratingChangeHandler = (event) => {
        setEnteredRating(event.target.value);
    }

    const numStarsChangeHandler = (event) => {
        setEnteredNumStars(event.target.value);
    }

    const comingSoonChangeHandler = (event) => {
        setComingSoon(event.target.checked);
    }

    const datetimeChangeHandler = (event) => {
        setEnteredDatetime(event.target.value);
    }

    const numTheatreChangeHandler = (event) => {
        setEnteredNumTheatre(event.target.value);
    }

    const reviewChangeHandler = (event) => {
        setEnteredReview(event.target.value);
    }

    const reviewNumStarsChangeHandler = (event) => {
        setEnteredReviewNumStars(event.target.value);
    }

    const reviewAuthorChangeHandler = (event) => {
        setEnteredReviewAuthor(event.target.value);
    }

    const movieFormSubmitHandler = (event) => {
        event.preventDefault();

        if (!enteredMovieTitle || !enteredCategory || !enteredCast || !enteredDirector || !enteredProducer || 
            !enteredSynopsis || !enteredDescription || !enteredTrailerPictureURL || !enteredTrailerVideoURL || 
            !enteredRating || !enteredNumStars) {
            alert("Please fill out all movie fields.");
            return;
        }
        
        try {
            fetch(`http://localhost:8080/edit-movie/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                  title: enteredMovieTitle,
                  numStars: enteredNumStars,
                  category: enteredCategory,
                  cast: enteredCast,
                  director: enteredDirector,
                  producer: enteredProducer,
                  synopsis: enteredSynopsis,
                  description: enteredDescription,
                  trailerPictureURL: enteredTrailerPictureURL,
                  trailerVideoURL: enteredTrailerVideoURL,
                  rating: enteredRating,
                  comingSoon: comingSoon
                })
              })
              .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert("Something went wrong");
                }
            }).then(data => {
                if (data) {
                    console.log("Movie edited successfully:", data);
                    alert("Movie edited successfully.");
                }
            })
            .catch(error => {
                console.error("Error occurred during movie edit:", error);
            })
        } catch (error) {
          console.error(error);
        }
    };

    const movieTimeFormSubmitHandler = (event) => {
        event.preventDefault();

        if (!enteredDatetime || !enteredNumTheatre) {
            alert("Please fill out all showing fields.");
            return;
        }
        
        try {
            fetch(`http://localhost:8080/add-movie-time/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    date: enteredDatetime.split("T")[0],
                    time: enteredDatetime.split("T")[1],
                    numTheatre: enteredNumTheatre
                })
              })
              .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert("Something went wrong");
                }
            }).then(data => {
                if (data) {
                    console.log("Movie time added successfully:", data);
                    alert("Movie showing added successfully.");
                }
            })
            .catch(error => {
                console.error("Error occurred during movie time addition:", error);
            })
        } catch (error) {
          console.error(error);
        }

        setEnteredDatetime('');
        setEnteredNumTheatre(1);
    };

    const reviewFormSubmitHandler = (event) => {
        event.preventDefault();

        if (!enteredReview || !enteredReviewNumStars || !enteredReviewAuthor) {
            alert("Please fill out all review fields.");
            return;
        }
        
        try {
            fetch(`http://localhost:8080/add-movie-review/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    review: enteredReview,
                    reviewNumStars: enteredReviewNumStars,
                    reviewAuthor: enteredReviewAuthor
                })
              })
              .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert("Something went wrong");
                }
            }).then(data => {
                if (data) {
                    console.log("Movie review added successfully:", data);
                    alert("Movie review added successfully.");
                }
            })
            .catch(error => {
                console.error("Error occurred during movie review addition:", error);
            })
        } catch (error) {
          console.error(error);
        }

        setEnteredReview('');
        setEnteredReviewNumStars(1);
        setEnteredReviewAuthor('');
    };

    return (
        <div>
        <form className="editMovieForm" onSubmit={movieFormSubmitHandler}>
            <label>Movie Title</label>
            <input
            id="movieTitle"
            type="text"
            value={enteredMovieTitle}
            onChange={movieTitleChangeHandler}
            />
            <label>Category</label>
            <input
            id="category"
            type="text"
            value={enteredCategory}
            onChange={categoryChangeHandler}
            />
            <label>Cast</label>
            <input
            id="cast"
            type="text"
            value={enteredCast}
            onChange={castChangeHandler}
            />
            <label>Director</label>
            <input
            id="director"
            type="text"
            value={enteredDirector}
            onChange={directorChangeHandler}
            />
            <label>Producer</label>
            <input
            id="producer"
            type="text"
            value={enteredProducer}
            onChange={producerChangeHandler}
            />
            <label>Synopsis</label>
            <input
            id="synopsis"
            type="text"
            value={enteredSynopsis}
            onChange={synopsisChangeHandler}
            />
            <label>Description</label>
            <input
            id="description"
            type="text"
            value={enteredDescription}
            onChange={descriptionChangeHandler}
            />
            <label>Trailer Picture URL</label>
            <input
            id="trailerPictureURL"
            type="text"
            value={enteredTrailerPictureURL}
            onChange={trailerPictureURLChangeHandler}
            />
            <label>Trailer Video URL</label>
            <input
            id="trailerVideoURL"
            type="text"
            value={enteredTrailerVideoURL}
            onChange={trailerVideoURLChangeHandler}
            />
            <label>Rating</label>
            <input
            id="rating"
            type="text"
            value={enteredRating}
            onChange={ratingChangeHandler}
            />
            <label>Number of Stars</label>
            <input
            id="num_stars"
            type="number"
            max={5}
            min={1}
            value={enteredNumStars}
            onChange={numStarsChangeHandler}
            />
            <div className="comingSoonInput">
            <label>Coming Soon</label>
            <input
              type="checkbox"
              id="comingSoon"
              checked={comingSoon}
              onChange={comingSoonChangeHandler}
            />
            </div>
            <div className="editMovieFormBtnsContainer">
                <button className="editMovieFormSubmitBtn" type="submit">Confirm</button>
                <Link to={"/manageMovies"} className="editMovieFormCancelBtn"><button className="editMovieFormCancelBtn">Cancel</button></Link>
            </div>
        </form>
        <form className="addNewReviewForm" onSubmit={reviewFormSubmitHandler}>
        <label>Write a Review</label>
            <input
            id="review"
            type="text"
            value={enteredReview}
            onChange={reviewChangeHandler}
            />
            <label>Number of Stars for Review</label>
            <input
            id="num_review_stars"
            type="number"
            max={5}
            min={1}
            value={enteredReviewNumStars}
            onChange={reviewNumStarsChangeHandler}
            />
            <label>Review Author</label>
            <input
            id="reviewAuthor"
            type="text"
            value={enteredReviewAuthor}
            onChange={reviewAuthorChangeHandler}
            />
            <button type="submit">Add Review</button>
        </form>
        <form className="addNewMovieTimeForm" onSubmit={movieTimeFormSubmitHandler}>
            <label>Add a Show Date and Time</label>
            <input
            id="showDateAndTime"
            type="datetime-local"
            min={currentDate.toISOString().substring(0, 16)}
            required
            value={enteredDatetime}
            onChange={datetimeChangeHandler}
            />
            <label>Theater Number</label>
            <input
            id="num_theatre"
            type="number"
            max={5}
            min={1}
            required
            value={enteredNumTheatre}
            onChange={numTheatreChangeHandler}
            />
            <button type="submit">Add Showing</button>
        </form>
        <h5 className="movieTimeListHeader">Showings</h5>
        <AdminMovieTimesContainer movieTimes={movieTimes}/>
        </div>
    );
}

export default EditMovie;