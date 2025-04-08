
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Style/QuantityModal.css';

export default function QuantityModal({ isOpen, onClose, onConfirm, product }) {
    const [quantity, setQuantity] = useState(1);

    if (!isOpen || !product) return null;

    const handleConfirm = () => {
        const parsed = parseInt(quantity, 10);
        if (!isNaN(parsed) && parsed > 0) {
            onConfirm(parsed);
            setQuantity(1);
        } else {
            alert("Kérlek, érvényes számot adj meg.");
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>{product.nev} | Hány darabot szeretnél?</h3>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <div className="modal-buttons">
                    <button onClick={handleConfirm}>OK</button>
                    <button onClick={onClose}>Mégsem</button>
                </div>
            </div>
        </div>
    );
}

// ✅ PropTypes validáció
QuantityModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    product: PropTypes.shape({
        nev: PropTypes.string.isRequired,
    }),
};

