// src/admin/AdminProducts.jsx
import { useEffect, useState } from "react";
import AdminProductUpdate from "../components/AdminProductUpdate";
import "../Style/AdminProducts.css";

const AdminProducts = () => {
    const [termekek, setTermekek] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

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

    const openModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
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
                                <button onClick={() => openModal(termek)}>Új ár</button>
                                <button onClick={() => handleDelete(termek.id)}>Törlés</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal megjelenítése */}
            {showModal && (
                <AdminProductUpdate product={selectedProduct} onClose={closeModal} />
            )}
        </div>
    );
};

export default AdminProducts;
