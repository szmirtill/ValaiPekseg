// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './Style/container.css';

const Container = ({ heading3, text3, imageSrc, imageAlt, imageSrc1, imageAlt1 }) => {
    return (
        <section className="container-container1">
            <h1 className="container-text1">
                {heading3 ?? (
                    <span className="container-text3">
                        Hagyomány és minőség kéz a kézben
                    </span>
                )}
            </h1>

            <div className="container-container2">
                <span>
                    {text3 ?? (
                        <span className="container-text4">
                            Pékségünk titka az egyszerűségben és a természetességben rejlik.
                            Csak a legjobb alapanyagokkal dolgozunk: kiváló minőségű liszt,
                            természetes kovász és gondosan válogatott magvak teszik
                            különlegessé termékeinket. Hagyományos magyar pékáruk mellett
                            folyamatosan bővülő kínálatunkban pogácsák, kalácsok, kenyerek
                            és friss péksütemények is megtalálhatóak.
                        </span>
                    )}
                </span>
            </div>

            <div className="container-container3">
                <div className="container-container4">
                    <img
                        alt={imageAlt}
                        src={imageSrc}
                        className="container-image1"
                    />
                </div>
                <div className="container-container5">
                    <img
                        alt={imageAlt1}
                        src={imageSrc1}
                        className="container-image2"
                    />
                </div>
            </div>
        </section>
    );
};

Container.defaultProps = {
    heading3: undefined,
    text3: undefined,
    imageAlt: 'pékség hangulat',
    imageAlt1: 'finomság',
    imageSrc: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?ixlib=rb-4.0.3&w=1100',
    imageSrc1: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&w=1100',
};

Container.propTypes = {
    heading3: PropTypes.element,
    text3: PropTypes.element,
    imageAlt: PropTypes.string,
    imageAlt1: PropTypes.string,
    imageSrc: PropTypes.string,
    imageSrc1: PropTypes.string,
};

export default Container;
