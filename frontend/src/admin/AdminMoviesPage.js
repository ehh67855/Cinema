import React, { useState, useEffect } from "react";
import AdminMoviesContainer from "./adminMovieList/AdminMoviesContainer";
import { Link } from "react-router-dom";
import "./AdminMoviesPage.css"
import { fetchService } from "src/services/FetchService";

const AdminMoviesPage = () => {
    const[movies,setMovies] = useState([]);

    useEffect( () => {
        fetchService("get-all-movies", (data) => {
            setMovies(data);
        });
    }, []);

    // const fetchMovies = async () => {
    //     try {
    //         const response = await fetch('http://localhost:8080/get-all-movies');
    //         if(!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //         const data = await response.json();
    //         console.log(data);
    //         setMovies(data)
    //     } catch (error) {
    //         console.error("Failed to fetch movies: ", error);
    //     }
    // } 

    return (
        <div className="adminMoviesPageContainer">
            <Link to={"/addMovie"} className="btnToAddNewMovieForm"><button>Add a Movie</button></Link>
            <AdminMoviesContainer movies={movies}></AdminMoviesContainer>
        </div>
    );
}

export default AdminMoviesPage;