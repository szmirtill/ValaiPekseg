import PropTypes from 'prop-types';
import './Style/EditQuantityModal.css';

function EditQuantityModal({ isOpen, onClose, onSave, currentQuantity }) {
    if (!isOpen) return null;

    const handleSave = () => {
        const newQuantity = parseInt(document.getElementById("quantityInput").value);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            onSave(newQuantity);
        }
    };

    return (
        <div className="modal">
            <h2>Mennyiség módosítása</h2>
            <input type="number" id="quantityInput" defaultValue={currentQuantity} />
            <button onClick={handleSave}>Mentés</button>
            <button onClick={onClose}>Mégse</button>
        </div>
    );
}

EditQuantityModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    currentQuantity: PropTypes.number.isRequired,
};

export default EditQuantityModal;
