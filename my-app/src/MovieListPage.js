import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Outlet } from "react-router-dom";

import MovieTile from "./MovieTile";

export default function MovieListPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL-synced filters
  const searchQuery = searchParams.get("query") || "";
  const activeGenre = searchParams.get("genre") || "All";
  const sortCriterion = searchParams.get("sort") || "title";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const genres = ["All", "Action", "Comedy", "Drama", "Romance", "Sci-Fi"];

  // Fetch movies from backend when filters change
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchMovies() {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          search: searchQuery,
          genre: activeGenre === "All" ? "" : activeGenre,
          sort: sortCriterion
        });

        const res = await fetch(`http://localhost:4000/movies?${params.toString()}`, { signal });
        if (!res.ok) throw new Error("Failed to fetch movies");

        const result = await res.json();

        const mappedMovies = (result.data || []).map((movie) => ({
          id: movie.id,
          title: movie.title,
          genres: movie.genres || [],
          rating: movie.vote_average,
          poster: movie.poster_path,
          overview: movie.overview,
          releaseDate: movie.release_date
        }));

        setMovies(mappedMovies);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();

    return () => controller.abort();
  }, [searchQuery, activeGenre, sortCriterion]);

  // Navigate to movie details while preserving search params
  function handleMovieClick(movieId) {
    const queryString = searchParams.toString();
    navigate(`/${movieId}${queryString ? "?" + queryString : ""}`);
  }

  return React.createElement(
    "div",
    { className: "movie-list-page" },
    // Nested route outlet: renders SearchForm or MovieDetails depending on URL
    React.createElement(Outlet),

    // Error/loading messages
    loading && React.createElement("p", null, "Loading movies..."),
    error && React.createElement("p", { className: "error" }, error),

    // Movie list
    React.createElement(
      "div",
      { className: "movie-list" },
      Array.isArray(movies)
        ? movies.map((movie) =>
            React.createElement(MovieTile, {
              key: movie.id,
              movie: movie,
              onClick: () => handleMovieClick(movie.id)
            })
          )
        : null
    )
  );
}
