import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MovieListPage from "./MovieListPage";
import SearchFormWrapper from "./SearchFormWrapper";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(MovieListPage),
    children: [
      { path: "/", element: React.createElement(SearchFormWrapper) }
    ]
  }
]);

const root = createRoot(document.getElementById("root"));
root.render(React.createElement(RouterProvider, { router }));
