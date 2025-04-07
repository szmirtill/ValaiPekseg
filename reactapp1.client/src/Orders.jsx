// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/Orders.css';

function Orders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            navigate("/");
            return;
        }

        fetch(`https://localhost:7136/api/rendeles/history/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Nincsenek korábbi rendeléseid.");
                }
                return response.json();
            })
            .then(data => {
                setOrders(data || []);
                setLoading(false);
            })
            .catch(error => {
                console.error("Hiba a rendelési előzmények betöltésekor:", error);
                setError(error.message);
                setLoading(false);
            });
    }, [navigate]);

    const handleBack = () => {
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    return (
        <div className="orders-container">
            <h1>Rendelési előzmények</h1>
            {loading ? (
                <p>Betöltés...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : orders.length > 0 ? (
                <div className="order-list">
                    {orders.map(order => (
                        <div key={order.Id} className="order-card">
                            <p><strong>Dátum:</strong> {new Date(order.rendeles_datum).toLocaleDateString()}</p>
                            <p><strong>Állapot:</strong> {order.allapot}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nincsenek rendeléseid.</p>
            )}
            <button onClick={handleBack} className="back-button">← Vissza</button>
        </div>
    );
}

export default Orders;
