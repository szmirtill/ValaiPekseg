// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/AdminUsers.css";
import UserUpdate from "../components/userUpdate"; // Importáld a UserUpdate komponenst

const AdminUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [email, setEmail] = useState('');

    // API hívás felhasználók lekérése
    useEffect(() => {
        fetch("https://localhost:7136/api/vevo")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data); // Ha van adat, töltse be a 'users' tömbbe
            })
            .catch((err) => console.error("Hiba a felhasználók lekérdezésekor:", err));
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Biztosan törlöd ezt a felhasználót?")) return;

        const res = await fetch(`https://localhost:7136/api/vevo/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            setUsers(users.filter((u) => u.id !== id)); // Frissíti a táblázatot törlés után
        } else {
            alert("Nem sikerült törölni a felhasználót.");
        }
    };

    const handlePasswordReset = async (userId, email, newPassword, adminPassword) => {
        const res = await fetch("https://localhost:7136/api/vevo/reset-password", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId,
                email,
                newPassword,
                adminPassword,
            }),
        });

        if (res.ok) {
            alert("Jelszó frissítve!");
            setEmail('');
            setSelectedUserId(null);
        } else {
            const errorText = await res.text();
            alert("Hiba: " + errorText);
        }
    };

    const handleCancelUpdate = () => {
        setSelectedUserId(null);
        setEmail('');
    };

    return (
        <div className="admin-users-container">
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

            {/* Táblázat, amely tartalmazza az összes felhasználót */}
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
                                {selectedUserId !== u.id && (
                                    <button className="ProductEdit" onClick={() => {
                                        setSelectedUserId(u.id);
                                        setEmail(u.email);
                                    }}>
                                        Módosítás
                                    </button>
                                )}
                                <button className="ProductDelete" onClick={() => handleDelete(u.id)}>
                                    Törlés
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Ha a felhasználó kiválasztásra került, akkor megjelenítjük a jelszó módosító formot */}
            {selectedUserId && (
                <UserUpdate
                    userId={selectedUserId}
                    email={email}
                    onSubmit={handlePasswordReset}
                    onCancel={handleCancelUpdate}
                />
            )}

        </div>
    );
};

export default AdminUsers;
