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
      e('img', {
        key: 'img',
        src: movie.imageUrl,
        alt: movie.title,
        style: styles.image,
      }),

      e(
        'div',
        { key: 'info', style: styles.info },
        [
          e(
            'div',
            { key: 'header', style: styles.header },
            [
              e('h3', { key: 'title' }, movie.title),
              e('span', { key: 'year' }, movie.year),
            ]
          ),
          e(
            'p',
            { key: 'genres' },
            movie.genres.join(', ')
          ),
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
