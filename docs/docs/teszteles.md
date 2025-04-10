---
id: teszteles
title: Tesztelés
sidebar_label: Tesztelés
---

# Tesztelés

A fejlesztési folyamat fontos része volt a rendszer **átfogó tesztelése**, amely több szinten történt annak érdekében, hogy a webalkalmazás minden funkciója megbízhatóan működjön, és biztonságosan használható legyen.

---

## ✅ Funkcionális tesztelés

- Ellenőriztük, hogy az összes alapvető funkció – **regisztráció**, **bejelentkezés**, **termékek megjelenítése**, **kosárkezelés**, **rendelés leadása** – megfelelően működik.
- Hibakezelés tesztelése:
  - Hibás jelszó vagy nem létező email esetén megfelelő visszajelzést ad a rendszer.
  - Hiányzó adatok esetén a felhasználó figyelmeztetést kap.

---

## 📱 Reszponzív tesztelés

- Különböző eszközökön történt a tesztelés:
  - **Asztali számítógép**
  - **Tablet**
  - **Mobiltelefon**
- Ellenőriztük:
  - A navigáció működését különböző képernyőméreteken.
  - A tartalmak, gombok, képek arányos és átlátható megjelenését.
  - A hamburger menü helyes működését kis kijelzőn.

---

## 🧪 Terhelési tesztelés

- Vizsgáltuk, hogyan viselkedik az alkalmazás, ha egyszerre több felhasználó próbál regisztrálni vagy rendelni.
- Teszteltük a **rendelési folyamatot** párhuzamos felhasználások mellett.
- Megfigyeltük az adatbázis válaszidejét és a rendszer stabilitását nagyobb terhelés alatt.

---

## 🔐 Biztonsági tesztelés

- A jelszavak titkosított tárolása tesztelve lett – nem kerülnek nyílt szövegként az adatbázisba.
- SQL injekció elleni védelem:
  - Kipróbáltunk olyan lekérdezéseket, amelyek manipulálni próbálták az adatbázist – ezek hatástalanok maradtak.
- Bejelentkezési jogosultságok:
  - Az admin oldal kizárólag bejelentkezett admin felhasználó számára érhető el.
  - A felhasználói fiókadatok csak hitelesítés után módosíthatók.

---

A tesztelések összességében biztosítják, hogy a **Valai Pékség** alkalmazás **megbízható, biztonságos és felhasználóbarát** módon működjön minden platformon.
