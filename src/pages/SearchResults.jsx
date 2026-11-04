import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function SearchResults() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (!query) return;

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results || []);
      })
      .catch((error) => console.log(error));
  }, [query]);

  return (
    <div className="search-results">
      <h1>Search Results for: {query}</h1>

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {movies.length === 0 && <p>No movies found.</p>}
    </div>
  );
}

export default SearchResults;