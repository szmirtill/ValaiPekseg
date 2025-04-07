// AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../Style/AdminDashboard.css";

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-dashboard">
            {/* Oldalsáv */}
            <aside className="modern-sidebar">
                <div className="sidebar-section">
                    <h3 className="section-title">Admin</h3>
                    <ul>
                        <li onClick={() => navigate("/admin/products")}>Termékek</li>
                        <li onClick={() => navigate("/admin/users")}>Felhasználók</li> {/* ✅ HOZZÁADVA */}
                    </ul>
                </div>
                <div className="sidebar-section">
                    <ul>
                        <li className="logout" onClick={() => navigate("/")}>Kijelentkezés</li>
                    </ul>
                </div>
            </aside>

            {/* Tartalom */}
            <main className="dashboard-content">
                <header className="dashboard-header">
                    <h1>Admin Vezérlőpult</h1>
                    <h3>Statisztika</h3>
                </header>

                <section className="stats-overview">
                    <div className="stat-box">
                        <h4>Teljes bevétel</h4>
                        <p className="value">X Ft</p>
                    </div>
                    <div className="stat-box">
                        <h4>Összes rendelés</h4>
                        <p className="value">X</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
