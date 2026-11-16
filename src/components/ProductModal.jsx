import { useEffect } from "react";
import Illustration from "./Illustration.jsx";
import { money } from "./ProductCard.jsx";

export default function ProductModal({ p, onClose, onAdd }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label={p.name} onClick={(e) => e.stopPropagation()}>
        <button className="sheet__close" onClick={onClose} aria-label="Close">×</button>
        <div className={`sheet__art tone-${p.tone}`}><Illustration name={p.icon} /></div>
        <h2>{p.name}</h2>
        <p className="card__cat">{p.category}</p>
        <p className="sheet__desc">{p.desc}</p>
        <p className="card__price">
          <strong>{money(p.price)}</strong>
          {p.oldPrice && <s>{money(p.oldPrice)}</s>}
        </p>
        <button className="btn btn--primary btn--block" onClick={() => { onAdd(p.id); onClose(); }}>
          Add to cart
        </button>
      </div>
    </div>
  );
}
