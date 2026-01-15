import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "./MovieDetails";

export default function MovieDetailsWrapper() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchMovie() {
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
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
    return () => controller.abort();
  }, [movieId]);

  if (loading) return React.createElement("p", null, "Loading...");
  if (!movie) return React.createElement("p", null, "Movie not found");

  return React.createElement(MovieDetails, { movie });
}
