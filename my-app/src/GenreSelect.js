import React from "react";

class GenreSelect extends React.Component {
  handleSelect = (genre) => {
    this.props.onSelect(genre);
  };

  render() {
    const { genres, selectedGenre } = this.props;

    return React.createElement(
      "div",
      { className: "genres" },
      genres.map((genre) =>
        React.createElement(
          "button",
          {
            key: genre,
            className:
              "genre-button" +
              (genre === selectedGenre ? " active" : ""),
            onClick: () => this.handleSelect(genre),
          },
          genre
        )
      )
    );
  }
}

export default GenreSelect;
