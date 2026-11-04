import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
function TopRated() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
  fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  )
    .then((response) => response.json())
    .then((data) => {
      setMovies(data.results);
    })
    .catch((error) => console.log(error));
}, []);
  return (
    <div className="top-rated">
      <h1>Top Rated Movies</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default TopRated;