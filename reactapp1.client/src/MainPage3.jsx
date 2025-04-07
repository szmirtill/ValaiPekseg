// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import LoginRequiredModal from './components/LoginRequiredModal';
import './Style/MainPage3.css';

function MainPage3() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showLoginRequiredModal, setShowLoginRequiredModal] = useState(false);

    const categories = [
        { id: 1, name: "Helyben Sütött" },
        { id: 2, name: "Pogácsa" },
        { id: 3, name: "Kalács" },
        { id: 4, name: "Napi Friss" },
        { id: 5, name: "Péksütemények" },
        { id: 6, name: "Kiflik és Zsemlék" },
        { id: 7, name: "Szendvicsalap" },
        { id: 8, name: "Kenyerek" }
    ];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        let url = "https://localhost:7136/api/termekek";
        if (selectedCategory) {
            url += `?kategoriaId=${selectedCategory}`;
        }

        fetch(url)
            .then((response) => {
                if (!response.ok) throw new Error('Hiba történt a termékek betöltésekor.');
                return response.json();
            })
            .then((data) => setProducts(data))
            .catch((error) => console.error('Hiba:', error));
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleFilter = () => {
        fetchProducts();
    };

    const addToCart = () => {
        setShowLoginRequiredModal(true);
    };

    return (
        <div className="mainpage3-container">
            {/* ✅ Tökéletesen elrendezett navbar */}
            <header className="header">
                <nav className="navbar">
                    <div className="navbar-left">
                        <span className="logo">Valai Pékség</span>
                    </div>
                    <div className="navbar-center">
                        <a href="/pekseg">Főoldal</a>
                        <a href="/termekek">Termékek</a>
                    </div>
                    <div className="navbar-right">
                        <button className="nav-button" onClick={("/mainpage")}>Belépés</button>
                        <button className="nav-button" onClick={("/admin/login")  }>Admin</button>
                    </div>
                </nav>
            </header>

            <div className="main-layout">
                <aside className="sidebar">
                    <h2>Kategóriák</h2>
                    <ul>
                        {categories.map((category) => (
                            <li key={category.id}>
                                <input
                                    type="radio"
                                    name="category"
                                    checked={selectedCategory === category.id}
                                    onChange={() => handleCategoryChange(category.id)}
                                />
                                {category.name}
                            </li>
                        ))}
                    </ul>
                    <button className="filter-button" onClick={handleFilter}>Szűrés</button>
                </aside>

                <div className="product-list">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="product-card">
                                {product.kep && (
                                    <img
                                        src={`data:image/jpeg;base64,${product.kep}`}
                                        alt={product.nev}
                                        className="product-image"
                                    />
                                )}
                                <h3>{product.nev}</h3>
                                <p>{product.ar} Ft</p>
                                <button className="buy-button disabled" onClick={addToCart}>Kosárba</button>
                            </div>
                        ))
                    ) : (
                        <p>Nincs találat.</p>
                    )}
                </div>
            </div>

            <LoginRequiredModal
                isOpen={showLoginRequiredModal}
                onClose={() => setShowLoginRequiredModal(false)}
            />
        </div>
    );
}

export default MainPage3;
