import PropTypes from 'prop-types';

export default function Button({ children, onClick, disabled, type }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string
};

Button.defaultProps = {
  disabled: false,
  type: "button",
  onClick: () => {},
};