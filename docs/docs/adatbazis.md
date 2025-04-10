---
title: Adatbázis
sidebar_position: 3
---

# 🗄️ Adatbázis

Az alkalmazás adatkezeléséhez **MySQL-alapú adatbázist** használtunk. A backend oldalon az **Entity Framework Core** ORM segítségével kezeltük a táblákat és kapcsolatokat.

## 🔧 Adatbázis jellemzői

- **ORM**: Entity Framework Core
- **Kapcsolat**: ASP.NET API és MySQL között
- **Kezelés**: Visual Studio 2022 és phpMyAdmin
- **Biztonság**: Jelszó titkosítás, jogosultsági szintek

---

## 📋 Főbb táblák és mezők

### 🔑 `adminok`
- `id`: egyedi azonosító (PRIMARY KEY)
- `felhasznalonev`: egyedi (UNIQUE)
- `jelszo`

### 📦 `kategoriak`
- `id`: egyedi azonosító
- `nev`: egyedi kategórianév (UNIQUE)

### 🍞 `termekek`
- `id`: termék azonosító
- `nev`, `leiras`, `ar`
- `kategoria_id`: idegen kulcs (`kategoriak.id`)
- `kep_url`: kép blobként vagy URL-ként

### 🧾 `rendelesek`
- `id`: rendelés azonosító
- `vevo_id`: idegen kulcs (`vevo.id`)
- `rendeles_datum`, `allapot`

### 📦 `keszlet`
- `id`: készlet azonosító
- `termek_neve`, `mennyiseg`, `ar`
- `kategoria_id`: idegen kulcs (`kategoriak.id`)

### 📦 `rendeles_tetelek`
- `id`: tétel azonosító
- `rendeles_id`: idegen kulcs (`rendelesek.id`)
- `termek_id`: idegen kulcs (`termekek.id`)
- `mennyiseg`, `osszeg`

### 👤 `vevo`
- `id`: vásárló azonosító
- `felhasznalonev`, `email`, `jelszo`, `regisztracio_datum`
- `felhasznalonev` és `email`: UNIQUE kulcs

---

## 🔗 Kapcsolatok és szabályok

### 🧩 Kategóriák – Termékek/Készlet

- A `kategoriak.id` idegen kulcsként szerepel a `termekek` és `keszlet` táblákban.
- Ha törlünk egy kategóriát, a kapcsolódó mezők **NULL** értéket kapnak (ON DELETE SET NULL).

### 👥 Vevők – Rendelések

- A `vevo.id` szerepel a `rendelesek.vevo_id` mezőben.
- Ha törlünk egy vevőt, a hozzá tartozó rendelések **automatikusan törlődnek** (ON DELETE CASCADE).

### 🧾 Rendelések – Tételek

- Egy rendeléshez több `rendeles_tetelek` sor tartozhat.
- Ha törlünk egy rendelést, a kapcsolódó tételek is törlődnek (ON DELETE CASCADE).

### 🥐 Tételek – Termékek

- A `termek_id` kapcsolatot hoz létre a `termekek` táblával.
- Termék törlés esetén a kapcsolódó tételek is törlődnek.

---

## 🧠 ER Adatmodell szemlélet

Az adatbázis relációi biztosítják, hogy az adatok konzisztensen és megbízhatóan kezelhetők legyenek.  
A **CASCADE** és **SET NULL** szabályok automatikusan fenntartják az adatintegritást.

> Ez az adatbázis-struktúra lehetővé teszi a **termékek**, **rendelések** és **felhasználók** gyors és hatékony nyomon követését.

