import React, { useEffect, useState } from 'react';
import LoginRequiredModal from './components/LoginRequiredModal'; // importáljuk a modalt
import './Style/MainPage3.css';

function MainPage3() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showLoginRequiredModal, setShowLoginRequiredModal] = useState(false); // új állapot a modalhoz

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
        // Ha nincs bejelentkezve a felhasználó, akkor megjelenik a modal
        setShowLoginRequiredModal(true);
    };

    return (
        <div className="mainpage3-container">
            <header className="header">
                <nav>
                    <ul>
                        <li><a href="/pekseg">Főoldal</a></li>
                        <li><a href="/about">Rólunk</a></li>
                        <li><a href="/mainpage">Bejelentkezés</a></li>
                        <li><a href="/registration">Regisztráció</a></li>
                    </ul>
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

            {/* A modal itt jelenik meg */}
            <LoginRequiredModal
                isOpen={showLoginRequiredModal}
                onClose={() => setShowLoginRequiredModal(false)} // Bezárja a modalt
            />
        </div>
    );
}

export default MainPage3;
