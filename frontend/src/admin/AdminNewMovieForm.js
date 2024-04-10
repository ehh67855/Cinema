import React, { useState } from "react";
import "./AdminNewMovieForm.css"

const AdminNewMovieForm = () => {
    const [enteredMovieTitle, setEnteredMovieTitle] = useState('');
    const [enteredCategory, setEnteredCategory] = useState('');
    const [enteredCast, setEnteredCast] = useState('');
    const [enteredDirector, setEnteredDirector] = useState('');
    const [enteredProducer, setEnteredProducer] = useState('');
    const [enteredSynopsis, setEnteredSynopsis] = useState('');
    const [enteredTrailerPictureURL, setEnteredTrailerPictureURL] = useState('');
    const [enteredTrailerVideoURL, setEnteredTrailerVideoURL] = useState('');
    const [enteredRating, setEnteredRating] = useState('');
    const [enteredDatetime, setEnteredDatetime] = useState('');

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

    const trailerPictureURLChangeHandler = (event) => {
        setEnteredTrailerPictureURL(event.target.value);
    }

    const trailerVideoURLChangeHandler = (event) => {
        setEnteredTrailerVideoURL(event.target.value);
    }

    const ratingChangeHandler = (event) => {
        setEnteredRating(event.target.value);
    }

    const datetimeChangeHandler = (event) => {
        setEnteredDatetime(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        
        const enteredMovie = {
            title: enteredMovieTitle,
            category: enteredCategory,
            cast: enteredCast,
            director: enteredDirector,
            producer: enteredProducer,
            synopsis: enteredSynopsis,
            trailerPictureURL: enteredTrailerPictureURL,
            trailerVideoURL: enteredTrailerVideoURL,
            rating: enteredRating,
            datetime: enteredDatetime
        }

        setEnteredMovieTitle('');
        setEnteredCategory('');
        setEnteredCast('');
        setEnteredDirector('');
        setEnteredProducer('');
        setEnteredSynopsis('');
        setEnteredTrailerPictureURL('');
        setEnteredTrailerVideoURL('');
        setEnteredRating('');
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
            <label>Add a Show Date and Time</label>
            <input
            id="showDateAndTime"
            type="datetime-local"
            value={enteredDatetime}
            onChange={datetimeChangeHandler}
            />
            <button className="newMovieFormSubmitBtn" type="submit">Add Movie</button>
        </form>
    );
}

export default AdminNewMovieForm;