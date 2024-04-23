import React, { useEffect, useState } from "react";
import "./AdminNewMovieForm.css"

const AdminNewMovieForm = () => {
    const [enteredMovieTitle, setEnteredMovieTitle] = useState('');
    const [enteredCategory, setEnteredCategory] = useState('');
    const [enteredCast, setEnteredCast] = useState('');
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

    const datetimeChangeHandler = (event) => {
        setEnteredDatetime(event.target.value);
        //console.log(enteredDatetime.split("T")[0]);
    }

    const numTheatreChangeHandler = (event) => {
        setEnteredNumTheatre(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!enteredMovieTitle || !enteredCategory || !enteredCast || !enteredDirector || !enteredProducer || 
            !enteredSynopsis || !enteredDescription || !enteredTrailerPictureURL || !enteredTrailerVideoURL || 
            !enteredRating || !enteredNumStars || !enteredDatetime || !enteredNumTheatre) {
            alert("Please fill out all fields.");
            return;
        }
        
        try {
            fetch("http://localhost:8080/add-movie", {
                method: "POST",
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
                    console.log("Movie added successfully:", data);
                }
            })
            .catch(error => {
                console.error("Error occurred during movie addition:", error);
            })
        } catch (error) {
          console.error(error);
        }

        setEnteredMovieTitle('');
        setEnteredCategory('');
        setEnteredCast('');
        setEnteredDirector('');
        setEnteredProducer('');
        setEnteredSynopsis('');
        setEnteredDescription('');
        setEnteredTrailerPictureURL('');
        setEnteredTrailerVideoURL('');
        setEnteredRating('');
        setEnteredNumStars(1);
        setEnteredDatetime('');
    };

    return (
        <form className="newMovieForm" onSubmit={submitHandler}>
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
            <label>Add a Show Date and Time</label>
            <input
            id="showDateAndTime"
            type="datetime-local"
            min={currentDate.toISOString().substring(0, 16)}
            value={enteredDatetime}
            onChange={datetimeChangeHandler}
            />
            <label>Theater Number</label>
            <input
            id="num_theatre"
            type="number"
            max={5}
            min={1}
            value={enteredNumTheatre}
            onChange={numTheatreChangeHandler}
            />
            <button className="newMovieFormSubmitBtn" type="submit">Add Movie</button>
        </form>
    );
}

export default AdminNewMovieForm;