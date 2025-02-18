import PropTypes from 'prop-types';

export default function Select({ name, label, onChange, children, value }) {
  return (
    <div className="max-w-md w-[300px]">
      <label
        htmlFor={name}
        className="block mb-2 text-md font-medium text-gray-900"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5"
      >
        {children}
      </select>
    </div>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
};
