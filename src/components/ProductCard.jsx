import Illustration from "./Illustration.jsx";
import { STORE } from "../config.js";

export const money = (n) => `${STORE.currency} ${n.toLocaleString("en-PK")}`;

export default function ProductCard({ p, qty, onAdd, onDec, onOpen }) {
  const off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  return (
    <article className="card">
      <button className={`card__tile tone-${p.tone}`} onClick={() => onOpen(p)} aria-label={`View ${p.name}`}>
        <Illustration name={p.icon} />
        {p.tag && <span className="card__tag">{p.tag}</span>}
      </button>
      <div className="card__body">
        <h3 className="card__name">{p.name}</h3>
        <p className="card__cat">{p.category}</p>
        <p className="card__price">
          <strong>{money(p.price)}</strong>
          {p.oldPrice && (
            <>
              <s>{money(p.oldPrice)}</s>
              <span className="card__off">{off}% off</span>
            </>
          )}
        </p>
        {qty === 0 ? (
          <button className="btn btn--add" onClick={() => onAdd(p.id)}>Add to cart</button>
        ) : (
          <div className="stepper" role="group" aria-label={`${p.name} quantity`}>
            <button onClick={() => onDec(p.id)} aria-label="Remove one">−</button>
            <span>{qty}</span>
            <button onClick={() => onAdd(p.id)} aria-label="Add one">+</button>
          </div>
        )}
      </div>
    </article>
  );
}
