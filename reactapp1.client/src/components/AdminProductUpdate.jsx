// eslint-disable-next-line no-unused-vars
import React from "react";
import './Style/AdminProductUpdate.css';

const AdminProductUpdate = ({ message, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Sikeres művelet!</h3>
                <p>{message}</p>
                <button onClick={onClose}>Bezárás</button>
            </div>
        </div>
    );
};

export default AdminProductUpdate;
