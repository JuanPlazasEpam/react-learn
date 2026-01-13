import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieDetails from './MovieDetails';

const movie = {
  imageUrl: 'poster.jpg',
  title: 'Inception',
  year: 2010,
  rating: 8.8,
  duration: '2h 28min',
  description: 'A mind-bending thriller.',
};

describe('MovieDetails', () => {
  test('renders movie details correctly', () => {
    render(
      React.createElement(MovieDetails, { movie })
    );

    expect(
      screen.getByText('Inception (2010)')
    ).toBeInTheDocument();

    expect(
      screen.getByText(/8.8/)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/2h 28min/)
    ).toBeInTheDocument();

    expect(
      screen.getByText('A mind-bending thriller.')
    ).toBeInTheDocument();
  });

  test('renders poster image', () => {
    render(
      React.createElement(MovieDetails, { movie })
    );

    const img = screen.getByAltText('Inception');
    expect(img).toHaveAttribute('src', 'poster.jpg');
  });
});
