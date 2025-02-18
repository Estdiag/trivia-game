import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

export default function Modal({ children, isOpen, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);
  return (
    <dialog
      ref={dialogRef}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg overflow-y-auto"
      onCancel={onClose}
    >
      <div className="relative">{children}</div>
    </dialog>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

Modal.defaultProps = {
  isOpen: false,
};
