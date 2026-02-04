import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieDetails from "./MovieDetails";

export default function MovieDetailsWrapper() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchMovie() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`http://localhost:4000/movies/${movieId}`, { signal });
        if (!res.ok) throw new Error("Failed to fetch movie");

        const data = await res.json();

        setMovie({
          id: data.id,
          title: data.title,
          genres: data.genres || [],
          rating: data.vote_average,
          poster: data.poster_path,
          overview: data.overview,
          releaseDate: data.release_date
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
    return () => controller.abort();
  }, [movieId]);

  if (loading) {
    return React.createElement("p", null, "Loading...");
  }

  if (error) {
    return React.createElement("p", { className: "error" }, error);
  }

  if (!movie) {
    return React.createElement("p", null, "Movie not found");
  }

  return React.createElement(
    "div",
    { className: "movie-details-page" },

    React.createElement(
      "button",
      {
        onClick: () => navigate(-1),
        style: { marginBottom: 12, cursor: "pointer" }
      },
      "← Back"
    ),

    React.createElement(MovieDetails, { movie: movie })
  );
}
