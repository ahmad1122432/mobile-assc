import { STORE } from "../config.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__row">
        <p><strong>{STORE.name}</strong><br />Orders are confirmed on WhatsApp. Pay cash on delivery.</p>
        <a className="btn btn--ghost" href={`https://wa.me/${STORE.whatsapp}`} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
      </div>
    </footer>
  );
}
