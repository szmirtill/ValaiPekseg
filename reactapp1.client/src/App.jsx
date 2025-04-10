// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Style/App.css';
import MainPage from './mainpage';
import Registration from './Registration';
import MainPage2 from "./MainPage2";
import Cart from "./Cart";
import Profile from "./Profile";
import Orders from "./Orders";
import About from "./About";
import Pekseg from "./pekseg";
import MainPage3 from "./MainPage3";
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';
import AdminUsers from './admin/AdminUsers';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Pekseg />} />
                    <Route path="/mainpage" element={<MainPage />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/mainpage2" element={<MainPage2 />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/pekseg" element={<Pekseg />} />
                    <Route path="/mainpage3" element={<MainPage3 />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/admin/users" element={<AdminUsers />} /> 
                </Routes>
            </div>
        </Router>
    );
}

export default App;
