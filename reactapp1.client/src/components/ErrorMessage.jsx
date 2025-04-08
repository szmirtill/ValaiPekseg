// ErrorMessage.js

import React from 'react';
import PropTypes from 'prop-types';
import './style/ErrorMessage.css'

const ErrorMessage = ({ message, onClose }) => {
    return (
        <div className="error-message">
            <div className="error-overlay" onClick={onClose}></div>
            <div className="error-box">
                <h3>{message}</h3>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ErrorMessage;
