import React from 'react';
import PropTypes from 'prop-types';

import ListItem from './list-item';
import './Style/contaier.css';

const Contaier = ({ heading, imageAlt1, imageAlt11 }) => {
    return (
        <section className="contaier-contaier">
            <div className="contaier-container1">
                <h1 className="contaier-text10 HeadingTwo">
                    {heading ?? (
                        <h3 className="contaier-text19 HeadingOne">
                            <span className="contaier-text20">Szolgáltatásaink</span>
                            <br />
                        </h3>
                    )}
                </h1>
            </div>

            <div className="contaier-container2">
                <img
                    alt={imageAlt1}
                    src="https://images.unsplash.com/photo-1567042661848-7161ce446f85?ixlib=rb-4.0.3&h=400"
                    className="contaier-image1"
                />
                <div className="contaier-container3">
                    <ListItem
                        heading={<span className="contaier-text12">1. Bankkártya elfogadó hely</span>}
                        text1={<span className="contaier-text11">Üzletünkben kényelmes és biztonságos bankkártyás fizetési lehetőséget biztosítunk, így nem szükséges készpénzt magánál tartania.</span>}
                        description="Üzletünkben kényelmes és biztonságos bankkártyás fizetési lehetőséget biztosítunk, így nem szükséges készpénzt magánál tartania."
                        rootClassName="list-itemroot-class-name"
                    />

                    <ListItem
                        heading={<span className="contaier-text14">2. Ingyenes wifi használat</span>}
                        text1={<span className="contaier-text13">Vásárlóink számára díjmentes wifi-hozzáférést kínálunk, hogy vásárlás közben is könnyedén böngészhessenek vagy intézhessék online ügyeiket.</span>}
                        rootClassName="list-itemroot-class-name1"
                    />
                </div>
            </div>

            <div className="contaier-divider1" />

            <div className="contaier-container4">
                <div className="contaier-container5">
                    <ListItem
                        heading={<span className="contaier-text16">3. Előrendelési lehetőség</span>}
                        text1={<span className="contaier-text15">Lehetőséget biztosítunk arra, hogy a kívánt árucikket előre megrendelje személyesen vagy telefonon, így biztosan hozzájuthat a szükséges termékekhez a kívánt időpontban.</span>}
                        description="Üzletünkben kényelmes és biztonságos bankkártyás fizetési lehetőséget biztosítunk, így nem szükséges készpénzt magánál tartania."
                        rootClassName="list-itemroot-class-name2"
                    />

                    <ListItem
                        heading={<span className="contaier-text18">4. Széles péksütemény-választék</span>}
                        text1={<span className="contaier-text17">Kínálatunkban számos friss és ízletes péksütemény közül válogathat, hogy mindenki megtalálja a saját ízlésének megfelelő finomságokat.</span>}
                        rootClassName="list-itemroot-class-name3"
                    />
                </div>

                <img
                    alt={imageAlt11}
                    src="https://images.unsplash.com/photo-1518091270798-06f27624a89e?ixlib=rb-4.0.3&h=400"
                    className="contaier-image2"
                />
            </div>

            <div className="contaier-divider2" />
        </section>
    );
};

Contaier.defaultProps = {
    heading: undefined,
    imageAlt1: 'Pékség szolgáltatás',
    imageAlt11: 'Friss pékáru illusztráció',
};

Contaier.propTypes = {
    heading: PropTypes.element,
    imageAlt1: PropTypes.string,
    imageAlt11: PropTypes.string,
};

export default Contaier;
