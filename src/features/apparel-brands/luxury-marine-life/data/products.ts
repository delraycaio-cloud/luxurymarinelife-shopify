import type { Product, Testimonial, Collection } from "../types";

export const products: Product[] = [
  {
    id: "1",
    name: "Apex Marine Polo",
    description:
      "Our signature performance polo engineered for life on the water. Crafted from premium moisture-wicking fabric with UPF 50+ protection, this polo delivers uncompromising comfort and style for the discerning mariner.",
    price: 185,
    image: "/product-polo.webp",
    images: ["/product-polo.webp", "/hero-main.webp", "/lifestyle-couple.webp"],
    category: "Polos",
    tags: ["Bestseller", "Performance", "UPF 50+"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Midnight Navy", hex: "#1a2a44" },
      { name: "Pearl White", hex: "#f8f6f3" },
      { name: "Ocean Teal", hex: "#1e6b7a" },
    ],
    features: [
      "UPF 50+ Sun Protection",
      "Moisture-Wicking Technology",
      "Saltwater Resistant",
      "Quick-Dry Fabric",
      "Antimicrobial Treatment",
      "Four-Way Stretch",
    ],
    inStock: true,
    isNew: false,
  },
  {
    id: "2",
    name: "Offshore Performance Jacket",
    description:
      "Engineered for the most demanding offshore conditions. This lightweight yet durable jacket features our proprietary MarineShield technology, providing waterproof protection without sacrificing breathability.",
    price: 395,
    image: "/product-jacket.webp",
    images: ["/product-jacket.webp", "/lifestyle-sailing.webp", "/hero-main.webp"],
    category: "Outerwear",
    tags: ["Limited Edition", "Waterproof", "Breathable"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Carbon Black", hex: "#0d1117" },
      { name: "Deep Navy", hex: "#0a1628" },
    ],
    features: [
      "MarineShield Waterproof Technology",
      "Breathable Membrane",
      "Welded Seams",
      "Adjustable Hood",
      "Reflective Details",
      "Multiple Secure Pockets",
    ],
    inStock: true,
    isLimited: true,
    isNew: true,
  },
  {
    id: "3",
    name: "Coastal Performance Tee",
    description:
      "The perfect foundation for your marine wardrobe. This ultra-soft performance tee is crafted from recycled ocean plastics, combining sustainability with exceptional comfort and durability.",
    price: 125,
    image: "/product-tee.webp",
    images: ["/product-tee.webp", "/lifestyle-woman.webp", "/ocean-underwater.webp"],
    category: "T-Shirts",
    tags: ["Sustainable", "Recycled Materials", "Soft Touch"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Ocean Teal", hex: "#1e6b7a" },
      { name: "Coral Sand", hex: "#e8d5c4" },
      { name: "Midnight", hex: "#0a1628" },
    ],
    features: [
      "Made from Recycled Ocean Plastics",
      "UPF 40+ Protection",
      "Odor-Resistant",
      "Quick-Dry Technology",
      "Flatlock Seams",
      "Athletic Fit",
    ],
    inStock: true,
    isNew: true,
  },
  {
    id: "4",
    name: "Regatta Board Shorts",
    description:
      "Premium board shorts designed for performance and style. Featuring our innovative HydroGlide fabric that repels water and dries in minutes, these shorts are perfect for any water activity.",
    price: 165,
    image: "/product-shorts.webp",
    images: ["/product-shorts.webp", "/lifestyle-sailing.webp", "/hero-main.webp"],
    category: "Shorts",
    tags: ["Quick-Dry", "Water Repellent", "Performance"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: [
      { name: "Deep Navy", hex: "#0a1628" },
      { name: "Stone Grey", hex: "#6b7280" },
    ],
    features: [
      "HydroGlide Water-Repellent Fabric",
      "Quick-Dry Technology",
      "Secure Zip Pocket",
      "Adjustable Waistband",
      "Four-Way Stretch",
      "UPF 50+ Protection",
    ],
    inStock: true,
  },
  {
    id: "5",
    name: "Harbor Cashmere Sweater",
    description:
      "Luxurious cashmere meets marine-inspired design. This exceptionally soft sweater is perfect for cool evenings on the water, featuring a refined silhouette and timeless elegance.",
    price: 425,
    image: "/product-sweater.webp",
    images: ["/product-sweater.webp", "/lifestyle-couple.webp", "/hero-main.webp"],
    category: "Knitwear",
    tags: ["Luxury", "Cashmere", "Limited"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Pearl White", hex: "#f8f6f3" },
      { name: "Heather Grey", hex: "#9ca3af" },
      { name: "Navy", hex: "#1a2a44" },
    ],
    features: [
      "100% Mongolian Cashmere",
      "Lightweight yet Warm",
      "Reinforced Seams",
      "Classic Fit",
      "Pre-Shrunk",
      "Hand-Finished Details",
    ],
    inStock: true,
    isLimited: true,
  },
  {
    id: "6",
    name: "Mediterranean Linen Shirt",
    description:
      "Breathable luxury for warm coastal days. Crafted from the finest Italian linen, this shirt offers unparalleled comfort and effortless style for the sophisticated traveler.",
    price: 245,
    image: "/product-linen.webp",
    images: ["/product-linen.webp", "/lifestyle-couple.webp", "/lifestyle-woman.webp"],
    category: "Shirts",
    tags: ["Italian Linen", "Breathable", "Summer Essential"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Sand Beige", hex: "#d4c4a8" },
      { name: "Crisp White", hex: "#ffffff" },
      { name: "Soft Blue", hex: "#93c5fd" },
    ],
    features: [
      "100% Italian Linen",
      "Breathable & Lightweight",
      "Natural Wrinkle Texture",
      "Mother of Pearl Buttons",
      "Relaxed Fit",
      "Reinforced Collar",
    ],
    inStock: true,
    isNew: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Captain James Morrison",
    role: "Yacht Captain, Mediterranean Fleet",
    image: "/testimonial-1.webp",
    quote:
      "After 20 years at sea, I've finally found apparel that matches the demands of professional maritime life. The quality is unmatched, and the performance is exceptional.",
    rating: 5,
  },
  {
    id: "2",
    name: "Alexandra Chen",
    role: "Ocean Conservationist",
    image: "/testimonial-2.webp",
    quote:
      "Luxury Marine Life represents everything I believe in: exceptional quality, sustainable practices, and a genuine commitment to ocean preservation. Their 10% pledge makes every purchase meaningful.",
    rating: 5,
  },
  {
    id: "3",
    name: "Marcus Webb",
    role: "Professional Sailor",
    image: "/testimonial-3.webp",
    quote:
      "From competitive racing to leisure cruising, this gear performs flawlessly. The attention to detail and fabric technology is truly world-class.",
    rating: 5,
  },
];

export const collections: Collection[] = [
  {
    id: "1",
    name: "Performance Collection",
    description: "Engineered for peak performance in marine environments",
    image: "/lifestyle-sailing.webp",
    productCount: 12,
  },
  {
    id: "2",
    name: "Resort Collection",
    description: "Effortless elegance for coastal living",
    image: "/lifestyle-couple.webp",
    productCount: 8,
  },
  {
    id: "3",
    name: "Expedition Collection",
    description: "Built for the most demanding offshore adventures",
    image: "/hero-main.webp",
    productCount: 6,
  },
];

