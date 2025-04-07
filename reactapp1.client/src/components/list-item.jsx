import React from 'react';
import PropTypes from 'prop-types';
import './Style/list-item.css';

const ListItem = ({ heading, text1, rootClassName }) => {
    return (
        <div className={`list-item-container ${rootClassName}`}>
            <h3 className="list-item-text1">
                {heading ?? (
                    <span className="list-item-text3">1. Bankkártya elfogadó hely</span>
                )}
            </h3>
            <span>
                {text1 ?? (
                    <span className="list-item-text4">
                        Üzletünkben kényelmes és biztonságos bankkártyás fizetési lehetőséget biztosítunk, így nem szükséges készpénzt magánál tartania.
                    </span>
                )}
            </span>
        </div>
    );
};

ListItem.defaultProps = {
    heading: undefined,
    text1: undefined,
    rootClassName: '',
};

ListItem.propTypes = {
    heading: PropTypes.element,
    text1: PropTypes.element,
    rootClassName: PropTypes.string,
};

export default ListItem;
