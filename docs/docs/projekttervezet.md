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

## Webalkalmazás fő funkciói

### Termékek böngészése és részletezése:
- A látogatók képekkel és leírásokkal böngészhetik a termékeket.
- A termék nevére kattintva részletes információk jelennek meg (összetevők, árak, elérhetőség).

### Kosár és rendelési folyamat:
- A kiválasztott termékek a kosárba kerülnek, az árak automatikusan összeadódnak.
- A rendelés során a felhasználó végigvezetésre kerül a szállítási és fizetési adatok megadásán.

### Reszponzív navigáció:
- A menüsáv kisebb eszközökön **hamburger menüként** jelenik meg.

---

## Navigációs sáv tartalma

- **Főoldal** – Bemutató a Valai Pékségről.
- **Bejelentkezés** – Rendeléshez szükséges, de a böngészéshez opcionális.
- **Termékek** – A kínálat böngészése kategóriák szerint.
- **Admin** – Bejelentkezés az adminfelületre.

### Bejelentkezés után megjelenő menü:
- 🛒 **Kosár**
- 📜 **Rendeléseim**
- ⚙️ **Adatok módosítása**
- 🚪 **Kijelentkezés**

---

## Főoldal

A főoldalon a termékek listája látható, képekkel kiegészítve. A termékekre kattintva részletes információk jelennek meg. A bal oldali sávban **kategóriaszűrés** segíti a gyors keresést.

---

## Regisztrációs felület

A regisztráció során a felhasználó megadhatja adatait, amelyeket a rendszer biztonságosan, titkosítással tárol.

### Bekért adatok:
- Felhasználónév
- Email cím
- Jelszó (kétszer, az egyezés ellenőrzéséhez)

### Jogosultság:
- A termékek bejelentkezés nélkül is böngészhetők.
- **Rendeléshez bejelentkezés szükséges** – ellenkező esetben hibaüzenet jelenik meg.

---

## Bejelentkezés felület

### Megadandó adatok:
- Felhasználónév
- Jelszó

### Hibakezelés:
- Ismeretlen email esetén: „Ez az email cím még nem került regisztrálásra.”
- Rossz jelszó esetén külön hibaüzenet.

### Sikeres bejelentkezés után:
- A felhasználó a főoldalra kerül.
- A menüben a „Bejelentkezés” és „Regisztráció” helyett „Kijelentkezés” látható.

---

## Termékek felület

A termékek oldalán kategóriákra bontva jelennek meg a termékek:

### Funkciók:
- **Kosárba gomb**: Minden termékhez tartozik, egységes dizájnnal.
- **Kategória szűrők**: Oldalsávban elérhetők (pl. „Pékáru”, „Kenyerek”).

A termékeket bárki megnézheti, de rendeléshez szükséges a bejelentkezés. Ha nem jelentkezett be, a rendszer figyelmezteti.

---

## Rendelés felület

A rendelési folyamat a kosárból indítható.

### Tartalom:
- **Rendelés összesítése**: Termékek ára, szállítási költség, végösszeg.
- **Vásárlási adatok**:
  - Név
  - Szállítási cím
  - Telefonszám

---

Ez a projektterv biztosítja, hogy a Valai Pékség online jelenléte modern, biztonságos és felhasználóbarát legyen.
