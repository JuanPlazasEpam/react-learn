import React from "react";
import { Outlet } from "react-router-dom";
import SearchForm from "./SearchForm";

export default function SearchFormWrapper() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(SearchForm, {
      initialQuery: "", // optional default
      onSearch: function (value) {
        console.log("Search triggered:", value);
      }
    }),
    React.createElement(Outlet) // 👈 REQUIRED for /new
  );
}
