// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/MainPage2.css';
import QuantityModal from './components/QuantityModal';

function MainPage2() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            navigate('/');
        }

        fetchProducts();
    }, [navigate]);

    const fetchProducts = () => {
        let url = "https://localhost:7136/api/termekek";
        if (selectedCategory) {
            url += `?kategoriaId=${selectedCategory}`;
        }

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Hiba történt a termékek betöltésekor.');
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => console.error('Hiba:', error));
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleFilter = () => {
        fetchProducts();
    };

    const handleAddToCartClick = (termek) => {
        setSelectedProduct(termek);
        setShowModal(true);
    };

    const handleConfirmQuantity = (mennyiseg) => {
        if (isNaN(mennyiseg) || mennyiseg <= 0) {
            alert("Érvénytelen mennyiség!");
            return;
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === selectedProduct.id);

        if (existingItem) {
            const osszesMennyiseg = existingItem.mennyiseg + mennyiseg;
            if (osszesMennyiseg > 10) {
                alert("Ebből a termékből legfeljebb 10 darabot vásárolhatsz!");
                return;
            }
            existingItem.mennyiseg = osszesMennyiseg;
        } else {
            if (mennyiseg > 10) {
                alert("Ebből a termékből legfeljebb 10 darabot vásárolhatsz!");
                return;
            }
            cart.push({ ...selectedProduct, mennyiseg });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        setShowModal(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        alert("Sikeres kijelentkezés!");
        navigate("/");
    };

    return (
        <div className="mainpage2-container">
            <header className="header">
                <div className="navbar">
                    <div className="navbar-left2">
                        <span className="logo">Valai Pékség</span>
                    </div>

                    <div className="navbar-center2">
                        <a href="/pekseg">Főoldal</a>
                        <a href="/products">Termékek</a>
                    </div>

                    <div className="user-menu">
                        <button className="user-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            {username} ▼
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <a href="/cart">Kosár</a>
                                <a href="/orders">Rendeléseim</a>
                                <a href="/profile">Adatok módosítása</a>
                                <button className="logout-btn" onClick={handleLogout}>Kijelentkezés</button>
                            </div>
                        )}
                    </div>
                </div>
                
            </header>

            <div className="content">
               
                <div className="main-layout">
                    <aside className="sidebar">
                        <h2>Kategóriák</h2>
                        <ul>
                            {[{ id: 1, name: "Helyben Sütött" },
                            { id: 2, name: "Pogácsa" },
                            { id: 3, name: "Kalács" },
                            { id: 4, name: "Napi Friss" },
                            { id: 5, name: "Péksütemények" },
                            { id: 6, name: "Kiflik és Zsemlék" },
                            { id: 7, name: "Szendvicsalap" },
                            { id: 8, name: "Kenyerek" }].map((category) => (
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
                                    <button className="buy-button" onClick={() => handleAddToCartClick(product)}>Kosárba</button>
                                </div>
                            ))
                        ) : (
                            <p>Nincs találat.</p>
                        )}
                    </div>
                </div>
            </div>

            <QuantityModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmQuantity}
                product={selectedProduct}
            />
        </div>
    );
}

export default MainPage2;
