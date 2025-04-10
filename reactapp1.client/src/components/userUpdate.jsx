// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function UserUpdate({ userId, email, onSubmit, onCancel }) {
    const [newPassword, setNewPassword] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState(''); 
    const [setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await onSubmit(userId, email, newPassword, adminPassword); 
            setSuccessMessage("Jelszó frissítve!"); 
            setNewPassword('');
            setAdminPassword('');
            setShowModal(false);
        } catch {
            setErrorMessage('Hiba történt a jelszó frissítésekor');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div>
           
            <div className={`edit-modal-overlay ${showModal ? 'show' : ''}`} onClick={toggleModal}>
                <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>Jelszó visszaállítása</h2>
                    <input
                        type="password"
                        placeholder="Új jelszó"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Admin jelszó"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                    />
                    <div className="edit-modal-buttons">
                        <button onClick={onCancel}>Mégse</button>
                        <button onClick={handleSubmit}>Mentés</button>
                    </div>
                </div>
            </div>

            
            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}
        </div>
    );
}


UserUpdate.propTypes = {
    userId: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default UserUpdate;
