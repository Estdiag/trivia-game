import { categories, type, difficulty } from '../types/gameFilters';
import Select from './Select';
import PropTypes from 'prop-types';
import Button from '../components/Button';

export default function Filters({ onChange, values, onClick }) {
  const handleSubmit = event => {
    event.preventDefault();
    onClick();
  };
  return (
    <form
      className="w-full flex flex-col gap-4 h-fit items-center"
      onSubmit={handleSubmit}
    >
      <Select
        name="category"
        label="Category"
        onChange={onChange}
        value={values.category}
      >
        <option value="">Any category</option>
        {Object.entries(categories).map(([name, value]) => (
          <option key={name} value={name}>
            {value}
          </option>
        ))}
      </Select>
      <Select name="type" label="Type" onChange={onChange} value={values.type}>
        <option value="">Any type</option>
        {Object.entries(type).map(([name, value]) => (
          <option key={name} value={name}>
            {value}
          </option>
        ))}
      </Select>
      <Select
        name="difficulty"
        label="Difficulty"
        onChange={onChange}
        value={values.difficulty}
      >
        <option value="">Any difficulty</option>
        {Object.entries(difficulty).map(([name, value]) => (
          <option key={name} value={name}>
            {value}
          </option>
        ))}
      </Select>
      <div>
        <Button className="btn-primary" type="submit">
          Search
        </Button>
      </div>
    </form>
  );
}

Filters.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  values: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
  }).isRequired,
};
