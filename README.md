## ✨ Funkciók

### Felhasználók számára

- Böngészés kategorizált termékek között
- Regisztráció, bejelentkezés, saját profil kezelése
- Kosár funkció és online rendelés leadása
- Korábbi rendelések megtekintése

### Adminisztrátorok számára

- Rendelések nyomon követése, státusz frissítése
- Termékek kezelése: hozzáadás, szerkesztés, törlés
- Felhasználók kezelése
- Alapvető statisztikai adatok megtekintése

---

## 🛠️ Technológiák

- **Frontend**: React.js, TypeScript, Axios
- **Backend**: ASP.NET Core Web API
- **ORM**: Entity Framework Core
- **Adatbázis**: MySQL
- **Fejlesztőeszközök**: Visual Studio 2022, Visual Studio Code, XAMPP, GitHub
- **Tervek**: TeleportHQ

---

## 🚀 Telepítési útmutató

A docker segítségével indul el a MySQL szerver, a Backend, és a Frontend környezet! 
A példa adatokat egy adatbáziskezelővel manuálisan kell feltölteni(pl Beepeeker studio).

### 1. A projekt klónozása
```bash
git clone https://github.com/szmirtill/ValaiPekseg
```

### 2. Adatbázis beállítása

- Indítsa el az adatbázis-szervert (például XAMPP segítségével, az Apache-t és a MySqlt is).
- A MySqlt mellett nyomjon rá az Admin gombra
- Hozza létre a szükséges adatbázist. (pekseg néven)
- Importálja be a megadott pekseg.sql file-t.

### 3. Backend indítása

- Nyissa meg a megoldást **Visual Studio 2022** alkalmazásban.
- Indítsa el a szervert a Visual Studio „Start” gombjával.

---

## 📲 Használat

### Vásárlók számára

1. Regisztráljon az oldalon felhasználónév, e-mail cím és jelszó megadásával.
2. Jelentkezzen be a rendszerbe.
3. Válogasson a termékek között, majd helyezze azokat a kosarába.
4. Adja meg szállítási adatait, majd küldje el rendelését.
5. Kövesse nyomon korábbi rendeléseit a „**Rendeléseim**” menüpont alatt.

### Adminisztrátorok számára

1. Jelentkezzen be az adminisztrációs felületre. (Felhasználónév: Tulaj; Jelszó: Tulaj)
2. Kezelje a Felhasználókat, törölje azokat.
3. Módosítsa a termékek árait, törölje azokat.

---

## 🗃️ Adatbázis szerkezete

A rendszer az alábbi táblákból épül fel:

- **Felhasználók (Vevo)**: `id`, `nev`, `email`, `jelszó`, `regisztracio_datuma`
- **Termékek**: `id`, `nev`, `leiras`, `ar`, `kategoria`, `kep`
- **Kategóriák**: termékcsoportok logikai elválasztására
- **Rendelések**: `id`, `vevo_id`, `statusz`, `datum`
- **Rendelés tételek**: kapcsoló tábla rendelés és termék között
- **Adminisztrátorok**: belépési jogosultsággal rendelkező felhasználók
- **Készlet információk**: aktuális elérhetőség és mennyiség

> A rendszer CASCADE és SET NULL típusú integritási szabályokat alkalmaz az adatkonzisztencia biztosítása érdekében.

---

## ✅ Tesztelés

A rendszer megbízhatóságát többféle tesztelési módszer garantálja:

- **Frontend**:
  - Automatizált funkcionális tesztek a Selenium keretrendszerrel
  - Manuális reszponzív tesztelés különböző eszközökön
- **Backend**:
  - Egységtesztek az NUnit keretrendszerrel
  - API tesztelés Postman segítségével
- **Felhasználói tesztelés**:
  - Valós személyek általi kipróbálás, visszajelzések alapján finomhangolás

---

## 🌱 Jövőbeli tervek

- **Értékelési rendszer**: Lehetőség termékek csillagos értékelésére és vélemény írására.
- **Push értesítések**: Automatikus figyelmeztetések új termékekről vagy rendelésállapot-változásokról.
- **Mobilalkalmazás**: A webalkalmazás natív mobilos verziója.
- **Részletesebb statisztikai modul**: Bővített admin felület, ahol grafikonok és elemzések is elérhetők lesznek.

---

## 👨‍💼 Fejlesztők

- **Szentes Mirtill**  
  Frontend fejlesztés (React), felhasználói felület tervezése, reszponzív dizájn és dokumentáció készítése.

- **Nagy Máté János**  
  Backend fejlesztés (ASP.NET), adatbázis-tervezés, REST API megvalósítása, admin funkciók kialakítása.