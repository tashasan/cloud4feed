import React from 'react';
import { useEffect } from 'react';

const Modal = ({ isVisible = false, title, content, onClose, onSaveChanges }) => {
    const keydownHandler = ({ key }) => {
        switch (key) {
            case 'Escape':
                onClose();
                break;
            default:
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', keydownHandler);
        return () => document.removeEventListener('keydown', keydownHandler);
    });

    return !isVisible ? null : (
        <div className="modal" onClick={onClose}>
            <div className="modal-dialog" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">{title}</h3>
                    <span className="modal-close" onClick={onClose}>
                        &times;
                    </span>
                </div>
                <div className="modal-body">
                    <div className="modal-content">
                        {content}
                        <div className="row mt-3">
                            <div className="col-3 ms-4"></div>
                            <button className='btn btn-primary w-50' onClick={onSaveChanges}> Save Changes</button>
                            <div className="col-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;