// This code is a React component that searches for movies using the OMDB API and displays them on the web page.

// Importing the necessary React components and styles.
import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import './App.css';

// Defining the API key for the OMDB API.
const API_URL = "https://www.omdbapi.com?apikey=449220bd";

// Defining the App component.
const App = () => {
    // Using state hooks to store the search term and the movies that are returned by the API.
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);

    // Using the useEffect hook to call the searchMovies function on component mount.
    useEffect(() => {
        searchMovies("Silicon Valley");
    }, []);

    // Defining the searchMovies function which searches for movies using the OMDB API.
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    };

    // Rendering the App component.
    return (
        <div className="app">
            <h1>React Movie Explorer</h1>

            {/* Rendering the search bar */}
            <div className="search">
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for movies"
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {/* Rendering the movie cards */}
            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
            ) : (
                // Rendering a message if no movies are found.
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}
        </div>
    );

};
// Exporting the App component.
export default App;