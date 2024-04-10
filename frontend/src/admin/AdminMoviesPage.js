import React, { useState, useEffect } from "react";
import AdminNewMovieForm from "./AdminNewMovieForm";
import AdminMoviesContainer from "./adminMovieList/AdminMoviesContainer";

const AdminMoviesPage = () => {
    const[movies,setMovies] = useState([]);

    useEffect( () => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/movies/get-all-movies');
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setMovies(data)
        } catch (error) {
            console.error("Failed to fetch movies: ", error);
        }
    } 

    return (
        <div>
            <AdminNewMovieForm />
            <AdminMoviesContainer movies={movies}></AdminMoviesContainer>
        </div>
    );
}

export default AdminMoviesPage;