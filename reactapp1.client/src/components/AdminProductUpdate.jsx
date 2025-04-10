// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
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
AdminProductUpdate.propTypes = {
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
};
export default AdminProductUpdate;
