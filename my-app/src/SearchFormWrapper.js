import React from "react";
import { useOutletContext } from "react-router-dom";
import SearchForm from "./SearchForm";

export default function SearchFormWrapper() {
  const { searchQuery, setSearchQuery } = useOutletContext();

  return React.createElement(SearchForm, {
    initialQuery: searchQuery,
    onSearch: (value) => setSearchQuery(value)
  });
}
