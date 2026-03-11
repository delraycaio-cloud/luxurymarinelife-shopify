import type { Product, LookbookItem, SizeGuide, NavItem } from '@/features/apparel-brands/ac-yacht-club/types';

export const products: Product[] = [
  // APPAREL - Polos & Shirts
  {
    id: '1',
    name: 'Harbor Polo',
    description: 'Our signature polo crafted from premium Pima cotton with subtle gold anchor embroidery. Designed for effortless elegance on and off the deck.',
    price: 245,
    image: '/images/product-polo.jpg',
    images: ['/images/product-polo.jpg'],
    category: 'apparel',
    subcategory: 'polos',
    collection: 'The Founder Collection',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Navy', hex: '#0B1C2C' },
      { name: 'White', hex: '#F4F6FA' },
      { name: 'Ivory', hex: '#F5F0E8' }
    ],
    material: '100% Pima Cotton',
    craftsmanship: 'Italian craftsmanship with mother-of-pearl buttons',
    fit: 'regular',
    careInstructions: ['Machine wash cold', 'Tumble dry low', 'Do not bleach'],
    inStock: true,
    featured: true,
    isNew: false,
    isBestseller: true,
  },
  {
    id: '2',
    name: 'Midnight Cashmere Sweater',
    description: 'Luxurious cashmere sweater in deep midnight navy. Exceptionally soft, lightweight warmth for cool evenings on the water.',
    price: 685,
    image: '/images/product-sweater.jpg',
    images: ['/images/product-sweater.jpg'],
    category: 'apparel',
    subcategory: 'knitwear',
    collection: 'The Founder Collection',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Navy', hex: '#0B1C2C' },
      { name: 'Charcoal', hex: '#2D2D2D' }
    ],
    material: '100% Mongolian Cashmere',
    craftsmanship: 'Hand-finished in Scotland',
    fit: 'regular',
    careInstructions: ['Dry clean only', 'Do not wring'],
    inStock: true,
    featured: true,
    isNew: true,
    isBestseller: false,
  },
  {
    id: '3',
    name: 'Commodore Blazer',
    description: 'Double-breasted navy blazer with signature gold buttons. The definitive yacht club statement piece.',
    price: 1250,
    image: '/images/product-blazer.jpg',
    images: ['/images/product-blazer.jpg'],
    category: 'apparel',
    subcategory: 'blazers',
    collection: 'The Commodore Line',
    sizes: ['38', '40', '42', '44', '46', '48'],
    colors: [
      { name: 'Navy', hex: '#0B1C2C' }
    ],
    material: 'Italian Wool Blend',
    craftsmanship: 'Hand-tailored in Naples',
    fit: 'slim',
    careInstructions: ['Dry clean only'],
    inStock: true,
    featured: true,
    isNew: false,
    isBestseller: true,
  },
  {
    id: '9',
    name: 'Regatta Oxford Shirt',
    description: 'Classic oxford button-down in crisp white. The perfect foundation for any yacht club ensemble.',
    price: 195,
    image: '/images/product-polo.jpg',
    images: ['/images/product-polo.jpg'],
    category: 'apparel',
    subcategory: 'shirts',
    collection: 'The Founder Collection',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Light Blue', hex: '#E8F0F8' }
    ],
    material: '100% Egyptian Cotton',
    craftsmanship: 'Portuguese construction',
    fit: 'slim',
    careInstructions: ['Machine wash warm', 'Iron medium heat'],
    inStock: true,
    featured: false,
    isNew: true,
    isBestseller: false,
  },
  {
    id: '10',
    name: 'Marina Linen Shirt',
    description: 'Breathable Italian linen shirt for warm days on deck. Relaxed elegance with a refined drape.',
    price: 275,
    image: '/images/product-sweater.jpg',
    images: ['/images/product-sweater.jpg'],
    category: 'apparel',
    subcategory: 'shirts',
    collection: 'Summer Edit',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Natural', hex: '#E8E0D5' },
      { name: 'Navy', hex: '#0B1C2C' }
    ],
    material: '100% Italian Linen',
    craftsmanship: 'Woven in Bergamo',
    fit: 'relaxed',
    careInstructions: ['Machine wash cold', 'Hang dry'],
    inStock: true,
    featured: false,
    isNew: true,
    isBestseller: false,
  },
  {
    id: '11',
    name: 'Captain\'s Peacoat',
    description: 'Heavyweight wool peacoat with anchor buttons. Timeless naval heritage meets modern tailoring.',
    price: 895,
    image: '/images/product-blazer.jpg',
    images: ['/images/product-blazer.jpg'],
    category: 'apparel',
    subcategory: 'outerwear',
    collection: 'The Commodore Line',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Navy', hex: '#0B1C2C' }
    ],
    material: 'Melton Wool',
    craftsmanship: 'Made in England',
    fit: 'regular',
    careInstructions: ['Dry clean only'],
    inStock: true,
    featured: true,
    isNew: false,
    isBestseller: true,
  },
  // FOOTWEAR
  {
    id: '7',
    name: 'Deck Shoes',
    description: 'Classic navy boat shoes with white soles. Premium leather that ages beautifully with wear.',
    price: 295,
    image: '/images/product-shoes.jpg',
    images: ['/images/product-shoes.jpg'],
    category: 'footwear',
    subcategory: 'boat-shoes',
    collection: 'The Founder Collection',
    sizes: ['8', '9', '10', '11', '12', '13'],
    colors: [
      { name: 'Navy', hex: '#0B1C2C' },
      { name: 'Brown', hex: '#8B4513' }
    ],
    material: 'Full-Grain Leather',
    craftsmanship: 'Hand-sewn moccasin construction',
    inStock: true,
    featured: false,
    isNew: false,
    isBestseller: true,
  },
  {
    id: '12',
    name: 'Harbor Loafers',
    description: 'Sophisticated leather loafers with tassel detail. From deck to dinner with effortless style.',
    price: 425,
    image: '/images/product-shoes.jpg',
    images: ['/images/product-shoes.jpg'],
    category: 'footwear',
    subcategory: 'loafers',
    collection: 'The Commodore Line',
    sizes: ['8', '9', '10', '11', '12', '13'],
    colors: [
      { name: 'Cognac', hex: '#9A463D' },
      { name: 'Black', hex: '#1A1A1A' }
    ],
    material: 'Calf Leather',
    craftsmanship: 'Handmade in Italy',
    inStock: true,
    featured: true,
    isNew: true,
    isBestseller: false,
  },
  // ACCESSORIES
  {
    id: '4',
    name: 'Voyager Weekender',
    description: 'Handcrafted leather weekender bag with anchor embossing. The perfect companion for coastal escapes.',
    price: 895,
    image: '/images/product-bag.jpg',
    images: ['/images/product-bag.jpg'],
    category: 'accessories',
    subcategory: 'bags',
    collection: 'The Founder Collection',
    sizes: ['One Size'],
    colors: [
      { name: 'Cognac', hex: '#9A463D' }
    ],
    material: 'Full-Grain Italian Leather',
    craftsmanship: 'Hand-stitched in Florence',
    inStock: true,
    featured: true,
    isNew: false,
    isBestseller: true,
  },
  {
    id: '5',
    name: 'Heritage Silk Scarf',
    description: 'Pure silk scarf featuring nautical motifs in navy and gold. An elegant accent for any occasion.',
    price: 185,
    image: '/images/product-scarf.jpg',
    images: ['/images/product-scarf.jpg'],
    category: 'accessories',
    subcategory: 'scarves',
    collection: 'The Founder Collection',
    sizes: ['One Size'],
    colors: [
      { name: 'Navy/Gold', hex: '#C8A35F' }
    ],
    material: '100% Silk',
    craftsmanship: 'Hand-rolled edges, printed in Como',
    inStock: true,
    featured: false,
    isNew: true,
    isBestseller: false,
  },
  {
    id: '6',
    name: 'Captain\'s Cap',
    description: 'Traditional captain\'s cap with gold embroidery and anchor emblem. A timeless symbol of maritime heritage.',
    price: 165,
    image: '/images/product-cap.jpg',
    images: ['/images/product-cap.jpg'],
    category: 'accessories',
    subcategory: 'headwear',
    collection: 'The Commodore Line',
    sizes: ['S/M', 'L/XL'],
    colors: [
      { name: 'Navy', hex: '#0B1C2C' }
    ],
    material: 'Wool Blend',
    craftsmanship: 'Hand-embroidered in England',
    inStock: true,
    featured: false,
    isNew: false,
    isBestseller: false,
  },
  {
    id: '8',
    name: 'Anchor Cufflinks',
    description: '18k gold-plated anchor cufflinks with rope detail. The perfect finishing touch for formal occasions.',
    price: 345,
    image: '/images/product-cufflinks.jpg',
    images: ['/images/product-cufflinks.jpg'],
    category: 'accessories',
    subcategory: 'jewelry',
    collection: 'The Commodore Line',
    sizes: ['One Size'],
    colors: [
      { name: 'Gold', hex: '#C8A35F' }
    ],
    material: '18k Gold-Plated Brass',
    craftsmanship: 'Hand-polished in Paris',
    inStock: true,
    featured: true,
    isNew: true,
    isBestseller: true,
  },
  {
    id: '13',
    name: 'Nautical Belt',
    description: 'Woven canvas belt with leather trim and brass buckle. A versatile essential for any wardrobe.',
    price: 145,
    image: '/images/product-scarf.jpg',
    images: ['/images/product-scarf.jpg'],
    category: 'accessories',
    subcategory: 'belts',
    collection: 'The Founder Collection',
    sizes: ['32', '34', '36', '38', '40'],
    colors: [
      { name: 'Navy', hex: '#0B1C2C' },
      { name: 'Khaki', hex: '#C3B091' }
    ],
    material: 'Cotton Canvas & Leather',
    craftsmanship: 'Made in USA',
    inStock: true,
    featured: false,
    isNew: false,
    isBestseller: false,
  },
];

export const lookbookItems: LookbookItem[] = [
  {
    id: '1',
    image: '/images/deck-lounge.jpg',
    title: 'Sunset Soirée',
    products: ['3', '5', '8']
  },
  {
    id: '2',
    image: '/images/dining-room.jpg',
    title: 'Harbor Dining',
    products: ['3', '7', '8']
  },
  {
    id: '3',
    image: '/images/social-gathering.jpg',
    title: 'Weekend Escape',
    products: ['1', '4', '7']
  },
  {
    id: '4',
    image: '/images/spa-pool.jpg',
    title: 'Poolside Elegance',
    products: ['1', '5', '6']
  }
];

export const sizeGuides: SizeGuide[] = [
  {
    category: 'apparel',
    measurements: [
      { size: 'S', chest: '36-38"', waist: '30-32"', length: '28"' },
      { size: 'M', chest: '38-40"', waist: '32-34"', length: '29"' },
      { size: 'L', chest: '40-42"', waist: '34-36"', length: '30"' },
      { size: 'XL', chest: '42-44"', waist: '36-38"', length: '31"' },
      { size: 'XXL', chest: '44-46"', waist: '38-40"', length: '32"' },
    ]
  },
  {
    category: 'blazers',
    measurements: [
      { size: '38', chest: '38"', us: '38S', eu: '48', uk: '38' },
      { size: '40', chest: '40"', us: '40S', eu: '50', uk: '40' },
      { size: '42', chest: '42"', us: '42S', eu: '52', uk: '42' },
      { size: '44', chest: '44"', us: '44S', eu: '54', uk: '44' },
      { size: '46', chest: '46"', us: '46S', eu: '56', uk: '46' },
      { size: '48', chest: '48"', us: '48S', eu: '58', uk: '48' },
    ]
  },
  {
    category: 'footwear',
    measurements: [
      { size: '8', us: '8', eu: '41', uk: '7' },
      { size: '9', us: '9', eu: '42', uk: '8' },
      { size: '10', us: '10', eu: '43', uk: '9' },
      { size: '11', us: '11', eu: '44', uk: '10' },
      { size: '12', us: '12', eu: '45', uk: '11' },
      { size: '13', us: '13', eu: '46', uk: '12' },
    ]
  }
];

export const navItems: NavItem[] = [
  { label: 'Shop All', href: '#shop' },
  { label: 'New Arrivals', href: '#new' },
  { label: 'About', href: '#about' },
];

export const categories = [
  { id: 'all', label: 'All', count: products.length },
  { id: 'apparel', label: 'Apparel', count: products.filter(p => p.category === 'apparel').length },
  { id: 'footwear', label: 'Footwear', count: products.filter(p => p.category === 'footwear').length },
  { id: 'accessories', label: 'Accessories', count: products.filter(p => p.category === 'accessories').length },
];

export const collections = [
  { id: 'founder', name: 'The Founder Collection', description: 'Timeless essentials' },
  { id: 'commodore', name: 'The Commodore Line', description: 'Elevated luxury' },
  { id: 'summer', name: 'Summer Edit', description: 'Warm weather style' },
];
