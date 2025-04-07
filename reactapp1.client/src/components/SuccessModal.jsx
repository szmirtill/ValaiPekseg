import PropTypes from 'prop-types';
import './Style/SuccessModal.css';

function SuccessModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <h2>Sikeres rendelés!</h2>
            <p>Köszönjük a vásárlást.</p>
            <button onClick={onClose}>Bezárás</button>
        </div>
    );
}

SuccessModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default SuccessModal;
