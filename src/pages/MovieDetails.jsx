import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.log(error));
    fetch(
  `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
)
  .then((response) => response.json())
  .then((data) => setCast(data.cast || []))
  .catch((error) => console.log(error));
  }, [id]);

  if (!movie) {
    return <h2>Loading movie details...</h2>;
  }

  return (
    <div className="movie-details">
      <img
        src={`${IMAGE_URL}${movie.poster_path}`}
        alt={movie.title}
      />

      <div>
        <h1>{movie.title}</h1>
        <p>Rating: {movie.vote_average?.toFixed(1)}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>{movie.overview}</p>
        <p>Runtime: {movie.runtime} minutes</p>
      </div>
            <div className="cast-section">
        <h2>Cast</h2>

        <div className="cast-list">
          {cast.slice(0, 10).map((actor) => (
            <div className="cast-card" key={actor.cast_id || actor.id}>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                />
              ) : (
                <p>No image</p>
              )}

              <h3>{actor.name}</h3>
              <p>as {actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;