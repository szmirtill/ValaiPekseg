// src/admin/AdminProductUpdate.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/AdminProductUpdate.css";

const AdminProductUpdate = ({ product, onClose }) => {
    const [newPrice, setNewPrice] = useState("");
    const navigate = useNavigate();

    const handlePriceChange = (e) => {
        setNewPrice(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPrice || isNaN(newPrice)) {
            alert("Kérlek, adj meg érvényes árat!");
            return;
        }

        try {
            const response = await fetch(`https://localhost:7136/api/termekek/${product.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ar: parseFloat(newPrice) }),
            });

            if (response.ok) {
                alert("Ár frissítve!");
                onClose(); 
            } else {
                alert("Hiba történt az ár frissítésekor.");
            }
        } catch (error) {
            alert("Hálózati hiba történt.");
        }
    };

    return (
        <div className="product-update-modal">
            <div className="modal-content">
                <h3>Új ár megadása</h3>
                <p>{product.nev}</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="price">Új ár:</label>
                    <input
                        type="number"
                        id="price"
                        value={newPrice}
                        onChange={handlePriceChange}
                        required
                    />
                    <button type="submit">Frissítés</button>
                    <button type="button" onClick={onClose}>Mégse</button>
                </form>
            </div>
        </div>
    );
};

export default AdminProductUpdate;
