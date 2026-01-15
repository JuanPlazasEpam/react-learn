import React from "react";
import SearchForm from "./SearchForm";

export default function SearchFormWrapper() {
  return React.createElement(SearchForm, {
    initialQuery: "", // optional default
    onSearch: (value) => console.log("Search triggered:", value)
  });
}
