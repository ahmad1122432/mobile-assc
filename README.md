# Ansari Mobile Accessories: React store

A mobile-first React (Vite) online store for mobile accessories. Search, category filter, sorting,
product details, cart, and checkout by WhatsApp (cash on delivery). No backend needed.

## Run it
```bash
npm install
npm run dev
```
Open the **Network** URL it prints (e.g. `http://192.168.x.x:5173`) on your phone, on the same Wi-Fi.
If it doesn't open, allow Node.js through Windows Firewall.

## Change these first
| What | File |
|---|---|
| Store name, **WhatsApp number**, delivery fee | `src/config.js` |
| Products, prices, categories | `src/data/products.js` |
| Colours | `:root` in `src/styles.css` |
| Real product photos | In `src/components/ProductCard.jsx`, replace `<Illustration />` with `<img src={p.image} alt="" />` and add an `image` field to each product |

WhatsApp number format: country code + number, digits only. Pakistan `0300 1234567` becomes `923001234567`.

## Deploy (Vercel)
Push to GitHub, import the repo in Vercel. Framework: Vite. Build: `npm run build`. Output: `dist`.
