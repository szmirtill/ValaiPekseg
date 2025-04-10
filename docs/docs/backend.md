---
title: Backend
sidebar_position: 5
---

# 🧠 Backend

A Valai Pékség szerveroldali logikáját **ASP.NET Core Web API** segítségével valósítottuk meg.  
A backend biztosítja az adatbázis-kezelést, felhasználói hitelesítést, rendeléslogikát és admin funkciókat.

---

## ⚙️ Technológiai alapok

- **ASP.NET Core 7.0**
- **Entity Framework Core** – ORM az adatbázis kezeléshez
- **MySQL** – relációs adatbázis
- **C#** nyelv
- **RESTful API** – szabványos végpontok

---

## 🗂️ Főbb backend fájlok és feladatkörük

| Fájl                  | Szerep |
|-----------------------|--------|
| `Program.cs`          | API konfigurálása, adatbázis kapcsolat |
| `ApplicationDbContext.cs` | EF DbContext – táblák regisztrálása |
| `Models/*.cs`         | Adatmodellek (pl. Vevo, Termek, Rendeles stb.) |
| `Controllers/*.cs`    | Végpontok, adatműveletek logikája |
| `appsettings.json`    | Adatbázis kapcsolat és beállítások |

---

## 🔐 Hitelesítés és jogosultság

### `/api/Auth/login`
- Felhasználói bejelentkezés ellenőrzése
- Email + jelszó párosítás
- Siker esetén válasz: „Sikeres bejelentkezés!”

### `/api/Account/register`
- Regisztrációs végpont
- Új vevő mentése az adatbázisba

---

## 📦 Termékek kezelése

### `/api/Termekek`
- GET: Összes termék lekérdezése
- POST: Új termék feltöltése (admin)
- PUT: Termék árának módosítása
- DELETE: Termék törlése

---

## 🧾 Rendelések kezelése

### `/api/Rendeles`
- GET: Vevő rendeléseinek lekérése
- POST: Új rendelés létrehozása
- PUT: Rendelés állapotának módosítása
- DELETE: Rendelés törlése (admin vagy teljesített állapot után)

---

## 🧠 Controller osztályok

### `AuthController.cs`
- Bejelentkezés, jelszóellenőrzés
- Token nélküli hitelesítés (egyszerű login)

### `AccountController.cs`
- Felhasználók regisztrációja, módosítása

### `VevoController.cs`
- Felhasználói fiókok listázása, törlése, módosítása (admin)

### `TermekekController.cs`
- Termékek CRUD műveletei

### `RendelesController.cs`
- Rendelések kezelése, rendelésállapot váltás

---

## 🧪 Tesztelés

A backend API-t **Postman** segítségével teszteltük:

- Bejelentkezés teszt JSON küldéssel
- Új rendelés POST kéréssel
- Állapot módosítása PUT metódussal
- Hibakezelés ellenőrzése (pl. rossz email/jelszó)

---

A backend biztosítja az adatbiztonságot, a megbízható működést és az összes adat logikailag rendezett kezelését.
