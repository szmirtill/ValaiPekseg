// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './Style/QuantityModal.css';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Biztosan ki szeretnél jelentkezni?</h3>
                <div className="modal-buttons">
                    <button onClick={onConfirm}>Igen, kijelentkezem</button>
                    <button onClick={onClose}>Mégsem</button>
                </div>
            </div>
        </div>
    );
}

LogoutModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};
