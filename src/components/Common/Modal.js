import React from 'react';
import '../../CSS/Modal.css';

const Modal = ({ isOpen, title, children, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

<<<<<<< HEAD
export default Modal;
=======
export default Modal;
>>>>>>> 7258cdf7ddfbcad4a276b948c5aebf8bfc028c3a
