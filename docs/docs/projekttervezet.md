---
id: projekttervezet
title: Projekttervezet
sidebar_label: Projekttervezet
---

# Projekttervezet

## Felhasználói felület (UI) tervezés

A felhasználói felület célja, hogy a látogatók számára egyszerű, mégis esztétikus és funkcionális élményt nyújtson. Az első benyomás kulcsfontosságú, ezért a főoldal színes, letisztult dizájnnal rendelkezik. Fontosnak tartottuk, hogy passzoljon a pékség témájához, de ne legyen zsúfolt, így **bézs-aranybarna árnyalatok** kerültek előtérbe.

### Fő elemek:
- 🥖 A pékség logója, amely az oldal vizuális azonosítója.
- ⭐ Felhasználói értékelések, hogy növeljék a bizalmat az új látogatókban.
- 📷 Termékfotók, amelyek a kínálat minőségét és változatosságát emelik ki.

---

## A webalkalmazás fő funkciói

- **Termékek böngészése és részletezése**  
  - Az érdeklődők megtekinthetik a termékek listáját képekkel és leírásokkal.  
  - A termékek nevére kattintva részletes információkat kapnak az adott áruról, például összetevőkről, árakról és elérhetőségről.

- **Kosár és rendelési folyamat**  
  - A kiválasztott termékek a kosárba kerülnek, ahol az árak automatikusan összeadódnak.  
  - A rendelési folyamat végig vezeti a vásárlókat a szállítási és fizetési információk megadásán.

- **Reszponzív navigáció**  
  - A navigációs sáv a reszponzív dizájnnak köszönhetően hamburger menüként jelenik meg kisebb eszközökön.


---

### Navigációs sáv

- **Főoldal** – Bemutató a Valai Pékségről
- **Bejelentkezés** – Opcionális böngészéshez, kötelező rendeléshez
- **Termékek** – A kínálat böngészése
- **Admin** – Adminfelület elérése

### Bejelentkezés után elérhető menüpontok:
- 🛒 **Kosár**
- 📜 **Rendeléseim**
- ⚙️ **Adatok módosítása**
- 🚪 **Kijelentkezés**

---

## Főoldal

A főoldalon láthatók a termékek képekkel, leírással. Kategóriaszűrés segíti a keresést a bal oldali sávban.

<img src="/img/fooldal.png" alt="Főoldal dizájn" />

---

## Regisztrációs felület

A felhasználó biztonságosan adhatja meg adatait, amelyek titkosítva kerülnek az adatbázisba.

### Bekért adatok:
- Felhasználónév
- Email cím
- Jelszó (kétszer, az egyezés ellenőrzésére)

### Jogosultság:
- Termékek megtekinthetők bejelentkezés nélkül
- **Rendeléshez kötelező a bejelentkezés**

<img src="/img/registration.png" alt="Regisztráció dizájn" />
---

## Bejelentkezés felület

### Megadandó adatok:
- Felhasználónév
- Jelszó

### Hibakezelés:
- Ismeretlen email: _„Ez az email cím még nem került regisztrálásra.”_
- Hibás jelszó: megfelelő hibaüzenet

### Sikeres bejelentkezés után:
- A felhasználó a főoldalra kerül
- A menüben megjelenik a „Kijelentkezés” opció

<img src="/img/login.png" alt="Bejelentkezés dizájn" />
---

## Termékek felület

A termékek oldalán kategóriákra bontva jelennek meg a termékek:

### Funkciók:
- **Kosárba gomb**: Minden termékhez tartozik, egységes dizájnnal.
- **Kategória szűrők**: Oldalsávban elérhetők (pl. „Pékáru”, „Kenyerek”).

A termékeket bárki megnézheti, de rendeléshez szükséges a bejelentkezés. Ha nem jelentkezett be, a rendszer figyelmezteti.

<img src="/img/termekek.png" alt="Termékek dizájn" />
---

## Kosár felület

A rendelési folyamat a kosárból indítható.

### Tartalom:
- **Rendelés összesítése**: Termékek ára, végösszeg.
- **Vásárlási adatok**:
  - Név
  - Szállítási cím

<img src="/img/rendeles.png" alt="Kosár dizájn" />

---

## Rendeléseim felület

Itt látható az összes eddigi megredelés.

### Tartalom:
- **Rendelés összesítése**: Az összes rendelés dátuma és állapota.

<img src="/img/rendeleseim.png" alt="Rendeléseim dizájn" />

---

## Adatok módosítása felület

Itt lehet módosítani a felhasználó adatait.

### Tartalom:
- Felhasználónév
- Új e-mail
- Új jelszó és annak megerősítése


<img src="/img/profilmodositas.png" alt="Adatok módosítása dizájn" />

---

## Admin felület


### Login:
- Admin felhasználónév
- Admin Jelszó

<img src="/img/adminlogin.png" alt="Admin login dizájn" />

---

## Admin felület


### Login:
- Admin felhasználónév
- Admin Jelszó

<img src="/img/adminlogin.png" alt="Admin login dizájn" />

### Vezérlőpult:
A jövőben itt lehet látni a statisztikákat

<img src="/img/adminvezerlo.png" alt="Admin vezérlőpult dizájn" />

### Termékek kezelése:
Itt lehet az árakat módosítani és a termékeket törölni. Amennyiben nem adunk meg új árat, és úgy akarunk módosítani kapunk egy figyelmeztető üzenetet.

<img src="/img/termekkezeles.png" alt="Termékek kezelése dizájn" />

### Felhasználók kezelése:
Itt lehet új jelszót létrehozni a felhasználók számára, és itt lehet törölni adott felhasználókat.

<img src="/img/felhasznalokezeles.png" alt="Felhasználók kezelése dizájn" />

---
Ez a projektterv biztosítja, hogy a Valai Pékség online jelenléte modern, biztonságos és felhasználóbarát legyen.
