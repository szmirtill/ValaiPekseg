// src/admin/AdminProducts.jsx
import { useEffect, useState } from "react";
import "../Style/AdminProducts.css";

const AdminProducts = () => {
    const [termekek, setTermekek] = useState([]);
    const [ujArak, setUjArak] = useState({});

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
                alert("Nem sikerült törölni a terméket.");
            }
        } catch (_) {
            alert("Hiba történt.");
        }
    };

    const handleChange = (e, id) => {
        const value = e.target.value;
        setUjArak({ ...ujArak, [id]: value });
    };

    const handleUpdate = async (id) => {
        const ujAr = ujArak[id];

        if (!ujAr || isNaN(ujAr)) {
            alert("Adj meg érvényes árat.");
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
                alert("Ár sikeresen frissítve!");
            } else {
                alert("Nem sikerült frissíteni az árat.");
            }
        } catch (error) {
            alert("Hálózati hiba történt.");
        }
    };

    return (
        <div className="admin-products-container">
            <h2>Termékek kezelése</h2>
            <table>
                <thead>
                    <tr>
                        <th>Termék neve</th>
                        <th>Ár (Ft)</th>
                        <th>Kategória</th>
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
                                <input
                                    type="number"
                                    placeholder="Új ár"
                                    value={ujArak[termek.id] || ""}
                                    onChange={(e) => handleChange(e, termek.id)}
                                />
                                <button onClick={() => handleUpdate(termek.id)}>Módosítás</button>
                                <button onClick={() => handleDelete(termek.id)}>Törlés</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProducts;
