import PropTypes from 'prop-types';

export default function Modal({ children, isOpen }) {
  return <dialog open={isOpen}>{children}</dialog>;
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
};
