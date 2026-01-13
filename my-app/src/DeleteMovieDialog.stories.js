import React from 'react';
import Dialog from '../Dialog/Dialog';

export default {
  title: 'Use cases/Delete Movie',
};

export const Default = () =>
  React.createElement(
    Dialog,
    {
      title: 'Delete Movie',
      onClose: () => console.log('Close dialog'),
    },
    React.createElement(
      'div',
      { style: { textAlign: 'center' } },
      [
        React.createElement(
          'p',
          { key: 'text' },
          'Are you sure you want to delete this movie?'
        ),
        React.createElement(
          'div',
          { key: 'buttons', style: { marginTop: 16 } },
          [
            React.createElement(
              'button',
              {
                key: 'confirm',
                onClick: () =>
                  console.log('Movie deleted'),
              },
              'Confirm'
            ),
            React.createElement(
              'button',
              {
                key: 'cancel',
                onClick: () =>
                  console.log('Delete cancelled'),
                style: { marginLeft: 8 },
              },
              'Cancel'
            ),
          ]
        ),
      ]
    )
  );
