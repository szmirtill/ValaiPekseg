// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Style/About.css";

function About() {
    return (
        <div className="about-container">
            <header className="header">
                <nav>
                    <ul>
                        <li><a href="/about">Rólunk</a></li>
                        <li><a href="/mainpage3">Termékeink</a></li>
                        <li><a href="/mainpage">Bejelentkezés</a></li>
                        <li><a href="/registration">Regisztráció</a></li>
                        <li><a href="/admin/login">Admin</a></li>
                    </ul>
                </nav>
            </header>

            <div className="about-wrapper">
                <h1 className="about-title">Rólunk – Valai Pékség története</h1>
                <p className="about-intro">
                    A Valai Pékség egy családi vállalkozás, amely a hagyományt és a minőséget ötvözi, hogy minden nap friss, kézműves pékárut kínáljon.
                </p>

                <div className="about-grid">
                    <div className="about-image">
                        <img src="/img/rolunk.jpg" alt="Pékség" />
                    </div>
                    <div className="about-text">
                        <h2>Hagyomány és minőség kéz a kézben</h2>
                        <p>
                            Pékségünk titka az egyszerűségben és a természetességben rejlik. Csak a legjobb alapanyagokkal dolgozunk: kiváló minőségű liszt, természetes kovász és gondosan válogatott magvak teszik különlegessé termékeinket.
                        </p>
                        <p>
                            Hagyományos magyar pékáruk mellett folyamatosan bővülő kínálatunkban pogácsák, kalácsok, kenyerek és friss péksütemények is megtalálhatóak.
                        </p>
                    </div>
                </div>

                <div className="sustainability-section">
                    <h2>Fenntarthatóság és felelős gondolkodás</h2>
                    <ul>
                        <li>✅ Helyi termelőktől szerezzük be alapanyagainkat.</li>
                        <li>✅ Minimalizáljuk az élelmiszer-pazarlást.</li>
                        <li>✅ Környezetbarát csomagolásokat használunk.</li>
                    </ul>
                </div>

                <div className="contact-section">
                    <h2>Látogass el hozzánk!</h2>
                    <div className="contact-details">
                        <p>📍 Valai Pékség, Kővágóőrs</p>
                        <p>📞 +36 30 123 4567</p>
                        <p>🌐 <a href="https://www.valaipekseg.hu" target="_blank" rel="noreferrer">www.valaipekseg.hu</a></p>
                    </div>
                </div>
            </div>

            
        </div>
    );
}

export default About;
