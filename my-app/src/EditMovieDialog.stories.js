import React from 'react';
import Dialog from '../Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';

export default {
  title: 'Use cases/Edit Movie',
};

const movie = {
  title: 'Inception',
  releaseDate: '2010-07-16',
  imageUrl: 'https://via.placeholder.com/300x450',
  rating: 8.8,
  duration: '148 min',
  genres: ['Action', 'Sci-Fi'],
  description: 'A mind-bending thriller.',
};

export const Default = () =>
  React.createElement(
    Dialog,
    {
      title: 'Edit Movie',
      onClose: () => console.log('Close dialog'),
    },
    React.createElement(MovieForm, {
      initialMovie: movie,
      onSubmit: (data) =>
        console.log('Edit movie:', data),
    })
  );
