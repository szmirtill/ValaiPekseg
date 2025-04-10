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

## 💻 Frontend tesztelés

A frontend felület működését manuális és automatizált teszteléssel is ellenőriztük. Az automatizált teszteléshez **Selenium** keretrendszert használtunk, amely lehetővé tette a valós felhasználói interakciók szimulálását.

### Automatizált tesztelés (Selenium)
- A Selenium segítségével végigteszteltük a legfontosabb felhasználói folyamatokat: **regisztráció**, **bejelentkezés**, **termék böngészés**, **vásárlás**, valamint **admin oldali műveletek**.
- Teszteltük az űrlapmezők működését, a gombok reakcióját, a navigációt és a visszajelző üzeneteket.
- Ellenőriztük, hogy helytelen bejelentkezés esetén hibaüzenet jelenik meg, sikeres bejelentkezés után pedig a főoldalra kerül a felhasználó.

### Reszponzív tesztelés
- A reszponzivitást manuálisan teszteltük különböző eszközökön és képernyőméreteken:
  - **Asztali gép**
  - **Tablet**
  - **Mobil**
- Figyeltük a navigációs menük, termékkártyák, űrlapok és visszajelző elemek mobilos megjelenését.

### Felhasználói tesztelés
- A rendszert valós felhasználók is kipróbálták, visszajelzéseik alapján finomítottuk a felületet és hibakezelést.
- Kiemelt figyelmet fordítottunk a használhatóságra és az intuitív működésre.

<img src="/img/selenium.png" alt="Selenium teszt" />

---

## ⚙️ Backend tesztelés

A backend oldal stabilitását és megbízhatóságát **NUnit** alapú egységtesztekkel biztosítottuk.

### Automatizált tesztelés (NUnit)
- Az egységtesztek az **NUnit** keretrendszert használják.
- A `Microsoft.EntityFrameworkCore.InMemory` segítségével memóriabeli adatbázist használtunk, így a tesztek gyorsan, környezetfüggetlenül futottak.

### Tesztelt funkciók
- **Felhasználói regisztráció és bejelentkezés**
  - Sikeres regisztráció esetén megfelelő visszajelzést kaptunk.
  - Hibás vagy hiányos adatok esetén `BadRequest` válasz érkezik.
  - Duplikált e-mail vagy felhasználónév esetén a rendszer figyelmeztet.
- **Rendelések kezelése**
  - Helyes adatokkal történő rendelés mentése sikeres.
  - Rendelés állapotának módosítása megfelelően működik.
- **Adatmodell validáció**
  - Kötelező mezők hiánya esetén hibaüzenet keletkezik.
  - Érvénytelen e-mail vagy túl rövid jelszó esetén elutasítás történik.
- **Kivételkezelés**
  - Váratlan bemenetek (pl. null érték, hibás ID) esetén is megfelelő hibatünet és válasz történik.

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

<img src="/img/nunit.png" alt="nUnit teszt" />
---

A tesztelések összességében biztosítják, hogy a **Valai Pékség** alkalmazás **megbízható, biztonságos és felhasználóbarát** módon működjön minden platformon.
