// src/admin/AdminUsers.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/AdminUsers.css";

const AdminUsers = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [adminPassword, setAdminPassword] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        fetch("https://localhost:7136/api/vevo")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Hiba a felhasználók lekérdezésekor:", err));
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Biztosan törlöd ezt a felhasználót?")) return;

        const res = await fetch(`https://localhost:7136/api/vevo/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            setUsers(users.filter((u) => u.id !== id));
        } else {
            alert("Nem sikerült törölni a felhasználót.");
        }
    };

    const handlePasswordReset = async () => {
        const res = await fetch("https://localhost:7136/api/vevo/reset-password", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: selectedUserId,
                email,
                newPassword,
                adminPassword,
            }),
        });

        if (res.ok) {
            alert("Jelszó frissítve!");
            setAdminPassword("");
            setEmail("");
            setNewPassword("");
            setSelectedUserId(null);
        } else {
            const errorText = await res.text();
            alert("Hiba: " + errorText);
        }
    };

    return (
        <div className="admin-users-container">
            {/* ✅ NAVBAR a fejléc tetején */}
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
            <h2>Felhasználók kezelése</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Felhasználónév</th>
                        <th>Email</th>
                        <th>Műveletek</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.felhasznalonev}</td>
                            <td>{u.email}</td>
                            <td>
                                <button onClick={() => setSelectedUserId(u.id)}>Módosítás</button>
                                <button onClick={() => handleDelete(u.id)}>Törlés</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedUserId && (
                <div className="reset-password-box">
                    <h3>Jelszó visszaállítása</h3>
                    <input
                        type="email"
                        placeholder="Felhasználó email címe"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Új jelszó"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Admin jelszó"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                    />
                    <button onClick={handlePasswordReset}>Mentés</button>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
