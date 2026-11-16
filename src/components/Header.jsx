import { STORE } from "../config.js";

export default function Header({ query, setQuery, count, onCart }) {
  return (
    <header className="header">
      <div className="header__row wrap">
        <a className="brand" href="#top" aria-label={STORE.name}>
          <span className="brand__mark" aria-hidden="true">A</span>
          <span className="brand__name">Ansari<small>Mobile Accessories</small></span>
        </a>

        <label className="search">
          <span className="sr-only">Search products</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
          <input type="search" placeholder="Search chargers, cases, earbuds" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>

        <button className="cartbtn" onClick={onCart} aria-label={`Open cart, ${count} items`}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L20 7H6.2" /><circle cx="9.5" cy="19" r="1.2" /><circle cx="16.5" cy="19" r="1.2" /></svg>
          {count > 0 && <span className="cartbtn__count">{count}</span>}
        </button>
      </div>
    </header>
  );
}
