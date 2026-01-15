import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import GenreSelect from "./GenreSelect";
import SortControl from "./SortControl";
import MovieTile from "./MovieTile";
import MovieDetails from "./MovieDetails";

function MovieListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriterion, setSortCriterion] = useState("title");
  const [activeGenre, setActiveGenre] = useState("All");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const genres = ["All", "Action", "Comedy", "Drama", "Romance", "Sci-Fi"];

  useEffect(function () {
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

        const response = await fetch(
          "http://localhost:4000/movies?" + params.toString(),
          { signal }
        );

        if (!response.ok) throw new Error("Failed to fetch movies");

        const result = await response.json();

        // Map backend fields to props expected by MovieTile
        const mappedMovies = (result.data || []).map(function (movie) {
          return {
            id: movie.id,
            title: movie.title,
            genres: movie.genres || [],
            rating: movie.vote_average,
            poster: movie.poster_path, // image URL
            overview: movie.overview,
            releaseDate: movie.release_date
          };
        });

        setMovies(mappedMovies);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();

    // Abort previous request if parameters change quickly
    return function cleanup() {
      controller.abort();
    };
  }, [searchQuery, sortCriterion, activeGenre]);

  return React.createElement(
    "div",
    { className: "movie-list-page" },

    // Either SearchForm or MovieDetails
    selectedMovie
      ? React.createElement(MovieDetails, {
          movie: selectedMovie,
          onClose: function () {
            setSelectedMovie(null);
          }
        })
      : React.createElement(SearchForm, {
          initialQuery: searchQuery,
          onSubmit: function (query) {
            setSearchQuery(query);
          }
        }),

    // Genre selector
    React.createElement(GenreSelect, {
      genres: genres,
      activeGenre: activeGenre,
      onSelect: function (genre) {
        setActiveGenre(genre);
      }
    }),

    // Sort control
    React.createElement(SortControl, {
      sortBy: sortCriterion,
      onChange: function (criterion) {
        setSortCriterion(criterion);
      }
    }),

    // Loading / Error messages
    loading && React.createElement("p", null, "Loading movies..."),
    error && React.createElement("p", { className: "error" }, error),

    // Movie list
    React.createElement(
      "div",
      { className: "movie-list" },
      Array.isArray(movies)
        ? movies.map(function (movie) {
            return React.createElement(MovieTile, {
              key: movie.id,
              movie: movie,
              onClick: function () {
                setSelectedMovie(movie);
              }
            });
          })
        : null
    )
  );
}

export default MovieListPage;
