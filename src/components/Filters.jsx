import { categories, type, difficulty } from '../types/gameFilters';
import Select from './Select';
import PropTypes from 'prop-types';

export default function Filters({ onChange, values }) {
  return (
    <form>
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
    </form>
  );
}

Filters.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
  }).isRequired,
};