import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovieListPage from "./MovieListPage";
import SearchFormWrapper from "./SearchFormWrapper";
import MovieDetailsWrapper from "./MovieDetailsWrapper";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(MovieListPage),
    children: [
      { index: true, element: React.createElement(SearchFormWrapper) }, // default child
      { path: ":movieId", element: React.createElement(MovieDetailsWrapper) }
    ]
  }
]);

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(RouterProvider, { router })
  )
);
