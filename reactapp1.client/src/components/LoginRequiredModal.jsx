import PropTypes from 'prop-types';
import './Style/LoginRequiredModal.css'; // ha van stílusod

function LoginRequiredModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Bejelentkezés szükséges</h2>
                <p>A rendelés leadásához elõbb be kell jelentkezned.</p>
                <button onClick={onClose}>Rendben</button>
            </div>
        </div>
    );
}

LoginRequiredModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default LoginRequiredModal;
