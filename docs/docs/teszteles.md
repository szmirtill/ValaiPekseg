---
title: Tesztelés
sidebar_position: 6
---

# 🧪 Tesztelés

A Valai Pékség alkalmazásának működését több szinten és különböző módszerekkel teszteltük.  
A cél az volt, hogy minden funkció stabilan, hibamentesen működjön, és a felhasználói élmény is zavartalan legyen.

---

## ✅ Funkcionális tesztelés

A funkcionális tesztek során ellenőriztük, hogy a rendszer minden funkciója a tervezett módon működik:

- 🔐 **Bejelentkezés**: helyes és helytelen adatokkal is kipróbálva
- 📝 **Regisztráció**: új felhasználók mentése, validációk
- 🛒 **Termékek megjelenítése**: betöltés, kategória szűrés
- 📦 **Kosár működése**: hozzáadás, mennyiség módosítás, törlés
- 🧾 **Rendelés leadása**: automatikusan „Feldolgozás alatt” állapottal
- 🧠 **Admin funkciók**: termék törlés, ár módosítás, rendelés állapotának váltása

---

## 🔐 Biztonsági tesztelés

Ezekkel a tesztekkel azt ellenőriztük, hogy az alkalmazás ne engedjen jogosulatlan hozzáférést, és megbízhatóan ellenőrizze az adatokat:

- ❌ Helytelen email/jelszó esetén nem enged bejelentkezni
- 🔐 Felhasználói profil módosításakor ellenőrzi az aktuális jelszót
- 🔒 Admin oldal csak bejelentkezés után érhető el
- 📧 Az email cím egyediségét validáljuk regisztrációnál
- 🛡️ A felhasználók jelszava nem kerül visszaküldésre az API-n keresztül

---

## 🚀 Terhelési tesztelés (alap szintű)

Kisebb volumenű terhelési teszteket is végeztünk annak ellenőrzésére, hogy a rendszer hogyan viselkedik több egyidejű használat mellett:

- 🔄 Gyors egymás utáni rendelés leadás
- 🧾 Több tétel egyidejű mentése
- 💾 Kosár többszöri módosítása rövid időn belül
- 📶 Internetkapcsolat megszakítása közben történő mentés kezelése

---

## 🔍 Hibakezelés tesztelése

Fontos szempont volt, hogy a hibák kezelése felhasználóbarát módon történjen:

- 📭 Üzenetek jelenjenek meg, ha valami nem sikerült (pl. „Hibás bejelentkezés”)
- 🔙 Hibák után ne fagyjon le az alkalmazás, legyen újrapróbálási lehetőség
- ⚠️ Hiányzó mezők, hibás formátum esetén figyelmeztetést kapjon a felhasználó

---

## 🛠️ Tesztelési eszközök

- **Postman**: backend API végpontok tesztelése (login, regisztráció, CRUD műveletek)
- **Böngészők**: manuális tesztelés Chrome és Edge alatt
- **Fejlesztői konzol**: hibák naplózása és elemzése (React DevTools, Network tab)

---

A rendszer tesztelése során az volt a célunk, hogy minden végpont, minden felület és minden funkció **logikailag és technikailag is helyesen működjön**, stabil és biztonságos élményt nyújtva.
