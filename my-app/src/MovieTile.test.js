import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieTile from './MovieTile';

const movie = {
  imageUrl: 'test.jpg',
  title: 'Inception',
  year: 2010,
  genres: ['Action', 'Sci-Fi'],
};

describe('MovieTile', () => {
  test('renders movie information', () => {
    render(
      React.createElement(MovieTile, { movie })
    );

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(screen.getByText('Action, Sci-Fi')).toBeInTheDocument();
  });

  test('calls onClick when tile is clicked', () => {
    const onClick = jest.fn();

    render(
      React.createElement(MovieTile, { movie, onClick })
    );

    fireEvent.click(screen.getByText('Inception'));
    expect(onClick).toHaveBeenCalledWith(movie);
  });

  test('calls onEdit and onDelete callbacks', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();

    render(
      React.createElement(MovieTile, {
        movie,
        onEdit,
        onDelete,
      })
    );

    fireEvent.click(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalledWith(movie);

    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith(movie);
  });
});
