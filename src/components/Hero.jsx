import { STORE } from "../config.js";

export default function Hero() {
  return (
    <section className="hero wrap" id="top">
      <h1>Phone gear that actually lasts.</h1>
      <p className="hero__sub">
        Chargers, cables, earbuds, cases and power banks. Order in a few taps, we confirm on WhatsApp, and you pay when it arrives.
      </p>
      <a className="btn btn--primary" href="#shop">Shop accessories</a>
      <ul className="hero__facts">
        <li>Cash on delivery</li>
        <li>Free delivery over {STORE.currency} {STORE.freeDeliveryOver.toLocaleString()}</li>
        <li>Replacement if faulty</li>
      </ul>
    </section>
  );
}
