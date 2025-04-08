// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/AdminLogin.css';

function AdminLogin() {
    const [felhasznalonev, setFelhasznalonev] = useState('');
    const [jelszo, setJelszo] = useState('');
    const [hiba, setHiba] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('https://localhost:7136/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ felhasznalonev, jelszo })
        });

        if (response.ok) {
            navigate('/admin/dashboard');
        } else {
            setHiba('Hibás felhasználónév vagy jelszó.');
        }
    };

    return (
        <div className="admin-login-wrapper">
            <div className="admin-login-box">
                <div className="admin-login-left">
                    <div className="login-icon">🔒</div>
                    <h2>Admin bejelentkezés</h2>
                    <p>Kérlek add meg a bejelentkezési adataidat!</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="admin-username-input"
                            type="text"
                            placeholder="Felhasználónév"
                            value={felhasznalonev}
                            onChange={(e) => setFelhasznalonev(e.target.value)}
                        />
                        <input
                            className="admin-password-input"
                            type="password"
                            placeholder="Jelszó"
                            value={jelszo}
                            onChange={(e) => setJelszo(e.target.value)}
                        />
                        {hiba && <p className="error">{hiba}</p>}
                        <button type="submit">Bejelentkezés</button>
                    </form>
                </div>
                <div className="admin-login-right">
                    <img src="/img/kedvcsinalo.jpg" alt="Pékség" />
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
