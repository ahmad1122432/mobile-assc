// Simple line drawings so the shop works without product photos.
// When you have real photos, replace <Illustration/> in ProductCard.jsx with an <img>.
const paths = {
  charger: (
    <>
      <rect x="20" y="14" width="24" height="30" rx="5" />
      <path d="M26 14V8M38 14V8" />
      <path d="M32 44v8c0 4 4 6 8 6" />
      <path d="M33 22l-4 8h6l-4 8" />
    </>
  ),
  cable: (
    <>
      <rect x="10" y="8" width="12" height="14" rx="3" />
      <path d="M16 22v8c0 8 6 8 10 8h12c6 0 8 4 8 8" />
      <rect x="42" y="46" width="12" height="10" rx="2" />
      <path d="M46 56v3M50 56v3" />
    </>
  ),
  earbuds: (
    <>
      <circle cx="22" cy="22" r="9" />
      <path d="M22 31v20a4 4 0 0 0 8 0" />
      <circle cx="42" cy="22" r="9" />
      <path d="M42 31v20a4 4 0 0 1-8 0" />
    </>
  ),
  case: (
    <>
      <rect x="16" y="6" width="32" height="52" rx="8" />
      <rect x="22" y="12" width="14" height="14" rx="4" />
      <circle cx="29" cy="19" r="3" />
      <path d="M30 46h8" />
    </>
  ),
  powerbank: (
    <>
      <rect x="14" y="16" width="36" height="34" rx="6" />
      <path d="M22 50v6M42 50v6" />
      <path d="M22 28h20M22 36h12" />
      <path d="M26 10h12" />
    </>
  ),
  guard: (
    <>
      <rect x="16" y="6" width="32" height="52" rx="7" />
      <path d="M22 14l14-8M22 28l22-14M22 42l22-14" />
    </>
  ),
  watch: (
    <>
      <path d="M24 12l2-8h12l2 8M24 52l2 8h12l2-8" />
      <rect x="18" y="12" width="28" height="40" rx="9" />
      <path d="M32 22v10l6 4" />
    </>
  ),
  stand: (
    <>
      <rect x="18" y="6" width="28" height="34" rx="5" />
      <path d="M32 40v8" />
      <path d="M20 48h24" />
      <path d="M26 56h12" />
    </>
  ),
};

export default function Illustration({ name }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name] || paths.charger}
    </svg>
  );
}
