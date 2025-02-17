import PropTypes from 'prop-types';
export default function Select({ name, label, onChange, children, value }) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select onChange={onChange} value={value} name={name}>
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
