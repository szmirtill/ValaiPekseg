// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/Registration.css';
import Header from './components/header';

function Registration() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('A jelszavak nem egyeznek!');
            setSuccessMessage('');
            return;
        }

        try {
            const response = await fetch('https://localhost:7136/api/account/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    felhasznalonev: username,
                    email: email,
                    jelszo: password,
                }),
            });

            if (response.ok) {
                setSuccessMessage("Sikeres regisztráció! Most már bejelentkezhetsz.");
                setErrorMessage('');
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            } else {
                const errorText = await response.text();
                setErrorMessage(errorText);
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('Hálózati hiba történt: ' + error.message);
            setSuccessMessage('');
        }
    };

    return (
        <div className="registration-page">
            <Header button={<a href="/mainpage"><span className="home-text10">Belépés</span></a>} />
            <div className="registration-box">
                <div className="registration-left">
                    <img src="/img/kedvcsinalo.jpg" alt="Pékség" />
                </div>
                <div className="registration-right">
                    <div className="registration-icon">🔒</div>
                    <h1>Regisztráció</h1>
                    <form onSubmit={handleRegistration}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Felhasználónév</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Jelszó</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Jelszó megerősítése</label>
                                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                            </div>
                        </div>

                        {errorMessage && <p className="error">{errorMessage}</p>}
                        {successMessage && <p className="success">{successMessage}</p>}
                        <button type="submit" className="register-btn">Regisztráció</button>
                    </form>
                </div>

            </div>


        </div>
    );
}

export default Registration;
