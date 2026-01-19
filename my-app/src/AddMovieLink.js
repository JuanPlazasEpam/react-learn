import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function AddMovieLink() {
  const location = useLocation();

  return React.createElement(
    Link,
    {
      to: {
        pathname: "/new",
        search: location.search
      }
    },
    "+ Add Movie"
  );
}
