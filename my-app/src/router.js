import EditMovieForm from "./EditMovieForm";

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
        path: "new",
        element: React.createElement(AddMovieForm)
      },
      {
        path: ":movieId/edit",
        element: React.createElement(EditMovieForm)
      },
      {
        path: ":movieId",
        element: React.createElement(MovieDetailsWrapper)
      }
    ]
  }
]);
