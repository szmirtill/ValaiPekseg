import React, { useState } from 'react';
import PropTypes from 'prop-types';

function UserUpdate({ userId, email, onSubmit, onCancel }) {
    const [newPassword, setNewPassword] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');  // Hozzáadott állapot a sikerüzenethez

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(userId, email, newPassword, adminPassword).then(() => {
            setSuccessMessage("Jelszó frissítve!"); // Beállítja a sikeres üzenetet
            setNewPassword('');
            setAdminPassword('');
            setShowModal(false); // Az ablak bezárása a mentés után
        }).catch((err) => {
            console.error(err);
            setSuccessMessage('Hiba történt a jelszó frissítésekor');
        });
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div>
            {/* Overlay a felugró ablakhoz */}
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

            {/* Ha sikerült a módosítás, akkor itt jelenik meg a sikerüzenet */}
            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}
        </div>
    );
}

// PropTypes validálás
UserUpdate.propTypes = {
    userId: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default UserUpdate;
