import { useState, useContext, createContext, useReducer, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, X, ChevronDown, ChevronRight, ChevronLeft, Plus, Minus, Star, Heart, Globe, Truck, Shield, RotateCcw, ZoomIn, Check, ArrowRight, Package, CreditCard, MapPin, Loader } from "lucide-react";

// ─── TYPES & DATA ───────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 1, name: "Soie Lumière Blazer", collection: "Atelier", price: 1240, originalPrice: null,
    colors: ["Ivory", "Onyx", "Sage"], sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&auto=format&fit=crop&q=85",
    ],
    description: "Crafted from 100% Mulberry silk, this blazer redefines effortless sophistication. The structured silhouette drapes with a weightless fluidity that moves beautifully.",
    tags: ["silk", "blazer", "atelier", "luxury"], rating: 4.9, reviews: 48, category: "Outerwear",
    sustainability: "GOTS-certified organic silk from Suzhou. Carbon-neutral shipping. Recyclable packaging.",
    specs: "100% Mulberry Silk. Fully lined. Dry clean only. Made in Italy.",
  },
  {
    id: 2, name: "Noir Cashmere Coat", collection: "Essentials", price: 2890, originalPrice: 3200,
    colors: ["Noir", "Camel", "Charcoal"], sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=85",
    ],
    description: "A perennial icon in pure Scottish cashmere. Double-faced for unrivaled warmth with extraordinary lightness.",
    tags: ["cashmere", "coat", "essentials", "winter"], rating: 5.0, reviews: 112, category: "Outerwear",
    sustainability: "Grade A cashmere. Responsible wool sourcing certified by RWS.",
    specs: "100% Grade A Scottish Cashmere. Dry clean only. Made in Scotland.",
  },
  {
    id: 3, name: "Velour Structured Tote", collection: "Maison", price: 890, originalPrice: null,
    colors: ["Cognac", "Noir", "Ivory"], sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=85",
    ],
    description: "Hand-stitched by master artisans in Florence. Full-grain vegetable-tanned leather that develops a rich patina over time.",
    tags: ["leather", "tote", "bag", "maison"], rating: 4.8, reviews: 73, category: "Accessories",
    sustainability: "Vegetable-tanned leather from LWG Gold-rated tanneries. Zero-waste offcuts repurposed.",
    specs: "Full-grain calfskin leather. Suede interior. Brass hardware. Made in Florence.",
  },
  {
    id: 4, name: "Plissé Silk Midi Dress", collection: "Resort", price: 1680, originalPrice: null,
    colors: ["Champagne", "Blush", "Midnight"], sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop&q=85",
    ],
    description: "Permanently pleated silk georgette cascades into a fluid midi silhouette. Light-catching and impossibly graceful.",
    tags: ["silk", "dress", "resort", "pleated"], rating: 4.7, reviews: 56, category: "Dresses",
    sustainability: "OEKO-TEX certified silk. Dyed with low-impact processes. Made in Portugal.",
    specs: "100% Silk Georgette. Hand wash cold. Made in Portugal.",
  },
  {
    id: 5, name: "Linen Tailored Trouser", collection: "Atelier", price: 620, originalPrice: null,
    colors: ["Ecru", "Navy", "Sand"], sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=800&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=85",
    ],
    description: "Precision-tailored in Sligo Irish linen. Wide-leg silhouette with a high rise and invisible zip closure for a seamless aesthetic.",
    tags: ["linen", "trousers", "atelier", "tailored"], rating: 4.6, reviews: 34, category: "Trousers",
    sustainability: "European Flax certified Irish linen. Low water footprint. Made in Ireland.",
    specs: "100% Irish Linen. Machine wash cold. Made in Ireland.",
  },
  {
    id: 6, name: "Merino Ribbed Turtleneck", collection: "Essentials", price: 480, originalPrice: 580,
    colors: ["Ivory", "Oat", "Slate", "Ebony"], sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1616844868137-7ffaf43c2d81?w=800&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=85",
    ],
    description: "Fine-gauge merino in a tight rib knit. Buttery-soft with natural temperature regulation. Eternally versatile.",
    tags: ["merino", "knitwear", "essentials", "turtleneck"], rating: 4.9, reviews: 201, category: "Knitwear",
    sustainability: "ZQ-certified merino wool. Mulesing-free farms in New Zealand.",
    specs: "100% Fine Merino Wool. Machine wash cold, gentle. Made in Italy.",
  },
  {
    id: 7, name: "Suede Chelsea Boots", collection: "Maison", price: 1120, originalPrice: null,
    colors: ["Tan", "Chocolate", "Noir"], sizes: ["36", "37", "38", "39", "40", "41", "42"],
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=85",
    ],
    description: "Supple Spanish suede uppers on a hand-welted leather sole. Elastic gussets in luxe stretch material. The definitive Chelsea.",
    tags: ["boots", "suede", "maison", "footwear"], rating: 4.8, reviews: 88, category: "Footwear",
    sustainability: "Chrome-free suede. Leather from Higg Index-rated tanneries.",
    specs: "Spanish Suede upper. Leather lining & sole. Hand-welted. Made in Spain.",
  },
  {
    id: 8, name: "Angora Cloud Cardigan", collection: "Resort", price: 760, originalPrice: null,
    colors: ["Powder", "Rose", "Sky"], sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1607730538162-924f907be4c2?w=800&auto=format&fit=crop&q=85",
    ],
    description: "Ethereally light angora-blend in a loose, enveloping silhouette. Worn alone or layered — invariably exquisite.",
    tags: ["angora", "cardigan", "resort", "knitwear"], rating: 4.5, reviews: 29, category: "Knitwear",
    sustainability: "OEKO-TEX Standard 100 certified. Responsible angora sourcing.",
    specs: "70% Angora, 30% Merino. Dry clean recommended. Made in France.",
  },
];

const COLLECTIONS = [
  { name: "Atelier", desc: "Master craftsmanship, elevated.",    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85" },
  { name: "Essentials", desc: "Timeless, understated luxury.",   image: "https://images.unsplash.com/photo-1616844868137-7ffaf43c2d81?w=700&q=85" },
  { name: "Maison", desc: "Art de vivre, refined.",              image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=700&q=85" },
  { name: "Resort", desc: "Effortless warm-weather dressing.",   image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700&q=85" },
];

const CURRENCIES = [{ code: "USD", symbol: "$" }, { code: "EUR", symbol: "€" }, { code: "GBP", symbol: "£" }, { code: "JPY", symbol: "¥" }];
const LANGUAGES = ["English", "Français", "Deutsch", "日本語", "中文"];

// ─── CART CONTEXT ───────────────────────────────────────────────────────────

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const key = `${action.item.id}-${action.item.selectedColor}-${action.item.selectedSize}`;
      const existing = state.items.find(i => i.key === key);
      if (existing) return { ...state, items: state.items.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i) };
      return { ...state, items: [...state.items, { ...action.item, key, qty: 1 }] };
    }
    case "REMOVE": return { ...state, items: state.items.filter(i => i.key !== action.key) };
    case "INC": return { ...state, items: state.items.map(i => i.key === action.key ? { ...i, qty: i.qty + 1 } : i) };
    case "DEC": return { ...state, items: state.items.map(i => i.key === action.key ? { ...i, qty: Math.max(1, i.qty - 1) } : i) };
    case "CLEAR": return { ...state, items: [] };
    default: return state;
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const subtotal = state.items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = state.items.reduce((s, i) => s + i.qty, 0);
  return <CartContext.Provider value={{ items: state.items, dispatch, subtotal, count }}>{children}</CartContext.Provider>;
}

function useCart() { return useContext(CartContext); }

// ─── UTILITIES ──────────────────────────────────────────────────────────────

const fmt = (price, symbol = "$") => `${symbol}${price.toLocaleString()}`;
const spring = { type: "spring", stiffness: 380, damping: 35 };
const ease = { type: "tween", duration: 0.35, ease: [0.25, 0, 0, 1] };

// ─── GLOBAL STYLES ──────────────────────────────────────────────────────────

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'DM Sans', sans-serif; background: #fafaf8; color: #0f0f0d; -webkit-font-smoothing: antialiased; }
    ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #d4d0c8; border-radius: 2px; }
    .serif { font-family: 'Cormorant Garamond', serif; }
    .no-scroll { overflow: hidden; }
    input:focus, button:focus { outline: none; }
    img { display: block; }
  `}</style>
);

// ─── HEADER ─────────────────────────────────────────────────────────────────

function Header({ view, setView, cartOpen, setCartOpen, searchOpen, setSearchOpen, currency, setCurrency, lang, setLang }) {
  const { count } = useCart();
  const [locOpen, setLocOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 20); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);

  return (
    <motion.header
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", background: scrolled ? "rgba(250,250,248,0.92)" : "rgba(250,250,248,0.75)", borderBottom: `1px solid ${scrolled ? "#e8e6e0" : "transparent"}`, transition: "all 0.3s ease" }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2rem", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <button onClick={() => setView("home")} style={{ background: "none", border: "none", cursor: "pointer", textDecoration: "none" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
            <span className="serif" style={{ fontSize: 22, fontWeight: 500, letterSpacing: "0.15em", color: "#0f0f0d", lineHeight: 1 }}>MAISON</span>
            <span style={{ fontSize: 9, fontWeight: 300, letterSpacing: "0.5em", color: "#8a887e", textTransform: "uppercase" }}>LUMIÈRE</span>
          </div>
        </button>

        {/* Nav */}
        <nav style={{ display: "flex", gap: "2.5rem" }}>
          {[["home", "Home"], ["shop", "Collections"], ["shop", "New Arrivals"]].map(([v, label]) => (
            <button key={label} onClick={() => setView(v)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: view === v ? "#0f0f0d" : "#6b6960", transition: "color 0.2s", fontFamily: "'DM Sans', sans-serif" }}>
              {label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          {/* Localization */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setLocOpen(!locOpen)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: "#6b6960", fontSize: 12, letterSpacing: "0.1em" }}>
              <Globe size={14} />
              <span>{currency.code}</span>
              <ChevronDown size={12} />
            </button>
            <AnimatePresence>
              {locOpen && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={ease}
                  style={{ position: "absolute", right: 0, top: "calc(100% + 12px)", background: "#fff", border: "1px solid #e8e6e0", borderRadius: 8, padding: "8px 0", minWidth: 140, boxShadow: "0 8px 32px rgba(0,0,0,0.08)", zIndex: 200 }}>
                  <div style={{ padding: "4px 12px 8px", borderBottom: "1px solid #f0ede8", marginBottom: 4 }}>
                    <p style={{ fontSize: 10, letterSpacing: "0.15em", color: "#8a887e", textTransform: "uppercase", marginBottom: 6 }}>Currency</p>
                    {CURRENCIES.map(c => (
                      <button key={c.code} onClick={() => { setCurrency(c); setLocOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "4px 0", fontSize: 13, color: currency.code === c.code ? "#0f0f0d" : "#6b6960", fontWeight: currency.code === c.code ? 500 : 400 }}>
                        {c.symbol} {c.code}
                      </button>
                    ))}
                  </div>
                  <div style={{ padding: "4px 12px" }}>
                    <p style={{ fontSize: 10, letterSpacing: "0.15em", color: "#8a887e", textTransform: "uppercase", marginBottom: 6 }}>Language</p>
                    {LANGUAGES.map(l => (
                      <button key={l} onClick={() => { setLang(l); setLocOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "4px 0", fontSize: 13, color: lang === l ? "#0f0f0d" : "#6b6960", fontWeight: lang === l ? 500 : 400 }}>
                        {l}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={() => setSearchOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b6960", display: "flex", alignItems: "center" }}>
            <Search size={18} />
          </button>
          <button onClick={() => setCartOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "#0f0f0d", display: "flex", alignItems: "center", position: "relative" }}>
            <ShoppingBag size={18} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={spring}
                  style={{ position: "absolute", top: -7, right: -7, background: "#064E3B", color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 500 }}>
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.header>
  );
}

// ─── SEARCH MODAL ───────────────────────────────────────────────────────────

function SearchModal({ open, onClose, setView, setSelectedProduct, currency }) {
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  const results = q.length > 1 ? PRODUCTS.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.tags.some(t => t.includes(q.toLowerCase())) || p.collection.toLowerCase().includes(q.toLowerCase())) : [];

  useEffect(() => { if (open) { setTimeout(() => inputRef.current?.focus(), 50); setQ(""); } }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
          style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(15,15,13,0.5)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 120 }}
          onClick={e => e.target === e.currentTarget && onClose()}>
          <motion.div initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={ease}
            style={{ background: "#fafaf8", borderRadius: 16, width: "100%", maxWidth: 640, margin: "0 1rem", overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.18)" }}>
            <div style={{ display: "flex", alignItems: "center", padding: "0 1.5rem", borderBottom: "1px solid #f0ede8", gap: "1rem" }}>
              <Search size={18} color="#8a887e" />
              <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)} placeholder="Search collections, styles, materials…" style={{ flex: 1, background: "none", border: "none", padding: "1.25rem 0", fontSize: 15, color: "#0f0f0d", fontFamily: "'DM Sans', sans-serif" }} />
              <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#8a887e" }}><X size={18} /></button>
            </div>
            <div style={{ maxHeight: 380, overflowY: "auto" }}>
              {q.length < 2 && (
                <div style={{ padding: "1.5rem" }}>
                  <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8a887e", marginBottom: "1rem" }}>Collections</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {COLLECTIONS.map(c => (
                      <button key={c.name} onClick={() => { setView("shop"); onClose(); }} style={{ padding: "6px 14px", border: "1px solid #e8e6e0", borderRadius: 100, background: "none", cursor: "pointer", fontSize: 13, color: "#3d3c37" }}>
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {results.map(p => (
                <button key={p.id} onClick={() => { setSelectedProduct(p); setView("product-detail"); onClose(); }} style={{ display: "flex", alignItems: "center", gap: "1rem", width: "100%", padding: "1rem 1.5rem", background: "none", border: "none", borderBottom: "1px solid #f8f7f5", cursor: "pointer", textAlign: "left" }}>
                  <img src={p.images[0]} alt={p.name} style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: "#0f0f0d", marginBottom: 2 }}>{p.name}</p>
                    <p style={{ fontSize: 12, color: "#8a887e" }}>{p.collection} · {fmt(p.price, currency.symbol)}</p>
                  </div>
                  <ChevronRight size={14} color="#c8c5be" />
                </button>
              ))}
              {q.length > 1 && results.length === 0 && (
                <div style={{ padding: "2.5rem", textAlign: "center", color: "#8a887e", fontSize: 14 }}>No results for "{q}"</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── CART DRAWER ─────────────────────────────────────────────────────────────

function CartDrawer({ open, onClose, currency, setView }) {
  const { items, dispatch, subtotal, count } = useCart();
  const FREE_SHIPPING_THRESHOLD = 3000;
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "#0f0f0d" }} />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={ease}
            style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "100%", maxWidth: 440, zIndex: 201, background: "#fafaf8", display: "flex", flexDirection: "column", boxShadow: "-12px 0 48px rgba(0,0,0,0.12)" }}>
            {/* Header */}
            <div style={{ padding: "1.75rem 1.75rem 1.25rem", borderBottom: "1px solid #f0ede8", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h2 className="serif" style={{ fontSize: 22, fontWeight: 400, color: "#0f0f0d" }}>Your Curation</h2>
                <p style={{ fontSize: 12, color: "#8a887e", marginTop: 2 }}>{count} {count === 1 ? "piece" : "pieces"} selected</p>
              </div>
              <button onClick={onClose} style={{ background: "none", border: "1px solid #e8e6e0", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <X size={15} color="#6b6960" />
              </button>
            </div>

            {/* Shipping progress */}
            <div style={{ padding: "1rem 1.75rem", borderBottom: "1px solid #f0ede8", background: progress === 100 ? "#f0faf6" : "#fafaf8" }}>
              {progress < 100 ? (
                <p style={{ fontSize: 12, color: "#6b6960", marginBottom: 8 }}>Add <strong style={{ color: "#064E3B" }}>{fmt(remaining, currency.symbol)}</strong> more for complimentary international express shipping</p>
              ) : (
                <p style={{ fontSize: 12, color: "#064E3B", display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><Check size={14} /> Complimentary international express shipping unlocked</p>
              )}
              <div style={{ height: 2, background: "#e8e6e0", borderRadius: 1, overflow: "hidden" }}>
                <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease: "easeOut" }} style={{ height: "100%", background: "#064E3B", borderRadius: 1 }} />
              </div>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.75rem" }}>
              {items.length === 0 ? (
                <div style={{ textAlign: "center", paddingTop: "3rem" }}>
                  <ShoppingBag size={40} color="#d4d0c8" style={{ margin: "0 auto 1rem" }} />
                  <p className="serif" style={{ fontSize: 20, color: "#8a887e", fontWeight: 300 }}>Your curation is empty</p>
                  <p style={{ fontSize: 13, color: "#b8b5ae", marginTop: 6 }}>Discover our collections below</p>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map(item => (
                    <motion.div key={item.key} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20, height: 0 }} layout
                      style={{ display: "flex", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid #f0ede8" }}>
                      <img src={item.images[0]} alt={item.name} style={{ width: 80, height: 96, objectFit: "cover", borderRadius: 6 }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, fontWeight: 500, color: "#0f0f0d", marginBottom: 2 }}>{item.name}</p>
                        <p style={{ fontSize: 11, color: "#8a887e", marginBottom: 8 }}>{item.selectedColor} · {item.selectedSize}</p>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12, border: "1px solid #e8e6e0", borderRadius: 100, padding: "4px 12px" }}>
                            <button onClick={() => dispatch({ type: "DEC", key: item.key })} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b6960", display: "flex" }}><Minus size={12} /></button>
                            <span style={{ fontSize: 13, fontWeight: 500, minWidth: 12, textAlign: "center" }}>{item.qty}</span>
                            <button onClick={() => dispatch({ type: "INC", key: item.key })} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b6960", display: "flex" }}><Plus size={12} /></button>
                          </div>
                          <p style={{ fontSize: 14, fontWeight: 500 }}>{fmt(item.price * item.qty, currency.symbol)}</p>
                        </div>
                      </div>
                      <button onClick={() => dispatch({ type: "REMOVE", key: item.key })} style={{ background: "none", border: "none", cursor: "pointer", color: "#c8c5be", alignSelf: "flex-start", marginTop: 4 }}>
                        <X size={14} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{ padding: "1.25rem 1.75rem", borderTop: "1px solid #f0ede8" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: "#6b6960" }}>Subtotal</span>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{fmt(subtotal, currency.symbol)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: "#6b6960" }}>Shipping</span>
                  <span style={{ fontSize: 13, color: progress === 100 ? "#064E3B" : "#0f0f0d" }}>{progress === 100 ? "Complimentary" : "Calculated at checkout"}</span>
                </div>
                <div style={{ height: "1px", background: "#f0ede8", margin: "12px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>Estimated Total</span>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{fmt(subtotal, currency.symbol)}</span>
                </div>
                <button onClick={() => { setView("checkout"); onClose(); }}
                  style={{ width: "100%", background: "#064E3B", color: "#fff", border: "none", borderRadius: 8, padding: "15px", fontSize: 13, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  Proceed to Checkout <ArrowRight size={14} />
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────

function ProductCard({ product, onSelect, currency }) {
  const { dispatch } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    dispatch({ type: "ADD", item: { ...product, selectedColor: product.colors[0], selectedSize: product.sizes[0] } });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ cursor: "pointer" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => onSelect(product)}>
      <div style={{ position: "relative", overflow: "hidden", borderRadius: 4, marginBottom: "0.875rem", aspectRatio: "3/4", background: "#f0ede8" }}>
        <motion.img src={product.images[0]} alt={product.name} animate={{ scale: hovered ? 1.04 : 1 }} transition={{ duration: 0.6, ease: [0.25, 0, 0, 1] }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <motion.img src={product.images[1]} alt="" animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        {product.originalPrice && (
          <span style={{ position: "absolute", top: 12, left: 12, background: "#0f0f0d", color: "#fff", fontSize: 10, letterSpacing: "0.15em", padding: "4px 8px", borderRadius: 2, textTransform: "uppercase" }}>Sale</span>
        )}
        <AnimatePresence>
          {hovered && (
            <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}
              onClick={handleQuickAdd} style={{ position: "absolute", bottom: 12, left: 12, right: 12, background: added ? "#064E3B" : "rgba(250,250,248,0.95)", border: "none", borderRadius: 6, padding: "11px", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", color: added ? "#fff" : "#0f0f0d", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "background 0.3s, color 0.3s", fontFamily: "'DM Sans', sans-serif" }}>
              {added ? <><Check size={13} /> Added</> : <><Plus size={13} /> Quick Add</>}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <div>
        <p style={{ fontSize: 10, letterSpacing: "0.2em", color: "#8a887e", textTransform: "uppercase", marginBottom: 4 }}>{product.collection}</p>
        <p style={{ fontSize: 14, fontWeight: 400, color: "#0f0f0d", marginBottom: 6, lineHeight: 1.4 }}>{product.name}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14, color: product.originalPrice ? "#064E3B" : "#0f0f0d" }}>{fmt(product.price, currency.symbol)}</span>
          {product.originalPrice && <span style={{ fontSize: 13, color: "#b8b5ae", textDecoration: "line-through" }}>{fmt(product.originalPrice, currency.symbol)}</span>}
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
          {product.colors.slice(0, 3).map(c => (
            <div key={c} title={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c === "Ivory" || c === "Ecru" || c === "Champagne" ? "#f0ede0" : c === "Noir" || c === "Onyx" || c === "Ebony" ? "#1a1a18" : c === "Sage" ? "#7d8c6e" : c === "Camel" ? "#c8935a" : c === "Charcoal" ? "#4a4845" : c === "Cognac" || c === "Tan" ? "#a0643c" : c === "Blush" || c === "Rose" || c === "Pink" ? "#e8b4b0" : c === "Midnight" || c === "Navy" ? "#1d2a44" : "#7f7f7f", border: "1px solid rgba(0,0,0,0.08)" }} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}