import PropTypes from 'prop-types';
import './Style/LoginRequiredModal.css'; // ha van st�lusod

function LoginRequiredModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Bejelentkez�s sz�ks�ges</h2>
                <p>A rendel�s lead�s�hoz el�bb be kell jelentkezned.</p>
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
