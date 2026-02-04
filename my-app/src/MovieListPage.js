import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import GenreSelect from "./GenreSelect";
import SortControl from "./SortControl";
import MovieTile from "./MovieTile";
import MovieDetails from "./MovieDetails";
import Dialog from "./Dialog";
import MovieForm from "./MovieForm";

function MovieListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriterion, setSortCriterion] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [activeGenre, setActiveGenre] = useState("All");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editMovie, setEditMovie] = useState(null);
  const [deleteMovie, setDeleteMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const genres = ["All", "Action", "Comedy", "Drama", "Romance", "Sci-Fi"];

  // Fetch movies from API
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchMovies() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          filter: activeGenre === "All" ? "" : activeGenre.toLowerCase(),
          sortBy: sortCriterion,
          sortOrder: sortOrder,
        });

        if (searchQuery) {
          params.set("search", searchQuery);
          params.set("searchBy", "title");
        }

        const response = await fetch(
          "http://localhost:4000/movies?" + params.toString(),
          { signal }
        );
        if (!response.ok) throw new Error("Failed to fetch movies");

        const result = await response.json();
        const mappedMovies = (result.data || []).map((movie) => ({
          id: movie.id,
          title: movie.title,
          genres: movie.genres || [],
          rating: movie.vote_average,
          poster: movie.poster_path,
          overview: movie.overview,
          releaseDate: movie.release_date,
          duration: movie.duration || "",
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
  }, [activeGenre, sortCriterion, sortOrder, searchQuery]);

  return React.createElement(
    "div",
    { className: "movie-list-page" },

    // MovieDetails modal
    selectedMovie &&
      React.createElement(MovieDetails, {
        movie: {
          imageUrl: selectedMovie.poster,
          year: selectedMovie.releaseDate?.slice(0, 4),
          duration: selectedMovie.duration,
          description: selectedMovie.overview,
          title: selectedMovie.title,
          rating: selectedMovie.rating,
        },
        onClose: () => setSelectedMovie(null),
      }),

    // SearchForm
    !selectedMovie &&
      React.createElement(SearchForm, {
        initialQuery: searchQuery,
        onSearch: (query) => setSearchQuery(query),
      }),

    // Genre selector
    React.createElement(GenreSelect, {
      genres: genres,
      selectedGenre: activeGenre,
      onSelect: (genre) => setActiveGenre(genre),
    }),

    // Sort control
    React.createElement(SortControl, {
      value: sortCriterion,
      onChange: (criterion) => setSortCriterion(criterion),
    }),

    // Sort order toggle
    React.createElement(
      "button",
      {
        onClick: () => setSortOrder(sortOrder === "asc" ? "desc" : "asc"),
        style: { marginLeft: 8, padding: "4px 8px", cursor: "pointer" },
      },
      `Order: ${sortOrder.toUpperCase()}`
    ),

    // Loading / Error
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
              onClick: () => setSelectedMovie(movie),
              onEdit: () => setEditMovie(movie),
              onDelete: () => setDeleteMovie(movie),
            })
          )
        : null
    ),

    // Edit Movie Dialog
    editMovie &&
      React.createElement(
        Dialog,
        { title: "Edit Movie", onClose: () => setEditMovie(null) },
        React.createElement(
          "div",
          null,
          React.createElement(MovieForm, {
            key: editMovie.id,
            initialMovie: editMovie,
            onSubmit: (data) => {
              console.log("Edited movie submitted:", data);
              setEditMovie(null);
            },
          })
        )
      ),

    // Delete Movie Dialog
    deleteMovie &&
      React.createElement(
        Dialog,
        { title: "Delete Movie", onClose: () => setDeleteMovie(null) },
        React.createElement(
          "div",
          { style: { textAlign: "center" } },
          React.createElement("p", null, `Are you sure you want to delete "${deleteMovie.title}"?`),
          React.createElement(
            "div",
            { style: { marginTop: 16 } },
            React.createElement(
              "button",
              { onClick: () => setDeleteMovie(null) },
              "Cancel"
            ),
            React.createElement(
              "button",
              {
                onClick: () => {
                  console.log("Deleted", deleteMovie);
                  setDeleteMovie(null);
                },
                style: { marginLeft: 8 },
              },
              "Confirm"
            )
          )
        )
      )
  );
}

export default MovieListPage;
