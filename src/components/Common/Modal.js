import React from 'react';
import '../../CSS/Modal.css';

const Modal = ({ isOpen, title, children, onClose, onSubmit }) => {
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
                    <button className="btn btn-primary" onClick={onSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
