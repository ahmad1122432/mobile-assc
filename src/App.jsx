import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS } from "./data/products.js";
import { useCart } from "./hooks/useCart.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import CategoryBar from "./components/CategoryBar.jsx";
import ProductCard, { money } from "./components/ProductCard.jsx";
import ProductModal from "./components/ProductModal.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const { cart, add, dec, remove, clear } = useCart();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, query, sort]);

  const lines = PRODUCTS.filter((p) => cart[p.id]).map((p) => ({ p, qty: cart[p.id] }));
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.p.price * l.qty, 0);

  return (
    <>
      <Header query={query} setQuery={setQuery} count={count} onCart={() => setCartOpen(true)} />
      <main>
        <Hero />
        <section id="shop" className="shop">
          <CategoryBar categories={CATEGORIES} active={category} onChange={setCategory} />
          <div className="wrap toolbar">
            <p>{visible.length} {visible.length === 1 ? "product" : "products"}</p>
            <label>
              <span className="sr-only">Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </label>
          </div>
          <div className="wrap grid">
            {visible.map((p) => (
              <ProductCard key={p.id} p={p} qty={cart[p.id] || 0} onAdd={add} onDec={dec} onOpen={setSelected} />
            ))}
          </div>
          {visible.length === 0 && (
            <p className="wrap empty">No products match “{query}”. Try another word or pick All.</p>
          )}
        </section>
      </main>
      <Footer />

      {count > 0 && !cartOpen && (
        <button className="cartbar" onClick={() => setCartOpen(true)}>
          <span>{count} {count === 1 ? "item" : "items"}</span>
          <span>View cart · {money(subtotal)}</span>
        </button>
      )}

      {selected && <ProductModal p={selected} onClose={() => setSelected(null)} onAdd={add} />}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={lines}
        subtotal={subtotal}
        onAdd={add}
        onDec={dec}
        onRemove={remove}
        onClear={clear}
      />
    </>
  );
}
