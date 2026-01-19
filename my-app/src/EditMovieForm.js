import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "./Dialog";
import MovieForm from "./MovieForm";

export default function EditMovieForm() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = React.useState(null);

  React.useEffect(() => {
    fetch("https://your-api/movies/" + movieId)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [movieId]);

  function handleClose() {
    navigate("/");
  }

  async function handleSubmit(updatedMovie) {
    await fetch("https://your-api/movies/" + movieId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMovie)
    });

    navigate("/");
  }

  if (!movie) {
    return null; // or loader
  }

  return React.createElement(
    Dialog,
    {
      isOpen: true,
      title: "Edit Movie",
      onClose: handleClose
    },
    React.createElement(MovieForm, {
      initialMovie: movie,
      onSubmit: handleSubmit
    })
  );
}
