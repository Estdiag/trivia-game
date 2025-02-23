import PropTypes from 'prop-types';

export default function Button({ children, onClick, disabled, type, className }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`btn ${className}`}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string
};

Button.defaultProps = {
  disabled: false,
  type: "button",
  onClick: () => {},
  className:''
};