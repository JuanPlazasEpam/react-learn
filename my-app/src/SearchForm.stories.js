import SearchForm from './SearchForm';

export default {
  title: 'Components/SearchForm',
  component: SearchForm,
};

export const Empty = {
  args: {
    value: '',
    onSearch: (query) => console.log('Search:', query),
  },
};

export const WithText = {
  args: {
    value: 'Star Wars',
    onSearch: (query) => console.log('Search:', query),
  },
};
