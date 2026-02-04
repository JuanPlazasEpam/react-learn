import React from "react";
import SearchForm from "./SearchForm";

export default function SearchFormWrapper() {
  // In the new setup, search is handled via props in MovieListPage
  // So this wrapper can just log or do nothing
  return React.createElement(SearchForm, {
    initialQuery: "", // default empty
    onSearch: (value) => console.log("Search triggered:", value),
  });
}
