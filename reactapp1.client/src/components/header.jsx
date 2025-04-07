import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Style/header.css';

const Header = ({ rootClassName, button }) => {
    return (
        <div data-role="Header" className={`header-header ${rootClassName}`}>
            <nav className="header-nav">
                <div className="header-container1">
                    <Link to="/" className="header-navlink1 Large">
                        Valai Pékség
                    </Link>
                    <div className="header-menu1">
                        <Link to="/" className="header-navlink2 Large">
                            Főoldal
                        </Link>
                        <Link to="/mainpage3" className="header-navlink3 Large">
                            Termékek
                        </Link>
                    </div>
                    <div className="header-container2">
                        <div className="header-container3">
                            <button type="button" className="header-button button">
                                <span className="header-text1">
                                    {button ?? <span className="header-text2">Belépés</span>}
                                </span>
                            </button>
                        </div>

                        {/* Admin gomb hozzáadása */}
                        <div className="header-container3">
                            <button type="button" className="header-button button">
                                <Link to="/admin/login">
                                    <span className="header-text1">
                                        Admin
                                    </span>
                                </Link>
                            </button>
                        </div>

                        <div data-role="BurgerMenu" className="header-burger-menu">
                            <svg viewBox="0 0 1024 1024" className="header-icon1">
                                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </nav>

            <div data-role="MobileMenu" className="header-mobile-menu">
                <div className="header-top">
                    <Link to="/" className="header-navlink4 Large">
                        Valai Pékség
                    </Link>
                    <div data-role="CloseMobileMenu" className="header-close-menu">
                        <svg viewBox="0 0 1024 1024" className="header-icon3">
                            <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z" />
                        </svg>
                    </div>
                </div>

                <div className="header-mid">
                    <div className="header-menu2">
                        <Link to="/" className="header-navlink5 Large">
                            Főoldal
                        </Link>
                        <Link to="/profile" className="header-navlink6 Large">
                            Profilom
                        </Link>
                        <Link to="/registration" className="header-navlink7 Large">
                            Regisztráció
                        </Link>
                    </div>
                </div>

                <div className="header-bot" />
            </div>
        </div>
    );
};

Header.defaultProps = {
    rootClassName: '',
    button: undefined,
};

Header.propTypes = {
    rootClassName: PropTypes.string,
    button: PropTypes.element,
};

export default Header;
