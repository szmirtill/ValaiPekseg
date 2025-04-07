// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './Style/footer.css';

const Footer = ({ rootClassName }) => {
    return (
        <footer className={`footer-footer ${rootClassName}`}>
            <div className="footer-container1">
                <div className="footer-container2">
                    <span className="footer-text1">Valai Pékség</span>
                    <span>© 2024 Minden jog fenntartva</span>
                </div>
            </div>
            
        </footer>
    );
};

Footer.defaultProps = {
    rootClassName: '',
};

Footer.propTypes = {
    rootClassName: PropTypes.string,
};

export default Footer;
