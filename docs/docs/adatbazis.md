---
id: adatbazis
title: Adatbázis
sidebar_label: Adatbázis
---

# Adatbázis

Az alkalmazásunk adatkezeléséhez **MySQL-alapú adatbázist** használunk, amelyet az **ASP.NET backendben az Entity Framework Core ORM** és a **Visual Studio 2022** segítségével kezelünk. Fejlesztés során az adatbázist helyi MySQL szerveren futtattuk, míg az éles környezetben egy távoli adatbázis-kiszolgálóra kerül.

Az adatkapcsolatot és a lekérdezések végrehajtását az **ASP.NET Web API** biztosítja, amely a **React frontend** számára továbbítja az adatokat.

## Főbb jellemzők

- **Struktúra:** Táblák külön kezelik a felhasználókat, termékeket, rendelések adatait.
- **Kapcsolatok:** Optimalizált idegen kulcsokkal az adatintegritásért.
- **Kezelés:** Az Entity Framework Core ORM egyszerűsíti a migrációkat és lekérdezéseket.
- **Biztonság:** Titkosított adatok, jogosultsági szintek.
- **Hatékonyság:** Indexelés és optimalizált lekérdezések biztosítják a gyors válaszidőt.

---

## Táblák

### 1. Adminok

- Adatok: `id`, `felhasznalonev`, `jelszo`
- `id`: PRIMARY KEY
- `felhasznalonev`: UNIQUE

---

### 2. Kategóriák

- Adatok: `id`, `nev`
- `id`: egyedi azonosító
- `nev`: UNIQUE – nem lehet duplikált

---

### 3. Termékek

- Adatok: `id`, `nev`, `leiras`, `ar`, `kategoria_id`, `kep_url`
- `kategoria_id`: idegen kulcs a `kategoriak` táblára
- Kategória törlés esetén: `SET NULL`

---

### 4. Rendelések

- Adatok: `id`, `vevo_id`, `rendeles_datum`, `allapot`
- `vevo_id`: idegen kulcs a `vevo` táblára
- Törlés esetén: `ON DELETE CASCADE`

---

### 5. Készlet

- Adatok: `id`, `termek_nev`, `mennyiseg`, `ar`, `kategoria_id`
- `kategoria_id`: idegen kulcs → `SET NULL` kategória törlésnél

---

### 6. Rendelés tételek

- Adatok: `id`, `rendeles_id`, `termek_id`, `mennyiseg`, `osszeg`
- Kapcsolatok:
  - `rendeles_id` → `rendelesek`
  - `termek_id` → `termekek`
  - Mindkettő: `ON DELETE CASCADE`

---

### 7. Vevők

- Adatok: `id`, `felhasznalonev`, `email`, `jelszo`, `regisztracio_datum`
- `felhasznalonev`, `email`: UNIQUE

---

## ER Adatmodell és integritási szabályok

A kapcsolatok úgy lettek kialakítva, hogy az egyik táblában bekövetkező változások automatikusan tükröződnek a másikban. Például:

- **Kategóriák ↔ Termékek/Készlet:** kategória törlésekor a kapcsolódó sorok `NULL` értéket kapnak.
- **Vevők ↔ Rendelések:** vevő törlésekor a kapcsolódó rendelések is törlődnek (`CASCADE`).
- **Rendelések ↔ Tételek:** rendelés törlése esetén a tételek is törlődnek.
- **Tételek ↔ Termékek:** termék törlése esetén a kapcsolódó rendelés tételek törlődnek.

---

Ez az adatbázis-struktúra biztosítja az alkalmazás megbízható és hatékony működését: a **termékek**, **rendelések**, **készletek** nyomon követését, valamint a **felhasználói adatok biztonságos** és **konzisztens** kezelését.
