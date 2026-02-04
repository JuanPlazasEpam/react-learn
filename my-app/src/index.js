import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import "./index.css";

import MovieListPage from "./MovieListPage";
import SearchFormWrapper from "./SearchFormWrapper";
import MovieDetailsWrapper from "./MovieDetailsWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(MovieListPage),
    children: [
      {
        index: true,
        element: React.createElement(SearchFormWrapper)
      },
      {
        path: ":movieId",
        element: React.createElement(MovieDetailsWrapper)
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(RouterProvider, { router })
  )
);
