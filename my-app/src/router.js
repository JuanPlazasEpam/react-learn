import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovieListPage from "./MovieListPage";
import SearchFormWrapper from "./SearchFormWrapper";
import MovieDetailsWrapper from "./MovieDetailsWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(MovieListPage),
    children: [
      { path: "/", element: React.createElement(SearchFormWrapper) },
      { path: "/:movieId", element: React.createElement(MovieDetailsWrapper) }
    ]
  }
]);

export default router;
