import PropTypes from 'prop-types';

export default function Modal({ children, isOpen }) {
  return (
    <dialog open={isOpen} aria-modal="true">
      {children}
    </dialog>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
};

Modal.defaultProps = {
  isOpen: false,
};