import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [page]);

return (
  <>
    {loading ? (
      <h2 className="loading-message">Loading movies...</h2>
    ) : (
      <div className="home">
        <h1>Popular Movies</h1>

        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    )}
  </>
);
}

export default Home;