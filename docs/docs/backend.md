---
id: backend
title: Backend
sidebar_label: Backend
---

# Backend

Az alkalmazás backendje **ASP.NET Core Web API** technológiával készült a **Visual Studio 2022** fejlesztői környezetben. A szerveroldali logika biztosítja az adatbázis-kezelést, a felhasználói hitelesítést, a rendelések feldolgozását és az adminisztrációs műveleteket.

A backend az **Entity Framework Core ORM** segítségével kommunikál a **MySQL** adatbázissal, így az adatkezelés hatékony, biztonságos és jól karbantartható.

---

## Főbb jellemzők

- **REST API architektúra** – minden funkció önálló végponton keresztül érhető el.
- **Biztonság** – titkosított jelszavak és jogosultság-alapú elérés.
- **Modularitás** – külön controllerek minden funkcióhoz.
- **ORM** – az adatbázis-kezelést az Entity Framework Core biztosítja.
- **Képtárolás** – a termékképek BLOB-ként tárolódnak az adatbázisban.

---

## Fő komponensek és végpontok

### 🔐 AuthController

- **Funkció:** Felhasználók bejelentkezése  
- **Végpont:** `POST /api/Auth/login`  
- **Bemenet:** email, jelszó  
- **Működés:**
  - Ellenőrzi az e-mail és jelszó egyezését.
  - Siker esetén visszaad egy sikerüzenetet vagy tokent.

---

### 👤 AccountController

- **Funkció:** Regisztráció és felhasználói profil módosítása  
- **Végpontok:**
  - `POST /api/Account/register` – új felhasználó
  - `PUT /api/Account/update-profile` – email/jelszó módosítás
- **Működés:**
  - Regisztrációnál ellenőrzi az email és felhasználónév egyediségét.
  - Profilmódosításnál hitelesíti a jelszót.

---

### 🛒 VevoController (Admin)

- **Funkció:** Felhasználók admin általi kezelése  
- **Végpontok:**
  - `GET /api/Vevo` – felhasználók listázása
  - `PUT /api/Vevo/{id}` – módosítás
  - `DELETE /api/Vevo/{id}` – törlés

---

### 🥖 TermekController

- **Funkció:** Termékek kezelése  
- **Végpontok:**
  - `GET /api/Termek` – összes termék
  - `PUT /api/Termek/{id}` – ár módosítása
  - `DELETE /api/Termek/{id}` – törlés
- **Képek kezelése:**
  - BLOB formátumban
  - `application/octet-stream` MIME típusban érkeznek a frontendhez

---

### 📦 RendelesController

- **Funkció:** Rendelések kezelése  
- **Végpontok:**
  - `POST /api/Rendeles` – rendelés létrehozása
  - `GET /api/Rendeles/user/{id}` – adott felhasználó rendelései
  - `PUT /api/Rendeles/status/{id}` – rendelés állapotának frissítése
- **Állapotkezelés:**
  - Alapértelmezett: **Feldolgozás alatt**
  - Ha **Kiszállítva** vagy **Teljesítve**, automatikusan törlésre kerül (beleértve a rendelés tételeit is)

---

### 📊 AdminDashboardController

- **Funkció:** Admin statisztikák szolgáltatása
- **Végpont:** `GET /api/AdminDashboard/statistics`
- **Kimenet:** Grafikonokhoz szükséges adatok – eladások, kategóriaeloszlás stb.

---

A backend így biztosítja a webalkalmazás minden szerveroldali funkcióját, és lehetővé teszi az adatok hatékony, biztonságos kezelését mind a felhasználók, mind az adminisztrátorok számára.
