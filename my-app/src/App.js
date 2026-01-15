import React, { useState } from "react";
import Counter from "./Counter";
import SearchForm from "./SearchForm";
import GenreSelect from "./GenreSelect";
import "./index.css";

import "./index.css";

function SearchForm({ initialQuery, onSearch }) {
  const [query, setQuery] = useState(initialQuery);

  const triggerSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      triggerSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
      />
      <button onClick={triggerSearch}>Search</button>
    </div>
  );
}

function GenreSelect({ genres, selectedGenre, onSelect }) {
  return (
    <div className="genres">
      {genres.map((genre) => (
        <button
          key={genre}
          className={
            "genre-button" +
            (genre === selectedGenre ? " active" : "")
          }
          onClick={() => onSelect(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

function App() {
  const [selectedGenre, setSelectedGenre] = useState("Action");

  return (
    <div className="app">
      <h3><b>NETFLIX ROULETTE</b></h3>

      <section>
        <h2>Counter</h2>
        <Counter initialValue={5} />
      </section>

      <section>
        <h2 className="find-movie">FIND YOUR MOVIE</h2>
        <SearchForm
          initialQuery="Star Wars"
          onSearch={(value) =>
            console.log("Search triggered:", value)
          }
        />
      </section>

      <section>
        <GenreSelect
          genres={["Action", "Comedy", "Drama", "Sci-Fi"]}
          selectedGenre={selectedGenre}
          onSelect={setSelectedGenre}
        />
      </section>
    </div>
  );
}

export default App;
