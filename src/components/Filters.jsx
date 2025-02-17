import { categories, type, difficulty } from '../types/gameFilters';
import Select from './Select';
import PropTypes from 'prop-types';

export default function Filters({ onChange, values }) {
  return (
    <form>
      <Select name="category" label="category" onChange={onChange}>
        <option value="" selected={values.category === ''}>
          Any category
        </option>
        {Object.entries(categories).map(([name, value]) => (
          <option key={name} value={name} selected={name === values.category}>
            {value}
          </option>
        ))}
      </Select>
      <Select name="type" label="type" onChange={onChange} value="multiple">
        {Object.entries(type).map(([name, value]) => (
          <option key={name} value={name} selected={name === values.type}>
            {value}
          </option>
        ))}
      </Select>
      <Select
        name="difficulty"
        label="difficulty"
        onChange={onChange}
        value="easy"
      >
        {Object.entries(difficulty).map(([name, value]) => (
          <option key={name} value={name} selected={name === values.difficulty}>
            {value}
          </option>
        ))}
      </Select>
    </form>
  );
}

Filters.propTypes = {
  onChange: PropTypes.func,
  values: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
  }),
};
