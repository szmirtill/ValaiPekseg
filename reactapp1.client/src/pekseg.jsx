// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import Header from './components/header';
import Card from './components/card';
import Container from './components/container';
import Contaier from './components/contaier';
import Footer from './components/footer';
import './Style/home.css';

const Home = () => {
    useEffect(() => {
        document.title = "Valai Pékség";
    }, []);

    return (
        <div className="home-container1">
            <Header button={<a href="/mainpage"><span className="home-text10">Belépés</span></a>} />

            <div className="home-hero">
                <div className="home-container2">
                    <Card
                        text={<span className="home-text11">
                            A Valai Pékség egy családi vállalkozás, amely a hagyományt és a minőséget ötvözi, hogy minden nap friss, kézműves pékárut kínáljon.
                        </span>}
                        button={<a href="/MainPage3"><span className="home-text12">Termékeink</span></a>}
                        heading={<span className="home-text13">Valai Pékség</span>}
                        heading1={<span className="home-text14">Kérsz egy kis fánkot?</span>}
                    />
                </div>
            </div>

            <img
                alt="Pékség hangulatkép"
                src="https://images.unsplash.com/photo-1595801106239-faefa2cdcf75?ixlib=rb-4.0.3&h=1500"
                className="home-image1"
            />

            <Container
                text3={<span className="home-text15">
                    Pékségünk titka az egyszerűségben és a természetességben rejlik. Csak a legjobb alapanyagokkal dolgozunk: kiváló minőségű liszt, természetes kovász és gondosan válogatott magvak teszik különlegessé termékeinket.
                    Hagyományos magyar pékáruk mellett folyamatosan bővülő kínálatunkban pogácsák, kalácsok, kenyerek és friss péksütemények is megtalálhatóak.
                </span>}
                heading3={<span className="home-text16">Hagyomány és minőség kéz a kézben</span>}
            />

            <section className="home-testimonials">
                <img
                    alt="Boldog vásárlók"
                    src="https://images.unsplash.com/photo-1523294587484-bae6cc870010?ixlib=rb-4.0.3&q=80&w=1500"
                    className="home-image2"
                />
                <img alt="Alsó hullám dísz" src="/bottom.svg" className="home-bottom-wave-image" />
                <img alt="Felső hullám dísz" src="/top.svg" className="home-top-wave-image" />
            </section>

            <Contaier
                heading={
                    <span className="home-text17 HeadingOne">
                        <span className="home-text18">Szolgáltatásaink</span>
                        <br />
                    </span>
                }
            />

            <Footer rootClassName="footerroot-class-name" />
        </div>
    );
};

export default Home;
