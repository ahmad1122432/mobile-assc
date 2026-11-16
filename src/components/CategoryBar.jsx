export default function CategoryBar({ categories, active, onChange }) {
  return (
    <nav className="cats" aria-label="Categories">
      <div className="cats__scroll wrap">
        {categories.map((c) => (
          <button key={c} className={"chip" + (c === active ? " chip--on" : "")} aria-pressed={c === active} onClick={() => onChange(c)}>
            {c}
          </button>
        ))}
      </div>
    </nav>
  );
}
