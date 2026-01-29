import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SortControl from './SortControl';

describe('SortControl', () => {
  test('renders sort label and options', () => {
    render(
      React.createElement(SortControl, {
        value: 'releaseDate',
        onChange: jest.fn(),
      })
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText('Release Date')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  test('calls onChange when selection changes', () => {
    const onChange = jest.fn();

    render(
      React.createElement(SortControl, {
        value: 'releaseDate',
        onChange,
      })
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'title' },
    });

    expect(onChange).toHaveBeenCalledWith('title');
  });
});
