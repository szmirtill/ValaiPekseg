import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/AdminUsers.css";
import UserUpdate from "../components/userUpdate"; // Importáld a UserUpdate komponenst
import DeleteUserModal from "../components/DeleteUserModal"; // Importáld a DeleteUserModal komponenst

const AdminUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUserId2, setSelectedUserId2] = useState(null);
    const [email, setEmail] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState(''); // Hozzáadtunk egy állapotot a sikerüzenethez
    const [errorMessage, setErrorMessage] = useState("")

    // API hívás felhasználók lekérése
    useEffect(() => {
        fetch("https://localhost:7136/api/vevo")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data); // Ha van adat, töltse be a 'users' tömbbe
            })
            .catch((err) => console.error("Hiba a felhasználók lekérdezésekor:", err));
    }, []);

    // Törlés gomb kattintás
    const handleDelete = (id, email) => {
        setSelectedUserId2(id);  // Kiválasztja a felhasználót a törléshez
        setEmail(email);         // Beállítja a felhasználó email címét
        setIsDeleteModalOpen(true);  // Törlés megerősítő modális ablak megjelenítése
    };

    // Törlés megerősítése
    const handleConfirmDelete = async () => {
        const res = await fetch(`https://localhost:7136/api/vevo/${selectedUserId2}`, {
            method: "DELETE",
        });

        if (res.ok) {
            setUsers(users.filter((u) => u.id !== selectedUserId2)); // Frissíti a táblázatot törlés után
        } else {
            setErrorMessage("Nem sikerült törölni a felhasználót!"); // Beállítjuk a hiba üzenetet
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            
        }

        setIsDeleteModalOpen(false); // Bezárja a modált
    };

    // Törlés lemondása
    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false); // Bezárja a modált anélkül, hogy törölné
        setSelectedUserId2(null);     // Reseteli a kiválasztott felhasználót
    };

    // Jelszó módosítása
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
            setSuccessMessage("Jelszó frissítve!"); // Beállítjuk a sikeres üzenetet
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

            setEmail('');
            setSelectedUserId(null);
        } else {
            const errorText = await res.text();
            setErrorMessage("Hiba történt a jelszó frissítésekor!"); // Beállítjuk a hiba üzenetet
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            
        }
    };

    // Módosítás lemondása
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
            {/* Hiba üzenet */}
            {errorMessage && (
                <div className="error-message">
                    {errorMessage}
                </div>
            )}
            {/* Sikeres módosítás üzenete */}
            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}

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
                                <button className="ProductDelete" onClick={() => handleDelete(u.id, u.email)}>
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

            {/* Törlés megerősítő modál */}
            <DeleteUserModal
                isOpen={isDeleteModalOpen}
                onClose={handleCancelDelete}
                onDelete={handleConfirmDelete}
                userEmail={email}
            />
        </div>
    );
};

export default AdminUsers;
