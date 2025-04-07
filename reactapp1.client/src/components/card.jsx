import React from 'react';
import PropTypes from 'prop-types';
import './Style/card.css'; // csak egyszer, jó helyen importálva

const Card = ({ heading, heading1, text, button }) => {
    return (
        <div className="card-card">
            <h1 className="card-text1 HeadingOne">
                {heading ?? <span className="card-text5">Valai Pékség</span>}
            </h1>

            <h1 className="card-text2 HeadingOne">
                {heading1 ?? <span className="card-text7">Kérsz egy kis fánkot?</span>}
            </h1>

            <span className="card-text3 Lead">
                {text ?? (
                    <span className="card-text6">
                        A Valai Pékség egy családi vállalkozás, amely a hagyományt és a
                        minőséget ötvözi, hogy minden nap friss, kézműves pékárut kínáljon.
                    </span>
                )}
            </span>

            <div className="card-container1">
                <div className="card-container2">
                    <button type="button" className="card-button button">
                        <span className="card-text4">
                            {button ?? <span className="card-text8">Termékeink</span>}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

Card.defaultProps = {
    heading: undefined,
    heading1: undefined,
    text: undefined,
    button: undefined,
};

Card.propTypes = {
    heading: PropTypes.element,
    heading1: PropTypes.element,
    text: PropTypes.element,
    button: PropTypes.element,
};

export default Card;
