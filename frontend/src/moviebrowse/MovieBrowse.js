import { useEffect, useState } from "react";

import { getAuthToken } from "../services/BackendService";
import MoviesContainer from "./MoviesContainer/MoviesContainer";
import SearchBar from "./SearchBar/SearchBar";
import { useNavigate } from 'react-router-dom';


function MovieBrowse(isAuthenticated) {
    const [movies,setMovies] = useState([]);
    const [searchTitleInput, setSearchTitleInput] = useState('');
    const [searchCategoryInput, setSearchCategoryInput] = useState('');
    const [searchShowingInput, setSearchShowingInput] = useState(null);
    const [loading,setLoading]  = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/get-all-movies", {
            method: "GET",
        }).then(response => {
            if (response.status == 200) {
                return response.json();
            }
            if (!response.ok) {
                throw new Error('API call failed');
            }
        }).then(data => {
            setMovies(data);
            setLoading(false);
        }).catch(error => {
            // Handle other errors
            });
    }, []);
    

    const handleSearchTitleInput = (titleValue) => {
        setSearchTitleInput(titleValue);
    };

    const handleSearchCategoryInput = (categoryValue) => {
        setSearchCategoryInput(categoryValue);
    };

    const handleSearchShowingInput = (showingValue) => {
        setSearchShowingInput(showingValue);
    };

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase()
            .includes(searchTitleInput.toLowerCase())
        &&
        movie.category.toLowerCase()
            .includes(searchCategoryInput.toLowerCase())
        &&
        (searchShowingInput === null 
            || searchShowingInput === '' 
            || movie.showings.some(showing => showing.date === searchShowingInput)
        )   

    );

    const renderMovies = () => {
        if (loading) {
            return <h1>Loading movies...</h1>
        } else {
            return <div>
                <h2> Currently Running</h2> <hr/>
                <MoviesContainer movies={filteredMovies.filter(movie => !movie.comingSoon)}></MoviesContainer>
                <h2>Coming Soon</h2> <hr/>
                <MoviesContainer movies={filteredMovies.filter(movie => movie.comingSoon)}></MoviesContainer>
            </div>;
        }

    };

    return (

        <div class = "container">
            <h1>Find movies</h1>
            <hr/>
            <div class = "searchContainer">
                <SearchBar onSearch = {handleSearchTitleInput} placeholder = "Enter Movie Title"></SearchBar>
                <SearchBar onSearch = {handleSearchCategoryInput} placeholder = "Enter Category"></SearchBar>
                <SearchBar onSearch = {handleSearchShowingInput} type = "Date"></SearchBar>
            </div>
            {renderMovies()}
            
        </div>

    );
}

export default MovieBrowse;