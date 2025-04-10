# 🥖 Valai Pékség Webalkalmazás

Ez a projekt egy modern, reszponzív webalkalmazás, amely a Valai Pékség számára készült. A célja, hogy lehetővé tegye a 
vásárlók számára az online rendelést, valamint egyszerűsítse az adminisztrációs folyamatokat a vállalkozás munkatársai számára.

A rendszer React alapú frontendből, ASP.NET Core Web API backendből és MySQL adatbázisból épül fel.

---

## 📌 Tartalomjegyzék

- [Funkciók](#funkciók)
- [Technológiák](#technológiák)
- [Telepítési útmutató](#telepítési-útmutató)
- [Használat](#használat)
- [Adatbázis szerkezete](#adatbázis-szerkezete)
- [Tesztelés](#tesztelés)
- [Fejlesztők](#fejlesztők)
- [Jövőbeli tervek](#jövőbeli-tervek)
- [Licenc](#licenc)

---

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

### 1. A projekt klónozása
```bash
git clone https://github.com/szmirtill/ValaiPekseg
```

### 2. Adatbázis beállítása

- Indítsa el az adatbázis-szervert (például XAMPP segítségével).
- Hozza létre a szükséges adatbázist.
- Futtassa az Entity Framework migrációkat, vagy manuálisan hozza létre az adatbázis-táblákat.

### 3. Backend indítása

- Nyissa meg a megoldást **Visual Studio 2022** alkalmazásban.
- Indítsa el a szervert a Visual Studio „Start” gombjával vagy `dotnet run` parancs segítségével.

### 4. Frontend indítása

```bash
cd frontend
npm install
npm start
```


---

## 📲 Használat

### Vásárlók számára

1. Regisztráljon az oldalon felhasználónév, e-mail cím és jelszó megadásával.
2. Jelentkezzen be a rendszerbe.
3. Válogasson a termékek között, majd helyezze azokat a kosarába.
4. Adja meg szállítási adatait, majd küldje el rendelését.
5. Kövesse nyomon korábbi rendeléseit a „**Rendeléseim**” menüpont alatt.

### Adminisztrátorok számára

1. Jelentkezzen be az adminisztrációs felületre.
2. Kezelje a Felhasználókat.
3. Módosítsa a termékek árait, törölje azokat.

---

## 🗃️ Adatbázis szerkezete

A rendszer az alábbi táblákból épül fel:

- **Felhasználók (Vevo)**: `id`, `név`, `email`, `jelszó`, `regisztráció dátuma`
- **Termékek**: `id`, `név`, `leírás`, `ár`, `kategória`, `kép`
- **Kategóriák**: termékcsoportok logikai elválasztására
- **Rendelések**: `id`, `vevő_id`, `státusz`, `dátum`
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

## 👨‍💼 Fejlesztők

- **Szentes Mirtill**  
  Frontend fejlesztés (React), felhasználói felület tervezése, reszponzív dizájn és dokumentáció készítése.

- **Nagy Máté János**  
  Backend fejlesztés (ASP.NET), adatbázis-tervezés, REST API megvalósítása, admin funkciók kialakítása.

---

## 🌱 Jövőbeli tervek

- **Értékelési rendszer**: Lehetőség termékek csillagos értékelésére és vélemény írására.
- **Push értesítések**: Automatikus figyelmeztetések új termékekről vagy rendelésállapot-változásokról.
- **Mobilalkalmazás**: A webalkalmazás natív mobilos verziója (React Native vagy Flutter technológiával).
- **Részletesebb statisztikai modul**: Bővített admin felület, ahol grafikonok és elemzések is elérhetők lesznek.
