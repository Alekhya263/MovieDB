import React from "react";
import { Link } from "react-router-dom";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img
  src={
    movie.poster_path
      ? `${IMAGE_URL}${movie.poster_path}`
      : "https://placehold.co/300x450?text=No+Poster"
  }
  alt={movie.title}
/>

        <h3>{movie.title}</h3>
        <p>Rating: {movie.vote_average?.toFixed(1)}</p>
      </Link>
    </div>
  );
}

export default MovieCard;