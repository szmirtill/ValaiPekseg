// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminProductUpdate from "../components/AdminProductUpdate"; // Importáljuk az új modális komponenst
import "../Style/AdminProducts.css";  // A termékek táblázat stílusa

const AdminProducts = () => {
    const [termekek, setTermekek] = useState([]);
    const [ujArak, setUjArak] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");// Új állapot a siker üzenethez
    const [isModalOpen, setIsModalOpen] = useState(false); // Új állapot a modális kezelésére
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://localhost:7136/api/termekek")
            .then((res) => res.json())
            .then((data) => setTermekek(data))
            .catch((err) => console.error("Hiba a termékek lekérdezésekor:", err));
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Biztosan törlöd ezt a terméket?")) return;

        try {
            const res = await fetch(`https://localhost:7136/api/termekek/${id}`, {
                method: "DELETE",
            });

            if (res.status === 204) {
                setTermekek(termekek.filter((t) => t.id !== id));
            } else {
                setErrorMessage("Nem sikerült törölni a terméket!"); // Beállítjuk a hiba üzenetet
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
                
            }
        } catch (_) {
            setErrorMessage("Hiba történt!"); // Beállítjuk a hiba üzenetet
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    const handleChange = (e, id) => {
        const value = e.target.value;
        setUjArak({ ...ujArak, [id]: value });
    };

    const handleUpdate = async (id) => {
        const ujAr = ujArak[id];

        if (!ujAr || isNaN(ujAr)) {
            setErrorMessage("Adj meg egy új árat!"); // Beállítjuk a hiba üzenetet
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        try {
            const res = await fetch(`https://localhost:7136/api/termekek/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parseFloat(ujAr)),
            });

            if (res.ok) {
                const updatedTermekek = termekek.map((t) =>
                    t.id === id ? { ...t, ar: parseFloat(ujAr) } : t
                );
                setTermekek(updatedTermekek);
                setUjArak((prev) => ({ ...prev, [id]: "" }));
                setSuccessMessage("Ár sikeresen frissítve!"); // Beállítjuk a siker üzenetet
                setIsModalOpen(true); // Megnyitjuk a modális ablakot
            } else {
                setErrorMessage("Nem sikerült frissíteni az árat!"); // Beállítjuk a hiba üzenetet
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
               
            }
        } catch (error) {
            setErrorMessage("Hálózati hiba történt!"); // Beállítjuk a hiba üzenetet
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Bezárjuk a modális ablakot
    };

    return (
        <div className="admin-dashboard">
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
                        <button className="nav-button" onClick={() => navigate("/pekseg")}>Kijelentkezés</button>
                    </div>
                </nav>
            </header>

            {/* ✅ Tartalom rész */}
            <main className="admin-products-container">
                <h2>Termékek kezelése</h2>
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
                <table>
                    <thead>
                        <tr>
                            <th>Termék neve</th>
                            <th>Ár (Ft)</th>
                            <th>Kategória</th>
                            <th>Új ár</th>
                            <th>Műveletek</th>
                        </tr>
                    </thead>
                    <tbody>
                        {termekek.map((termek) => (
                            <tr key={termek.id}>
                                <td>{termek.nev}</td>
                                <td>{termek.ar} Ft</td>
                                <td>{termek.kategoriaNev}</td>
                                <td>
                                    <input className="newPrice"
                                        type="number"
                                        placeholder="Új ár"
                                        value={ujArak[termek.id] || ""}
                                        onChange={(e) => handleChange(e, termek.id)}
                                    />
                                </td>
                                <td>
                                    <button className="ProductEdit" onClick={() => handleUpdate(termek.id)}>Módosítás</button>
                                    <button className="ProductDelete" onClick={() => handleDelete(termek.id)}>Törlés</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Siker üzenet modális ablak */}
                {isModalOpen && (
                    <AdminProductUpdate message={successMessage} onClose={handleCloseModal} />
                )}
            </main>
        </div>
    );
};

export default AdminProducts;
