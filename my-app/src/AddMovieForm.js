import React from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "./Dialog";
import MovieForm from "./MovieForm";

export default function AddMovieForm() {
  const navigate = useNavigate();

  function handleClose() {
    navigate("/");
  }

  async function handleSubmit(movieData) {
    const response = await fetch("https://your-api/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movieData)
    });

    await response.json();

    navigate("/");
  }

  return React.createElement(
    Dialog,
    {
      isOpen: true,
      title: "Add Movie",
      onClose: handleClose
    },
    React.createElement(MovieForm, {
      onSubmit: handleSubmit
    })
  );
}
