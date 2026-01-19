import React from 'react';

const e = React.createElement;

export default function MovieDetails({ movie }) {
  return e(
    'div',
    { style: styles.wrapper },
    [
      e('img', {
        key: 'img',
        src: movie.imageUrl,
        alt: movie.title,
        style: styles.image,
      }),

      e(
        'div',
        { key: 'content', style: styles.content },
        [
          e(
            'h2',
            { key: 'title' },
            `${movie.title} (${movie.year})`
          ),
          e(
            'p',
            { key: 'meta' },
            `⭐ ${movie.rating} | ⏱ ${movie.duration}`
          ),
          e(
            'p',
            { key: 'desc' },
            movie.description
          ),
        ]
      ),
    ]
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    gap: 16,
  },
  image: {
    width: 200,
  },
  content: {
    maxWidth: 500,
  },
};
