import { useEffect, useState } from "react";
import { STORE } from "../config.js";
import { money } from "./ProductCard.jsx";

export default function CartDrawer({ open, onClose, lines, subtotal, onAdd, onDec, onRemove, onClear }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const delivery = subtotal === 0 || subtotal >= STORE.freeDeliveryOver ? 0 : STORE.deliveryFee;
  const total = subtotal + delivery;

  function order() {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("Enter your name, phone number and address so we can deliver.");
      return;
    }
    setError("");
    const items = lines.map((l) => `• ${l.p.name} × ${l.qty} = ${money(l.p.price * l.qty)}`).join("\n");
    const text =
      `New order from ${STORE.name}\n\n${items}\n\n` +
      `Subtotal: ${money(subtotal)}\nDelivery: ${delivery ? money(delivery) : "Free"}\nTotal (cash on delivery): ${money(total)}\n\n` +
      `Name: ${name.trim()}\nPhone: ${phone.trim()}\nAddress: ${address.trim()}` +
      (note.trim() ? `\nNote (phone model etc.): ${note.trim()}` : "");
    window.open(`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  }

  if (!open) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Your cart" onClick={(e) => e.stopPropagation()}>
        <div className="drawer__head">
          <h2>Your cart</h2>
          <button className="sheet__close" onClick={onClose} aria-label="Close cart">×</button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer__empty">
            <p>Your cart is empty.</p>
            <button className="btn btn--primary" onClick={onClose}>Browse accessories</button>
          </div>
        ) : (
          <>
            <ul className="lines">
              {lines.map(({ p, qty }) => (
                <li key={p.id} className="line">
                  <div>
                    <p className="line__name">{p.name}</p>
                    <p className="line__price">{money(p.price)} each</p>
                    <button className="link" onClick={() => onRemove(p.id)}>Remove</button>
                  </div>
                  <div className="stepper stepper--sm">
                    <button onClick={() => onDec(p.id)} aria-label="Remove one">−</button>
                    <span>{qty}</span>
                    <button onClick={() => onAdd(p.id)} aria-label="Add one">+</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="totals">
              <p><span>Subtotal</span><span>{money(subtotal)}</span></p>
              <p><span>Delivery</span><span>{delivery ? money(delivery) : "Free"}</span></p>
              <p className="totals__grand"><span>Total</span><span>{money(total)}</span></p>
            </div>

            <form className="form" onSubmit={(e) => { e.preventDefault(); order(); }}>
              <label>Full name<input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
              <label>Phone number<input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" /></label>
              <label>Delivery address<textarea rows="2" value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" /></label>
              <label>Phone model or note (optional)<input value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Samsung A54, black case" /></label>
              {error && <p className="form__error" role="alert">{error}</p>}
              <button type="submit" className="btn btn--wa btn--block">Order on WhatsApp</button>
              <button type="button" className="link link--center" onClick={onClear}>Clear cart</button>
            </form>
          </>
        )}
      </aside>
    </div>
  );
}
