import React from 'react';
import Dialog from './Dialog';
import MovieForm from './MovieForm';

export default {
  title: 'Use cases/Add Movie',
};

export const Default = () =>
  React.createElement(
    Dialog,
    {
      title: 'Add Movie',
      onClose: () => console.log('Close dialog'),
    },
    React.createElement(MovieForm, {
      onSubmit: (data) => console.log('Add movie:', data),
    })
  );
