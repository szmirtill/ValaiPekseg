---
title: Frontend
sidebar_position: 4
---

# 🎨 Frontend

A Valai Pékség frontendje **React** keretrendszerre épül, modern felépítésű, moduláris komponensekkel.  
A cél egy **letisztult, felhasználóbarát és mobilbarát** felület létrehozása volt, amely a vásárló és az adminisztrátor számára is könnyen kezelhető.

---

## ⚛️ Technológiai alapok

- **React** – komponensalapú felépítés
- **CSS modulok** – egyedi stílus minden komponenshez
- **React Router** – útvonalak kezelése (pl. /login, /main, /admin)
- **Fetch API / Axios** – kommunikáció a backenddel
- **LocalStorage** – bejelentkezési adatok és kosár ideiglenes tárolása

---

## 🧩 Főbb komponensek

### 🔐 Login.jsx / Registration.jsx
- Bejelentkezés és regisztráció felület
- Űrlapkezelés, validáció, hibaüzenetek
- Token vagy session azonosítás LocalStorage segítségével

### 🏠 MainPage.jsx
- Főoldal bejelentkezés után
- Termékek listázása, szűrés, vásárlás gomb
- Kategória alapú szűrés

### 🛒 Cart.jsx
- Kosár megjelenítése
- Mennyiség módosítás, termék eltávolítás
- Rendelés leadása (POST a backendre)

### 👤 EditProfile.jsx
- Felhasználói fiók módosítása
- Email és jelszó frissítése biztonsági ellenőrzéssel

### 🛍️ Admin oldal komponensek
- **AdminDashboard.jsx**: statisztikák, összesített adatok
- **AdminProducts.jsx**: termékek listázása, ár szerkesztése, törlés
- **AdminOrders.jsx**: rendelések kezelése, állapotváltás

---

## 💡 Design szempontok

- **Letisztult színvilág**: világos, barátságos dizájn
- **Egységes elrendezés**: kártyás termékmegjelenítés
- **Könnyű navigáció**: sidebar, menük, gombok
- **Animációk**: hover effektek, interakciók visszajelzései

---

## 📱 Reszponzivitás

A frontend teljes mértékben **mobilbarát**, minden komponens rugalmasan igazodik a kijelző méretéhez.

### Megoldások:
- **CSS Grid & Flexbox**: dinamikus elrendezés
- **Media Query-k**: egyedi stílus mobil nézethez
- **Hamburger menü**: szűk képernyőkön automatikus átváltás

---

## 🧪 Tesztelés

A frontend tesztelését manuálisan végeztük:

- Böngésző kompatibilitás (Chrome, Edge)
- Különböző képernyőméreteken való viselkedés
- Navigációs hibák és vizuális elcsúszások ellenőrzése

---

A frontend célja, hogy egyszerre legyen **esztétikus, intuitív és funkcionális**, támogatva mind a felhasználók, mind az adminok munkáját.
