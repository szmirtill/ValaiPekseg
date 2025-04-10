---
id: frontend
title: Frontend
sidebar_label: Frontend
---

# Frontend

Az alkalmazásunk felhasználói felülete a modern és reszponzív **React.js** keretrendszer segítségével készült. A React lehetővé teszi az újrafelhasználható komponensek kialakítását, a gyors renderelést és az egyszerű állapotkezelést. A fejlesztést a **Visual Studio Code** környezetben végeztük, külön `frontend` mappában. A React alkalmazás külön **Node.js** környezetben fut, és az **ASP.NET backenddel** kommunikál HTTP-kérések útján.

---

## Főbb jellemzők

- **Modularitás:** Minden funkció saját komponensben lett megvalósítva.
- **Navigáció:** A `react-router-dom` segítségével többoldalas SPA élményt biztosítunk.
- **Dizájn:** Saját CSS-alapú, reszponzív stílusokat alkalmaztunk.
- **Állapotkezelés:** `useState`, `useEffect` és `localStorage` a bejelentkezés és kosár kezeléséhez.
- **Képfeldolgozás:** `URL.createObjectURL()` segítségével jelenítjük meg a backendből kapott BLOB-képeket.

---

## Komponensek

### 1. Login

- Email és jelszó megadásával történik a bejelentkezés.
- Az adatok POST kérésként a `/api/Auth/login` végpontra kerülnek.
- Sikeres bejelentkezés után a felhasználót a főoldalra irányítjuk, és az adatait elmentjük a `localStorage`-ba.

---

### 2. Registration

- Új felhasználók regisztrációja (felhasználónév, email, jelszó).
- POST kérés a `/api/Account/register` végpontra.
- Sikeres regisztráció után átirányítás a bejelentkezési oldalra.

---

### 3. MainPage2

- A főoldalon az összes termék megjelenik.
- GET kérés tölti be az adatokat a backendből.
- A termékek kártyás elrendezésben jelennek meg: név, ár, kép, kategória.
- Kosárba helyezés: számmező (1–10 mennyiség).

---

### 4. Cart

- A kosárban a felhasználó módosíthatja a mennyiségeket.
- A „Rendelés leadása” POST kérést küld, amely menti az adatokat a `rendeles` és `rendeles_tetelek` táblákba.
- A rendelés állapota: **Feldolgozás alatt**.

---

### 5. EditProfile

- Felhasználói adatok módosítása (email, jelszó).
- Hitelesítés: email + jelenlegi jelszó.
- PUT kérés segítségével frissülnek az adatok.

---

### 6. AdminDashboard

- Admin statisztikai nézet.
- Kártyákon jelennek meg a legfontosabb mutatók.
- Recharts könyvtárat használunk a diagramokhoz.

---

### 7. AdminOrders

- Minden **Feldolgozás alatt** rendelés listázása.
- Állapot módosítható: „Kiszállítva” / „Teljesítve”.
- Módosítás után automatikusan törlődik az adatbázisból (backend kezeli).

---

### 8. AdminProducts

- Az összes termék listázása táblázatban.
- Ár módosítása PUT kéréssel.
- Termék keresés + törlés DELETE kéréssel.

> ⚠️ Az admin oldalak csak bejelentkezett admin számára érhetők el.

---

## Reszponzivitás és dizájn

- Mobil- és asztali kompatibilitás.
- Minden komponenshez külön CSS fájl (`Style/` mappában).
- Flexbox és Grid elrendezések.
- Hamburger menü mobil eszközökhöz.
- Termékek kártyás elrendezése automatikusan igazodik a kijelzőhöz.

---

## Felhasználói élmény és biztonság

- Adatok módosítása csak hitelesítés után.
- Kosárkezelés valós időben történik.
- Az admin felületen csak nem teljesített rendelések jelennek meg.
- BLOB képek biztonságosan betöltve a React komponensekbe.

---

Ez a frontend-struktúra biztosítja a **felhasználóbarát működést**, a **megbízható adatkezelést**, valamint a **professzionális adminisztrációs funkciókat**. A **moduláris React architektúra** lehetővé teszi a projekt jövőbeni bővítését és egyszerű karbantartását.
