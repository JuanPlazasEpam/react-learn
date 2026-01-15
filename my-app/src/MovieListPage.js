import React, { useState } from "react";

import SearchForm from "./SearchForm";
import MovieDetails from "./MovieDetails";
import GenreSelect from "./GenreSelect";
import SortControl from "./SortControl";
import MovieTile from "./MovieTile";

function MovieListPage() {
  // state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriterion, setSortCriterion] = useState("title");
  const [activeGenre, setActiveGenre] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState(null);

  // mock movie list
  const [movies] = useState([
    {
      id: 1,
      title: "Inception",
      genre: "Sci-Fi",
      year: 2010,
      rating: 8.8
    },
    {
      id: 2,
      title: "The Dark Knight",
      genre: "Action",
      year: 2008,
      rating: 9.0
    },
    {
      id: 3,
      title: "Interstellar",
      genre: "Sci-Fi",
      year: 2014,
      rating: 8.6
    }
  ]);

  const genres = ["All", "Action", "Sci-Fi", "Drama"];

  // derived movie list (search + genre + sort)
  const visibleMovies = movies
    .filter(function (movie) {
      const matchesSearch =
        movie.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGenre =
        activeGenre === "All" || movie.genre === activeGenre;

      return matchesSearch && matchesGenre;
    })
    .slice()
    .sort(function (a, b) {
      if (sortCriterion === "year") {
        return b.year - a.year;
      }
      if (sortCriterion === "rating") {
        return b.rating - a.rating;
      }
      return a.title.localeCompare(b.title);
    });

  return React.createElement(
    "div",
    { className: "movie-list-page" },

    // Either SearchForm OR MovieDetails
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

    // Movie list
    React.createElement(
      "div",
      { className: "movie-list" },
      visibleMovies.map(function (movie) {
        return React.createElement(MovieTile, {
          key: movie.id,
          movie: movie,
          onClick: function () {
            setSelectedMovie(movie);
          }
        });
      })
    )
  );
}

export default MovieListPage;
