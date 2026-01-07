import { render, screen, fireEvent } from "@testing-library/react";
import GenreSelect from "./GenreSelect";

describe("GenreSelect component", () => {
  const genres = ["Action", "Comedy", "Drama"];

  test("renders all genres passed in props", () => {
    render(
      <GenreSelect
        genres={genres}
        selectedGenre="Action"
        onSelect={jest.fn()}
      />
    );

    genres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });

  test("highlights the selected genre passed in props", () => {
    render(
      <GenreSelect
        genres={genres}
        selectedGenre="Comedy"
        onSelect={jest.fn()}
      />
    );

    const selectedButton = screen.getByText("Comedy");
    expect(selectedButton).toHaveClass("active");
  });

  test("clicking a genre calls onSelect with correct genre", () => {
    const onSelectMock = jest.fn();

    render(
      <GenreSelect
        genres={genres}
        selectedGenre="Action"
        onSelect={onSelectMock}
      />
    );

    fireEvent.click(screen.getByText("Drama"));

    expect(onSelectMock).toHaveBeenCalledWith("Drama");
  });
});
