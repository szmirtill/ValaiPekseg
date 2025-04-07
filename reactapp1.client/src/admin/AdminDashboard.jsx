// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import "../Style/AdminDashboard.css";

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-dashboard">

            {/* Fejléc NAVBAR felül */}
            <header className="header">
                <nav className="navbar">
                    <div className="navbar-left">
                        <span className="logo">Valai Pékség Admin</span>
                    </div>

                    <div className="navbar-center">
                        <a onClick={() => navigate("/admin/products")}>Termékek</a>
                        <a onClick={() => navigate("/admin/users")}>Felhasználók</a>
                    </div>

                    <div className="navbar-right">
                        <button className="nav-button" onClick={() => navigate("/")}>Kijelentkezés</button>
                    </div>
                </nav>
            </header>

            {/* Tartalom a navbar alatt */}
            <main className="dashboard-content">
                <header className="dashboard-header">
                    <h1>Admin Vezérlőpult</h1>
                    <h3>Statisztika</h3>
                </header>

                <section className="stats-overview">
                    <div className="stat-box">
                        <h4>Teljes bevétel</h4>
                        <p className="value">*Jövőbeli fejlesztés*</p>
                    </div>
                    <div className="stat-box">
                        <h4>Összes rendelés</h4>
                        <p className="value">*Jövőbeli fejlesztés*</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
