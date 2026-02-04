import React from 'react';

const e = React.createElement;

export default function MovieForm({ initialMovie, onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();

    const data = Object.fromEntries(
      new FormData(event.target)
    );

    if (data.genres) {
      data.genres = data.genres
        .split(',')
        .map((g) => g.trim());
    }

    onSubmit && onSubmit(data);
  }

  return e(
    'form',
    { onSubmit: handleSubmit, style: styles.form },
    [
      input('Title', 'title', initialMovie?.title),
      input('Release Date', 'releaseDate', initialMovie?.releaseDate, 'date'),
      input('Movie URL', 'imageUrl', initialMovie?.imageUrl),
      input('Rating', 'rating', initialMovie?.rating, 'number'),
      input('Duration', 'duration', initialMovie?.duration),
      input(
        'Genres (comma separated)',
        'genres',
        initialMovie?.genres?.join(', ')
      ),
      textarea(
        'Overview',
        'description',
        initialMovie?.description
      ),
      e(
        'button',
        { type: 'submit', style: styles.submit },
        initialMovie ? 'Save' : 'Submit'
      ),
    ]
  );
}

function input(label, name, defaultValue, type = 'text') {
  return e(
    'label',
    { key: name, style: styles.label },
    [
      label,
      e('input', {
        name,
        type,
        defaultValue,
        style: styles.input,
      }),
    ]
  );
}

function textarea(label, name, defaultValue) {
  return e(
    'label',
    { key: name, style: styles.label },
    [
      label,
      e('textarea', {
        name,
        defaultValue,
        style: styles.textarea,
      }),
    ]
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 14,
  },
  input: {
    padding: 8,
    fontSize: 14,
  },
  textarea: {
    padding: 8,
    minHeight: 80,
  },
  submit: {
    marginTop: 16,
    padding: 10,
    fontSize: 16,
    cursor: 'pointer',
  },
};
