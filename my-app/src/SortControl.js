import React from 'react';

const e = React.createElement;

export default function SortControl({ value, onChange }) {
  return e(
    'label',
    { style: { display: 'flex', gap: 8 } },
    [
      'Sort by',
      e(
        'select',
        {
          key: 'select',
          value,
          onChange: (ev) => onChange(ev.target.value),
        },
        [
          e('option', { key: 'date', value: 'releaseDate' }, 'Release Date'),
          e('option', { key: 'title', value: 'title' }, 'Title'),
        ]
      ),
    ]
  );
}
