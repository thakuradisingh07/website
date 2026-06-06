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
  { name: "Essentials", desc: "Timeless, understated luxury.",   image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700&q=85" },
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

// ─── HOME VIEW ─────────────────────────────────────────────────────────────

function HomeView({ setView, setSelectedProduct, currency }) {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollCarousel = (dir) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
      setTimeout(() => {
        setCanScrollLeft(carouselRef.current.scrollLeft > 0);
        setCanScrollRight(carouselRef.current.scrollLeft < carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10);
      }, 400);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section style={{ position: "relative", height: "95vh", minHeight: 600, overflow: "hidden" }}>
        <motion.img initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: [0.25, 0, 0, 1] }}
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1800&q=85" alt="Hero"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(15,15,13,0.55) 0%, rgba(15,15,13,0.15) 60%, rgba(15,15,13,0) 100%)" }} />
        <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center", maxWidth: 1400, margin: "0 auto", padding: "0 3rem" }}>
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9, ease: [0.25, 0, 0, 1] }}>
            <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "rgba(255,255,255,0.65)", textTransform: "uppercase", marginBottom: "1.5rem" }}>New Season — Resort 2025</p>
            <h1 className="serif" style={{ fontSize: "clamp(3rem, 6vw, 6rem)", fontWeight: 300, color: "#fff", lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: "2rem", maxWidth: 600 }}>
              The Art of<br />Considered<br />Dressing
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", maxWidth: 360, lineHeight: 1.7, marginBottom: "2.5rem", fontWeight: 300 }}>
              A curated edit of exceptional pieces, crafted with intention and worn with quiet confidence.
            </p>
            <button onClick={() => setView("shop")} style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", padding: "14px 32px", borderRadius: 4, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "background 0.3s" }}>
              Explore Collections
            </button>
          </motion.div>
        </div>
        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 1, height: 40, background: "rgba(255,255,255,0.3)" }} />
        </motion.div>
      </section>

      {/* Collections Grid */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "6rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontSize: 11, letterSpacing: "0.35em", color: "#8a887e", textTransform: "uppercase", marginBottom: "0.75rem" }}>Our Maisons</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="serif" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 300, color: "#0f0f0d" }}>Four Distinct Worlds</motion.h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
          {COLLECTIONS.map((col, i) => (
            <motion.div key={col.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              onClick={() => setView("shop")} style={{ cursor: "pointer", position: "relative", overflow: "hidden", borderRadius: 4 }}>
              <div style={{ aspectRatio: "3/4", overflow: "hidden" }}>
                <motion.img whileHover={{ scale: 1.06 }} transition={{ duration: 0.6, ease: [0.25, 0, 0, 1] }}
                  src={col.image} alt={col.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)", padding: "2rem 1.25rem 1.25rem" }}>
                <p className="serif" style={{ fontSize: 22, fontWeight: 400, color: "#fff", marginBottom: 4 }}>{col.name}</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{col.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Editorial lifestyle banner */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2rem 5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "stretch" }}>
          {/* Left — tall portrait */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ position: "relative", overflow: "hidden", borderRadius: 4 }}>
            <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=85" alt="Editorial"
              style={{ width: "100%", height: "100%", minHeight: 520, objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,15,13,0.55) 0%, transparent 55%)" }} />
            <div style={{ position: "absolute", bottom: "2rem", left: "2rem", right: "2rem" }}>
              <p className="serif" style={{ fontSize: 28, fontWeight: 300, color: "#fff", lineHeight: 1.2, marginBottom: 8 }}>The Atelier Edit</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginBottom: "1.25rem" }}>Handcrafted in European ateliers since 1982.</p>
              <button onClick={() => setView("shop")} style={{ background: "none", border: "1px solid rgba(255,255,255,0.6)", color: "#fff", padding: "9px 20px", borderRadius: 4, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                Explore
              </button>
            </div>
          </motion.div>
          {/* Right — stacked two landscape images */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              style={{ position: "relative", overflow: "hidden", borderRadius: 4, flex: 1 }}>
              <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=85" alt="Maison accessories"
                style={{ width: "100%", height: "100%", minHeight: 240, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,15,13,0.5) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem" }}>
                <p className="serif" style={{ fontSize: 20, fontWeight: 300, color: "#fff" }}>Maison Accessories</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 3 }}>Handcrafted in Florence</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
              style={{ position: "relative", overflow: "hidden", borderRadius: 4, flex: 1 }}>
              <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&q=85" alt="Resort collection"
                style={{ width: "100%", height: "100%", minHeight: 240, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,15,13,0.5) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem" }}>
                <p className="serif" style={{ fontSize: 20, fontWeight: 300, color: "#fff" }}>Resort 2025</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 3 }}>Effortless warm-weather dressing</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured products carousel */}
      <section style={{ padding: "2rem 0 6rem", background: "#f5f3ef" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2rem 2rem" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem" }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.35em", color: "#8a887e", textTransform: "uppercase", marginBottom: "0.75rem" }}>Curated For You</p>
              <h2 className="serif" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 300, color: "#0f0f0d" }}>Featured Pieces</h2>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => scrollCarousel(-1)} disabled={!canScrollLeft}
                style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid #e8e6e0", background: canScrollLeft ? "#fff" : "#f0ede8", cursor: canScrollLeft ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                <ChevronLeft size={16} color={canScrollLeft ? "#0f0f0d" : "#c8c5be"} />
              </button>
              <button onClick={() => scrollCarousel(1)} disabled={!canScrollRight}
                style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid #e8e6e0", background: canScrollRight ? "#fff" : "#f0ede8", cursor: canScrollRight ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                <ChevronRight size={16} color={canScrollRight ? "#0f0f0d" : "#c8c5be"} />
              </button>
            </div>
          </div>
        </div>
        <div ref={carouselRef} style={{ display: "flex", gap: "1.25rem", overflowX: "auto", scrollbarWidth: "none", paddingLeft: "max(2rem, calc((100% - 1400px) / 2 + 2rem))", paddingRight: "2rem", paddingBottom: "1rem" }}>
          {PRODUCTS.map(p => (
            <div key={p.id} style={{ minWidth: 260, maxWidth: 260 }}>
              <ProductCard product={p} onSelect={prod => { setSelectedProduct(prod); setView("product-detail"); }} currency={currency} />
            </div>
          ))}
        </div>
      </section>

      {/* Brand proposition */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "6rem 2rem", textAlign: "center" }}>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ fontSize: 11, letterSpacing: "0.35em", color: "#8a887e", textTransform: "uppercase", marginBottom: "1.5rem" }}>Our Philosophy</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="serif" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, color: "#0f0f0d", lineHeight: 1.2, marginBottom: "2rem" }}>
          "Luxury is not about<br />cost — it is about intention."
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          style={{ fontSize: 16, color: "#6b6960", lineHeight: 1.8, maxWidth: 560, margin: "0 auto", fontWeight: 300 }}>
          Every piece in our atelier passes through the hands of master craftspeople. We partner with heritage workshops that have shaped fashion for generations.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          style={{ display: "flex", justifyContent: "center", gap: "3rem", marginTop: "3rem" }}>
          {[["Heritage", "Workshops"], ["Countries", "Of Origin"], ["Artisan", "Partners"]].map(([num, label], i) => (
            <div key={i}>
              <p className="serif" style={{ fontSize: 36, fontWeight: 300, color: "#0f0f0d", lineHeight: 1 }}>{i === 0 ? "14" : i === 1 ? "9" : "340+"}</p>
              <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8a887e", textTransform: "uppercase", marginTop: 4 }}>{num}<br />{label}</p>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

// ─── SHOP VIEW ─────────────────────────────────────────────────────────────

function ShopView({ setView, setSelectedProduct, currency }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sortBy, setSortBy] = useState("featured");
  const [filters, setFilters] = useState({ collections: [], priceMax: 5000, categories: [] });
  const allCollections = [...new Set(PRODUCTS.map(p => p.collection))];
  const allCategories = [...new Set(PRODUCTS.map(p => p.category))];

  const filtered = PRODUCTS.filter(p => {
    if (filters.collections.length && !filters.collections.includes(p.collection)) return false;
    if (filters.categories.length && !filters.categories.includes(p.category)) return false;
    if (p.price > filters.priceMax) return false;
    return true;
  }).sort((a, b) => sortBy === "price-asc" ? a.price - b.price : sortBy === "price-desc" ? b.price - a.price : sortBy === "rating" ? b.rating - a.rating : 0);

  const toggleFilter = (key, val) => {
    setFilters(f => ({ ...f, [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val] }));
  };

  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ borderBottom: "1px solid #f0ede8", background: "#fafaf8" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "2.5rem 2rem 1.5rem" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", color: "#8a887e", textTransform: "uppercase", marginBottom: 8 }}>All Collections</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <h1 className="serif" style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)", fontWeight: 300, color: "#0f0f0d" }}>The Complete Edit</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: 12, color: "#8a887e" }}>{filtered.length} pieces</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                style={{ fontSize: 12, color: "#3d3c37", border: "1px solid #e8e6e0", background: "#fff", padding: "7px 12px", borderRadius: 6, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <button onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{ fontSize: 12, color: "#3d3c37", border: "1px solid #e8e6e0", background: sidebarOpen ? "#0f0f0d" : "#fff", color: sidebarOpen ? "#fff" : "#3d3c37", padding: "7px 14px", borderRadius: 6, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}>
                {sidebarOpen ? "Hide" : "Show"} Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2rem", display: "flex", gap: "2.5rem" }}>
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 240 }} exit={{ opacity: 0, width: 0 }} transition={ease}
              style={{ minWidth: 240, paddingTop: "2.5rem", overflow: "hidden" }}>
              <div style={{ minWidth: 220 }}>
                <FilterSection title="Collections">
                  {allCollections.map(c => (
                    <label key={c} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "4px 0" }}>
                      <input type="checkbox" checked={filters.collections.includes(c)} onChange={() => toggleFilter("collections", c)} style={{ accentColor: "#064E3B" }} />
                      <span style={{ fontSize: 13, color: "#3d3c37" }}>{c}</span>
                    </label>
                  ))}
                </FilterSection>
                <FilterSection title="Category">
                  {allCategories.map(c => (
                    <label key={c} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "4px 0" }}>
                      <input type="checkbox" checked={filters.categories.includes(c)} onChange={() => toggleFilter("categories", c)} style={{ accentColor: "#064E3B" }} />
                      <span style={{ fontSize: 13, color: "#3d3c37" }}>{c}</span>
                    </label>
                  ))}
                </FilterSection>
                <FilterSection title="Price Range">
                  <div style={{ padding: "4px 0" }}>
                    <input type="range" min={200} max={5000} step={100} value={filters.priceMax}
                      onChange={e => setFilters(f => ({ ...f, priceMax: +e.target.value }))}
                      style={{ width: "100%", accentColor: "#064E3B" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                      <span style={{ fontSize: 12, color: "#8a887e" }}>$0</span>
                      <span style={{ fontSize: 12, color: "#0f0f0d", fontWeight: 500 }}>${filters.priceMax.toLocaleString()}</span>
                    </div>
                  </div>
                </FilterSection>
                {(filters.collections.length > 0 || filters.categories.length > 0 || filters.priceMax < 5000) && (
                  <button onClick={() => setFilters({ collections: [], priceMax: 5000, categories: [] })}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#064E3B", letterSpacing: "0.05em", padding: "8px 0", fontFamily: "'DM Sans', sans-serif" }}>
                    Clear all filters
                  </button>
                )}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Grid */}
        <div style={{ flex: 1, paddingTop: "2.5rem", paddingBottom: "4rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${sidebarOpen ? 3 : 4}, 1fr)`, gap: "1.75rem 1.5rem" }}>
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onSelect={prod => { setSelectedProduct(prod); setView("product-detail"); }} currency={currency} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderBottom: "1px solid #f0ede8", paddingBottom: "1.25rem", marginBottom: "1.25rem" }}>
      <button onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "none", border: "none", cursor: "pointer", padding: "0 0 8px", fontFamily: "'DM Sans', sans-serif" }}>
        <span style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#3d3c37", fontWeight: 500 }}>{title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={14} color="#8a887e" /></motion.span>
      </button>
      <AnimatePresence>{open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>{children}</motion.div>}</AnimatePresence>
    </div>
  );
}

// ─── PRODUCT DETAIL VIEW ─────────────────────────────────────────────────────

function ProductDetailView({ product, setView, setSelectedProduct, currency }) {
  const { dispatch } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [accordionOpen, setAccordionOpen] = useState(null);
  const [reviewTab, setReviewTab] = useState("description");
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleAdd = () => {
    if (!selectedSize) { alert("Please select a size."); return; }
    setAdding(true);
    setTimeout(() => {
      dispatch({ type: "ADD", item: { ...product, selectedColor, selectedSize } });
      setAdding(false);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }, 900);
  };

  const accordions = [
    { id: "specs", title: "Composition & Care", content: product.specs },
    { id: "sustain", title: "Sustainability", content: product.sustainability },
    { id: "shipping", title: "Delivery & Returns", content: "Complimentary standard shipping worldwide (3–5 days). Express options available at checkout. Free returns within 30 days." },
  ];

  const mockReviews = [
    { name: "A. Laurent", rating: 5, text: "Absolutely sublime quality. The drape is exactly as photographed.", date: "March 2025" },
    { name: "Y. Tanaka", rating: 5, text: "Worth every penny. Received so many compliments.", date: "February 2025" },
    { name: "C. Bergström", rating: 4, text: "Beautiful piece, sizing runs slightly large.", date: "January 2025" },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "1.25rem 2rem", display: "flex", alignItems: "center", gap: 6 }}>
        <button onClick={() => setView("home")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#8a887e", fontFamily: "'DM Sans', sans-serif" }}>Home</button>
        <span style={{ color: "#c8c5be", fontSize: 12 }}>/</span>
        <button onClick={() => setView("shop")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#8a887e", fontFamily: "'DM Sans', sans-serif" }}>{product.collection}</button>
        <span style={{ color: "#c8c5be", fontSize: 12 }}>/</span>
        <span style={{ fontSize: 12, color: "#0f0f0d" }}>{product.name}</span>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2rem 6rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
        {/* Image gallery */}
        <div style={{ display: "flex", gap: "1rem" }}>
          {/* Thumbnails */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImage(i)}
                style={{ width: 72, height: 86, border: i === activeImage ? "2px solid #0f0f0d" : "2px solid transparent", borderRadius: 4, overflow: "hidden", cursor: "pointer", padding: 0 }}>
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </button>
            ))}
          </div>
          {/* Main image */}
          <div style={{ flex: 1, position: "relative", borderRadius: 4, overflow: "hidden", aspectRatio: "3/4" }}>
            <AnimatePresence mode="wait">
              <motion.img key={activeImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                src={product.images[activeImage]} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </AnimatePresence>
            <button style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(255,255,255,0.85)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <ZoomIn size={15} color="#0f0f0d" />
            </button>
          </div>
        </div>

        {/* Product info — sticky */}
        <div style={{ position: "sticky", top: 92, height: "fit-content" }}>
          <div style={{ marginBottom: "0.5rem", display: "flex", gap: 4 }}>
            {[...Array(Math.floor(product.rating))].map((_, i) => <Star key={i} size={12} fill="#D4AF37" color="#D4AF37" />)}
            <span style={{ fontSize: 12, color: "#8a887e", marginLeft: 4 }}>{product.rating} ({product.reviews} reviews)</span>
          </div>

          <p style={{ fontSize: 11, letterSpacing: "0.25em", color: "#8a887e", textTransform: "uppercase", marginBottom: 8 }}>{product.collection}</p>
          <h1 className="serif" style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)", fontWeight: 300, color: "#0f0f0d", lineHeight: 1.1, marginBottom: "1rem" }}>{product.name}</h1>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.75rem" }}>
            <span style={{ fontSize: 22, fontWeight: 400, color: product.originalPrice ? "#064E3B" : "#0f0f0d" }}>{fmt(product.price, currency.symbol)}</span>
            {product.originalPrice && <span style={{ fontSize: 16, color: "#b8b5ae", textDecoration: "line-through" }}>{fmt(product.originalPrice, currency.symbol)}</span>}
          </div>

          {/* Color */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontSize: 12, letterSpacing: "0.1em", color: "#3d3c37", marginBottom: "0.75rem" }}>
              Colour: <strong style={{ fontWeight: 500 }}>{selectedColor}</strong>
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {product.colors.map(c => (
                <button key={c} onClick={() => setSelectedColor(c)} title={c}
                  style={{ width: 28, height: 28, borderRadius: "50%", cursor: "pointer", border: selectedColor === c ? "2px solid #0f0f0d" : "2px solid transparent", outline: selectedColor === c ? "2px solid #fff" : "none", outlineOffset: "-3px", background: c === "Ivory" || c === "Ecru" || c === "Champagne" ? "#f0ede0" : c === "Noir" || c === "Onyx" || c === "Ebony" ? "#1a1a18" : c === "Sage" ? "#7d8c6e" : c === "Camel" ? "#c8935a" : c === "Charcoal" ? "#4a4845" : c === "Cognac" || c === "Tan" ? "#a0643c" : c === "Blush" || c === "Rose" || c === "Pink" ? "#e8b4b0" : c === "Midnight" || c === "Navy" ? "#1e3a5f" : c === "Sand" ? "#d4b896" : c === "Oat" ? "#e8e0d0" : c === "Slate" ? "#7a8090" : c === "Powder" ? "#e0e8f0" : c === "Sky" ? "#a8c4d8" : c === "Chocolate" ? "#5c3520" : "#c8c5be", transition: "border 0.2s" }} />
              ))}
            </div>
          </div>

          {/* Size */}
          <div style={{ marginBottom: "1.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <p style={{ fontSize: 12, letterSpacing: "0.1em", color: "#3d3c37" }}>Size</p>
              <button style={{ fontSize: 12, color: "#064E3B", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "'DM Sans', sans-serif" }}>Size Guide</button>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {product.sizes.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)}
                  style={{ minWidth: 44, padding: "8px 12px", border: `1px solid ${selectedSize === s ? "#0f0f0d" : "#e8e6e0"}`, borderRadius: 4, background: selectedSize === s ? "#0f0f0d" : "#fff", color: selectedSize === s ? "#fff" : "#3d3c37", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.75rem" }}>
            <motion.button onClick={handleAdd} disabled={adding}
              whileTap={{ scale: 0.98 }}
              style={{ flex: 1, background: added ? "#064E3B" : "#0f0f0d", color: "#fff", border: "none", borderRadius: 8, padding: "15px", fontSize: 12, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", cursor: adding ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "'DM Sans', sans-serif", transition: "background 0.3s" }}>
              {adding ? <><Loader size={14} style={{ animation: "spin 1s linear infinite" }} /> Adding…</> : added ? <><Check size={14} /> Added to Bag</> : "Add to Bag"}
            </motion.button>
            <button onClick={() => setLiked(!liked)}
              style={{ width: 52, height: 52, border: "1px solid #e8e6e0", borderRadius: 8, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Heart size={18} fill={liked ? "#b0443a" : "none"} color={liked ? "#b0443a" : "#6b6960"} />
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", gap: "1.25rem", padding: "1.25rem 0", borderTop: "1px solid #f0ede8", borderBottom: "1px solid #f0ede8", marginBottom: "1.5rem" }}>
            {[[Truck, "Free Shipping"], [RotateCcw, "30-Day Returns"], [Shield, "Authenticity Guaranteed"]].map(([Icon, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Icon size={14} color="#8a887e" />
                <span style={{ fontSize: 11, color: "#6b6960" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Accordions */}
          <div>
            {accordions.map(a => (
              <div key={a.id} style={{ borderBottom: "1px solid #f0ede8" }}>
                <button onClick={() => setAccordionOpen(accordionOpen === a.id ? null : a.id)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "1rem 0", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                  <span style={{ fontSize: 13, color: "#0f0f0d", fontWeight: 400, letterSpacing: "0.05em" }}>{a.title}</span>
                  <motion.span animate={{ rotate: accordionOpen === a.id ? 45 : 0 }} transition={{ duration: 0.2 }}>
                    <Plus size={14} color="#8a887e" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {accordionOpen === a.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                      style={{ overflow: "hidden" }}>
                      <p style={{ fontSize: 13, color: "#6b6960", lineHeight: 1.7, paddingBottom: "1rem" }}>{a.content}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Review tabs */}
          <div style={{ marginTop: "2rem" }}>
            <div style={{ display: "flex", gap: "1.5rem", borderBottom: "1px solid #f0ede8", marginBottom: "1.25rem" }}>
              {[["description", "Description"], ["reviews", `Reviews (${product.reviews})`]].map(([key, label]) => (
                <button key={key} onClick={() => setReviewTab(key)}
                  style={{ background: "none", border: "none", padding: "0 0 12px", cursor: "pointer", fontSize: 12, letterSpacing: "0.05em", color: reviewTab === key ? "#0f0f0d" : "#8a887e", borderBottom: reviewTab === key ? "2px solid #0f0f0d" : "2px solid transparent", marginBottom: -1, fontFamily: "'DM Sans', sans-serif" }}>
                  {label}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {reviewTab === "description" ? (
                <motion.p key="desc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ fontSize: 14, color: "#4a4845", lineHeight: 1.8, fontWeight: 300 }}>{product.description}</motion.p>
              ) : (
                <motion.div key="reviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {mockReviews.map((r, i) => (
                    <div key={i} style={{ paddingBottom: "1rem", marginBottom: "1rem", borderBottom: i < mockReviews.length - 1 ? "1px solid #f5f3ef" : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{r.name}</span>
                        <span style={{ fontSize: 11, color: "#8a887e" }}>{r.date}</span>
                      </div>
                      <div style={{ display: "flex", gap: 2, marginBottom: 6 }}>
                        {[...Array(r.rating)].map((_, j) => <Star key={j} size={11} fill="#D4AF37" color="#D4AF37" />)}
                      </div>
                      <p style={{ fontSize: 13, color: "#6b6960", lineHeight: 1.6 }}>{r.text}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* ── Related Products ── */}
      <section style={{ background: "#f5f3ef", padding: "5rem 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ marginBottom: "3rem" }}>
            <p style={{ fontSize: 11, letterSpacing: "0.35em", color: "#8a887e", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              From the {product.collection} Collection
            </p>
            <h2 className="serif" style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)", fontWeight: 300, color: "#0f0f0d" }}>
              You May Also Love
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
            {PRODUCTS.filter(p => p.id !== product.id && (p.collection === product.collection || p.category === product.category)).slice(0, 4).map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                onClick={() => { setSelectedProduct(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{ cursor: "pointer" }}>
                <RelatedProductCard product={p} currency={currency} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function RelatedProductCard({ product, currency }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ position: "relative", overflow: "hidden", borderRadius: 4, marginBottom: "0.875rem", aspectRatio: "3/4", background: "#e8e5e0" }}>
        <motion.img src={product.images[0]} alt={product.name}
          animate={{ scale: hovered ? 1.04 : 1 }} transition={{ duration: 0.6, ease: [0.25, 0, 0, 1] }}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <motion.img src={product.images[1]} alt=""
          animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.4 }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <p style={{ fontSize: 10, letterSpacing: "0.2em", color: "#8a887e", textTransform: "uppercase", marginBottom: 3 }}>{product.collection}</p>
      <p style={{ fontSize: 14, color: "#0f0f0d", marginBottom: 5 }}>{product.name}</p>
      <span style={{ fontSize: 14, color: product.originalPrice ? "#064E3B" : "#0f0f0d" }}>{fmt(product.price, currency.symbol)}</span>
      {product.originalPrice && <span style={{ fontSize: 13, color: "#b8b5ae", textDecoration: "line-through", marginLeft: 8 }}>{fmt(product.originalPrice, currency.symbol)}</span>}
    </div>
  );
}

// ─── CHECKOUT VIEW ────────────────────────────────────────────────────────────

function CheckoutView({ setView, currency }) {
  const { items, subtotal, dispatch } = useCart();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", address: "", city: "", country: "United States", postal: "", phone: "", shipping: "standard", card: "", expiry: "", cvv: "", cardName: "" });
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);

  const steps = ["Address", "Shipping", "Payment"];

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else {
      setProcessing(true);
      setTimeout(() => { setProcessing(false); setComplete(true); dispatch({ type: "CLEAR" }); }, 2500);
    }
  };

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  if (complete) {
    return (
      <div style={{ paddingTop: 72, minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} style={{ textAlign: "center", maxWidth: 480, padding: "0 2rem" }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, ...spring }}
            style={{ width: 80, height: 80, borderRadius: "50%", background: "#064E3B", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem" }}>
            <Check size={36} color="#fff" />
          </motion.div>
          <h1 className="serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#0f0f0d", marginBottom: "1rem" }}>Order Confirmed</h1>
          <p style={{ fontSize: 15, color: "#6b6960", lineHeight: 1.7, marginBottom: "0.75rem" }}>Thank you for your order. A confirmation has been sent to {form.email || "your email"}.</p>
          <p style={{ fontSize: 13, color: "#8a887e", marginBottom: "2.5rem" }}>Your pieces will arrive within 3–5 business days via complimentary express shipping.</p>
          <button onClick={() => setView("home")} style={{ background: "#0f0f0d", color: "#fff", border: "none", borderRadius: 8, padding: "14px 32px", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            Return Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 72, minHeight: "90vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem", display: "grid", gridTemplateColumns: "1fr 360px", gap: "4rem" }}>
        {/* Left: form */}
        <div>
          {/* Steps */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "3rem" }}>
            {steps.map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: i <= step ? "#064E3B" : "#f0ede8", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>
                  {i < step ? <Check size={13} color="#fff" /> : <span style={{ fontSize: 12, color: i <= step ? "#fff" : "#8a887e", fontWeight: 500 }}>{i + 1}</span>}
                </div>
                <span style={{ fontSize: 13, color: i === step ? "#0f0f0d" : "#8a887e", fontWeight: i === step ? 500 : 400 }}>{s}</span>
                {i < steps.length - 1 && <ChevronRight size={14} color="#c8c5be" />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="address" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={ease}>
                <h2 className="serif" style={{ fontSize: 28, fontWeight: 300, color: "#0f0f0d", marginBottom: "2rem" }}>Delivery Address</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[["firstName", "First Name"], ["lastName", "Last Name"]].map(([k, label]) => (
                    <Field key={k} label={label} value={form[k]} onChange={v => upd(k, v)} />
                  ))}
                </div>
                <Field label="Email Address" value={form.email} onChange={v => upd("email", v)} type="email" />
                <Field label="Phone Number" value={form.phone} onChange={v => upd("phone", v)} />
                <Field label="Street Address" value={form.address} onChange={v => upd("address", v)} />
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
                  <Field label="City" value={form.city} onChange={v => upd("city", v)} />
                  <Field label="Postal Code" value={form.postal} onChange={v => upd("postal", v)} />
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <label style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6960", display: "block", marginBottom: 6 }}>Country</label>
                  <select value={form.country} onChange={e => upd("country", e.target.value)}
                    style={{ width: "100%", padding: "12px 16px", border: "1px solid #e8e6e0", borderRadius: 6, fontSize: 14, color: "#0f0f0d", background: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
                    {["United States", "United Kingdom", "France", "Germany", "Japan", "Australia", "Canada"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={ease}>
                <h2 className="serif" style={{ fontSize: 28, fontWeight: 300, color: "#0f0f0d", marginBottom: "2rem" }}>Shipping Method</h2>
                {[["standard", "Standard Shipping", "3–5 Business Days", subtotal >= 3000 ? "Complimentary" : "$18"], ["express", "Express Shipping", "1–2 Business Days", "$42"], ["overnight", "Overnight", "Next Business Day", "$95"]].map(([val, name, days, price]) => (
                  <label key={val} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem 1.5rem", border: `1px solid ${form.shipping === val ? "#064E3B" : "#e8e6e0"}`, borderRadius: 8, marginBottom: "0.75rem", cursor: "pointer", background: form.shipping === val ? "#f0faf6" : "#fff", transition: "all 0.2s" }}>
                    <input type="radio" name="shipping" value={val} checked={form.shipping === val} onChange={() => upd("shipping", val)} style={{ accentColor: "#064E3B" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <p style={{ fontSize: 14, fontWeight: 500, color: "#0f0f0d" }}>{name}</p>
                        {val === "standard" && subtotal >= 3000 && <span style={{ fontSize: 10, background: "#064E3B", color: "#fff", padding: "2px 8px", borderRadius: 100, letterSpacing: "0.1em" }}>UNLOCKED</span>}
                      </div>
                      <p style={{ fontSize: 12, color: "#8a887e" }}>{days}</p>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#0f0f0d" }}>{price}</span>
                  </label>
                ))}
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={ease}>
                <h2 className="serif" style={{ fontSize: 28, fontWeight: 300, color: "#0f0f0d", marginBottom: "0.5rem" }}>Payment Details</h2>
                <p style={{ fontSize: 13, color: "#8a887e", marginBottom: "2rem", display: "flex", alignItems: "center", gap: 6 }}>
                  <Shield size={13} /> All transactions are encrypted and secured
                </p>
                <div style={{ padding: "1.5rem", border: "1px solid #e8e6e0", borderRadius: 12, marginBottom: "1.5rem" }}>
                  <Field label="Cardholder Name" value={form.cardName} onChange={v => upd("cardName", v)} />
                  <Field label="Card Number" value={form.card} onChange={v => upd("card", v)} placeholder="1234 5678 9012 3456" />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <Field label="Expiry Date" value={form.expiry} onChange={v => upd("expiry", v)} placeholder="MM / YY" />
                    <Field label="CVV" value={form.cvv} onChange={v => upd("cvv", v)} placeholder="•••" />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.5rem" }}>
                  {["visa", "mastercard", "amex", "paypal"].map(brand => (
                    <div key={brand} style={{ padding: "4px 10px", border: "1px solid #e8e6e0", borderRadius: 4, fontSize: 10, color: "#8a887e", letterSpacing: "0.1em" }}>{brand.toUpperCase()}</div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem" }}>
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} style={{ background: "none", border: "1px solid #e8e6e0", borderRadius: 8, padding: "14px 24px", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", color: "#6b6960", fontFamily: "'DM Sans', sans-serif" }}>
                Back
              </button>
            )}
            <motion.button onClick={handleNext} disabled={processing} whileTap={{ scale: 0.98 }}
              style={{ flex: 1, background: processing ? "#064E3B" : "#0f0f0d", color: "#fff", border: "none", borderRadius: 8, padding: "15px", fontSize: 12, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", cursor: processing ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "'DM Sans', sans-serif", transition: "background 0.3s" }}>
              {processing ? <><Loader size={14} style={{ animation: "spin 1s linear infinite" }} /> Processing Payment…</> : step < 2 ? "Continue" : `Pay ${fmt(subtotal, currency.symbol)}`}
            </motion.button>
          </div>
        </div>

        {/* Right: order summary */}
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 500, color: "#0f0f0d", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid #f0ede8" }}>Order Summary</h3>
          <div style={{ marginBottom: "1.5rem" }}>
            {items.map(item => (
              <div key={item.key} style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ position: "relative" }}>
                  <img src={item.images[0]} alt={item.name} style={{ width: 60, height: 72, objectFit: "cover", borderRadius: 4 }} />
                  <span style={{ position: "absolute", top: -6, right: -6, background: "#6b6960", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>{item.qty}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "#0f0f0d", marginBottom: 2 }}>{item.name}</p>
                  <p style={{ fontSize: 11, color: "#8a887e" }}>{item.selectedColor} · {item.selectedSize}</p>
                </div>
                <span style={{ fontSize: 13, color: "#0f0f0d" }}>{fmt(item.price * item.qty, currency.symbol)}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #f0ede8", paddingTop: "1rem" }}>
            {[["Subtotal", fmt(subtotal, currency.symbol)], ["Shipping", subtotal >= 3000 ? "Complimentary" : form.shipping === "express" ? fmt(42, currency.symbol) : form.shipping === "overnight" ? fmt(95, currency.symbol) : fmt(18, currency.symbol)]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "#6b6960" }}>{k}</span>
                <span style={{ fontSize: 13, color: "#0f0f0d" }}>{v}</span>
              </div>
            ))}
            <div style={{ height: "1px", background: "#f0ede8", margin: "12px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 15, fontWeight: 500 }}>Total</span>
              <span style={{ fontSize: 15, fontWeight: 500 }}>{fmt(subtotal, currency.symbol)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div style={{ marginTop: "1rem" }}>
      <label style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6960", display: "block", marginBottom: 6 }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", padding: "12px 16px", border: "1px solid #e8e6e0", borderRadius: 6, fontSize: 14, color: "#0f0f0d", background: "#fff", fontFamily: "'DM Sans', sans-serif", outline: "none", transition: "border 0.2s" }}
        onFocus={e => e.target.style.borderColor = "#064E3B"} onBlur={e => e.target.style.borderColor = "#e8e6e0"} />
    </div>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────

function Footer({ setView }) {
  return (
    <footer style={{ borderTop: "1px solid #f0ede8", background: "#fafaf8", padding: "4rem 2rem 2rem" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
          <div>
            <div style={{ marginBottom: "1.25rem" }}>
              <span className="serif" style={{ fontSize: 20, fontWeight: 500, letterSpacing: "0.15em", color: "#0f0f0d", display: "block" }}>MAISON</span>
              <span style={{ fontSize: 9, fontWeight: 300, letterSpacing: "0.5em", color: "#8a887e", textTransform: "uppercase" }}>LUMIÈRE</span>
            </div>
            <p style={{ fontSize: 13, color: "#6b6960", lineHeight: 1.7, maxWidth: 280 }}>Devoted to exceptional craftsmanship, enduring design, and the art of considered living.</p>
          </div>
          {[["Collections", ["Atelier", "Essentials", "Maison", "Resort"]], ["Company", ["Our Story", "Ateliers", "Sustainability", "Press"]], ["Customer Care", ["Shipping", "Returns", "Size Guide", "Contact"]]].map(([title, links]) => (
            <div key={title}>
              <p style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#3d3c37", fontWeight: 500, marginBottom: "1rem" }}>{title}</p>
              {links.map(l => <button key={l} onClick={() => l === "Atelier" || l === "Essentials" || l === "Maison" || l === "Resort" ? setView("shop") : null} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#6b6960", padding: "3px 0", fontFamily: "'DM Sans', sans-serif", textAlign: "left" }}>{l}</button>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #f0ede8", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 12, color: "#8a887e" }}>© 2025 Maison Lumière. All rights reserved.</p>
          <p style={{ fontSize: 12, color: "#8a887e" }}>Crafted with intention.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [lang, setLang] = useState("English");

  useEffect(() => {
    document.body.classList.toggle("no-scroll", cartOpen || searchOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [cartOpen, searchOpen]);

  const handleSetView = (v) => { setView(v); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <CartProvider>
      <GlobalStyles />
      <Header view={view} setView={handleSetView} cartOpen={cartOpen} setCartOpen={setCartOpen} searchOpen={searchOpen} setSearchOpen={setSearchOpen} currency={currency} setCurrency={setCurrency} lang={lang} setLang={setLang} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} setView={handleSetView} setSelectedProduct={setSelectedProduct} currency={currency} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} currency={currency} setView={handleSetView} />

      <AnimatePresence mode="wait">
        <motion.main key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          {view === "home" && <HomeView setView={handleSetView} setSelectedProduct={setSelectedProduct} currency={currency} />}
          {view === "shop" && <ShopView setView={handleSetView} setSelectedProduct={setSelectedProduct} currency={currency} />}
          {view === "product-detail" && selectedProduct && <ProductDetailView product={selectedProduct} setView={handleSetView} setSelectedProduct={setSelectedProduct} currency={currency} />}
          {view === "checkout" && <CheckoutView setView={handleSetView} currency={currency} />}
        </motion.main>
      </AnimatePresence>

      {view !== "checkout" && <Footer setView={handleSetView} />}
    </CartProvider>
  );
} 