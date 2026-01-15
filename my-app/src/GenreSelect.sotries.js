import GenreSelect from './GenreSelect';

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Drama' },
];

export default {
  title: 'Components/GenreSelect',
  component: GenreSelect,
};

export const Default = {
  args: {
    genres,
    value: null,
    onChange: (genre) => console.log('Selected:', genre),
  },
};

export const Preselected = {
  args: {
    genres,
    value: genres[0],
    onChange: (genre) => console.log('Selected:', genre),
  },
};
