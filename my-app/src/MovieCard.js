import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function MovieCard({ movie }) {
  const location = useLocation();

  return React.createElement(
    "div",
    null,
    React.createElement("h3", null, movie.title),
    React.createElement(
      Link,
      {
        to: {
          pathname: "/" + movie.id + "/edit",
          search: location.search
        }
      },
      "Edit"
    )
  );
}
