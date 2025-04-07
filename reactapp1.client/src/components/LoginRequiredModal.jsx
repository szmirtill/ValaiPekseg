// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './Style/QuantityModal.css'; // ugyanazt a CSS-t használjuk

export default function LoginRequiredModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Bejelentkezés szükséges</h3>
                <p>A rendelés leadásához előbb be kell jelentkezned.</p>
                <div className="modal-buttons">
                    <button onClick={onClose}>Rendben</button>
                </div>
            </div>
        </div>
    );
}

LoginRequiredModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
