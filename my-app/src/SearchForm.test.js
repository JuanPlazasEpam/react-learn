import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "./SearchForm";

describe("SearchForm component", () => {
  test("renders input with initial value from props", () => {
    render(
      <SearchForm
        initialQuery="Matrix"
        onSearch={jest.fn()}
      />
    );

    expect(screen.getByDisplayValue("Matrix")).toBeInTheDocument();
  });

  test('typing and clicking "Search" calls onSearch with correct value', () => {
    const onSearchMock = jest.fn();

    render(
      <SearchForm
        initialQuery=""
        onSearch={onSearchMock}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Inception" } });
    fireEvent.click(screen.getByText("Search"));

    expect(onSearchMock).toHaveBeenCalledWith("Inception");
  });

  test("typing and pressing Enter calls onSearch with correct value", () => {
    const onSearchMock = jest.fn();

    render(
      <SearchForm
        initialQuery=""
        onSearch={onSearchMock}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Interstellar" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(onSearchMock).toHaveBeenCalledWith("Interstellar");
  });
});
