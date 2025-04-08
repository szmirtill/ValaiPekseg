import React from "react";
import './Style/DeleteUserModal.css';

const DeleteUserModal = ({ isOpen, onClose, onDelete, userEmail }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Biztosan törlöd ezt a felhasználot?</h2>
                <p>Email: {userEmail}</p>
                <div className="modal-buttons">
                    <button className="confirm-button" onClick={onDelete}>
                        Igen
                    </button>
                    <button className="cancel-button" onClick={onClose}>
                        Mégse
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserModal;
