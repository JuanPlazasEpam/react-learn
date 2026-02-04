import MovieListPage from "./MovieListPage";

import React, { useState } from "react";
import Counter from "./Counter";
import SearchForm from "./SearchForm";
import GenreSelect from "./GenreSelect";
import "./index.css";

function App() {
  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <div className="app">
      <h3><b>NETFLIX ROULETTE</b></h3>
      <MovieListPage />

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
