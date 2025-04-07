import { useState, useEffect } from "react";
import './Style/Cart.css';
import EditQuantityModal from './components/EditQuantityModal';
import SuccessModal from './components/SuccessModal';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [vevoid, setVevoid] = useState(null);
    const [keresztnev, setKeresztnev] = useState('');
    const [vezeteknev, setVezeteknev] = useState('');
    const [szallitasiMod, setSzallitasiMod] = useState('');
    const [iranyitoszam, setIranyitoszam] = useState('');
    const [varos, setVaros] = useState('');
    const [utca, setUtca] = useState('');
    const [hazszam, setHazszam] = useState('');

    // Mennyiség módosító modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    // Sikeres rendelés modal
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
        const userId = localStorage.getItem("userId");
        setVevoid(userId);
    }, []);

    const handleDelete = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleModify = (id) => {
        const selectedItem = cartItems.find(item => item.id === id);
        setSelectedItemId(id);
        setSelectedQuantity(selectedItem.mennyiseg);
        setIsModalOpen(true);
    };

    const handleSaveQuantity = (newQuantity) => {
        const updatedCart = cartItems.map(item =>
            item.id === selectedItemId ? { ...item, mennyiseg: newQuantity } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setIsModalOpen(false);
    };

    const kezeldRendelest = async () => {
        if (!keresztnev || !vezeteknev || !szallitasiMod) {
            alert('Kérlek tölts ki minden kötelező mezőt!');
            return;
        }

        if (
            szallitasiMod === 'kiszallitas' &&
            (!iranyitoszam || !varos || !utca || !hazszam)
        ) {
            alert('Kiszállítás esetén minden címezőt ki kell tölteni!');
            return;
        }

        const rendelendo = {
            vevo_id: vevoid,
            keresztnev,
            vezeteknev,
            szallitasiMod,
            iranyitoszam: szallitasiMod === 'pekseghez' ? '8254' : iranyitoszam,
            varos: szallitasiMod === 'pekseghez' ? 'Kővágóőrs' : varos,
            utca: szallitasiMod === 'pekseghez' ? 'Petőfi Sándor utca' : utca,
            hazszam: szallitasiMod === 'pekseghez' ? '36' : hazszam,
            termekek: cartItems.map(item => ({
                termekId: item.id,
                mennyiseg: item.mennyiseg,
                ar: item.ar
            }))
        };

        try {
            const response = await fetch("https://localhost:7136/api/rendeles/mentes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(rendelendo)
            });

            if (response.ok) {
                setShowSuccessModal(true);
                localStorage.removeItem("cart");
                setCartItems([]);

                // mezők resetelése
                setKeresztnev('');
                setVezeteknev('');
                setSzallitasiMod('');
                setIranyitoszam('');
                setVaros('');
                setUtca('');
                setHazszam('');
            } else {
                alert("Hiba történt a rendelés során.");
            }
        } catch (error) {
            console.error("Hálózati hiba:", error);
            alert("Hálózati hiba!");
        }
    };

    return (
        <div className="cart-container">
            <h2>Kosár tartalma</h2>
            {cartItems.length === 0 ? (
                <p>Nincs termék a kosárban.</p>
            ) : (
                <div>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Termék neve</th>
                                <th>Mennyiség</th>
                                <th>Ár (Ft)</th>
                                <th>Törlés</th>
                                <th>Módosítás</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item.id}>
                                    <td>{item.nev}</td>
                                    <td>{item.mennyiseg}</td>
                                    <td>{item.ar}</td>
                                    <td>
                                        <button onClick={() => handleDelete(item.id)} className="delete-btn">Törlés</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleModify(item.id)} className="modify-btn">Módosítás</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3>Összesen: {cartItems.reduce((total, item) => total + item.ar * item.mennyiseg, 0)} Ft</h3>
                </div>
            )}

            <h3>Vásárlási adatok</h3>
            <input type="text" placeholder="Keresztnév" value={keresztnev} onChange={e => setKeresztnev(e.target.value)} />
            <input type="text" placeholder="Vezetéknév" value={vezeteknev} onChange={e => setVezeteknev(e.target.value)} />

            <div>
                <label>
                    <input type="radio" name="szallitasiMod" value="pekseghez" checked={szallitasiMod === "pekseghez"} onChange={() => setSzallitasiMod("pekseghez")} />
                    Átvétel pékségnél (Kővágóőrs, Petőfi S. u. 36)
                </label>
                <label>
                    <input type="radio" name="szallitasiMod" value="kiszallitas" checked={szallitasiMod === "kiszallitas"} onChange={() => setSzallitasiMod("kiszallitas")} />
                    Kiszállítás
                </label>
            </div>

            {szallitasiMod === "kiszallitas" && (
                <>
                    <input type="text" placeholder="Irányítószám" value={iranyitoszam} onChange={e => setIranyitoszam(e.target.value)} />
                    <input type="text" placeholder="Város" value={varos} onChange={e => setVaros(e.target.value)} />
                    <input type="text" placeholder="Utca" value={utca} onChange={e => setUtca(e.target.value)} />
                    <input type="text" placeholder="Házszám" value={hazszam} onChange={e => setHazszam(e.target.value)} />
                </>
            )}

            <button onClick={kezeldRendelest}>Vásárlás</button>

            <EditQuantityModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveQuantity}
                currentQuantity={selectedQuantity}
            />

            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
            />
        </div>
    );
}

export default Cart;
