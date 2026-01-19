import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter component", () => {
  test("renders initial value provided in props", () => {
    render(<Counter initialValue={10} />);
    expect(screen.getByText("Value: 10")).toBeInTheDocument();
  });

  test('click on "decrement" button decrements the value', () => {
    render(<Counter initialValue={5} />);

    fireEvent.click(screen.getByText("-"));

    expect(screen.getByText("Value: 4")).toBeInTheDocument();
  });

  test('click on "increment" button increments the value', () => {
    render(<Counter initialValue={5} />);

    fireEvent.click(screen.getByText("+"));

    expect(screen.getByText("Value: 6")).toBeInTheDocument();
  });
});
