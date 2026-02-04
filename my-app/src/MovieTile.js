import React from 'react';

const e = React.createElement;

export default function MovieTile({ movie, onClick, onEdit, onDelete }) {
  return e(
    'div',
    {
      style: styles.tile,
      onClick: () => onClick && onClick(movie),
    },
    [
      // Poster image
      e('img', {
        key: 'img',
        src: movie.poster,             // <- use mapped backend field
        alt: movie.title,
        style: styles.image,
      }),

      // Info section
      e(
        'div',
        { key: 'info', style: styles.info },
        [
          // Header: title + release date
          e(
            'div',
            { key: 'header', style: styles.header },
            [
              e('span', { key: 'title' }, movie.title),
              e('span', { key: 'year' }, movie.releaseDate.split("-")[0] || ''),
            ]
          ),

          // Genres (safely join)
          e(
            'p',
            { key: 'genres' },
            (movie.genres || []).join(', ')
          ),

          // Action buttons
          e(
            'div',
            { key: 'actions', style: styles.actions },
            [
              e(
                'button',
                {
                  key: 'edit',
                  onClick: (ev) => {
                    ev.stopPropagation();
                    onEdit && onEdit(movie);
                  },
                },
                'Edit'
              ),
              e(
                'button',
                {
                  key: 'delete',
                  onClick: (ev) => {
                    ev.stopPropagation();
                    onDelete && onDelete(movie);
                  },
                },
                'Delete'
              ),
            ]
          ),
        ]
      ),
    ]
  );
}

const styles = {
  tile: {
    width: 200,
    cursor: 'pointer',
    border: '1px solid #ccc',
    padding: 8,
  },
  image: {
    width: '100%',
  },
  info: {
    marginTop: 8,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  actions: {
    display: 'flex',
    gap: 4,
  },
};
