import { useState, useEffect } from 'react';
import { ArrowLeft, Gift, Heart, GraduationCap, Loader2, Waves, Compass, Ship, Microscope, Target, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchProducts, SHOPIFY_STORE_PERMANENT_DOMAIN } from '@/lib/shopify';
import type { ShopifyProduct } from '@/lib/shopify';

/* ── GARMN Immersive Learning Program Goals ─────────────────────── */
const PROGRAMS = [
  {
    id: 'cleanup',
    icon: Waves,
    label: 'Beach & Water Cleanups',
    tagline: '$2,500 per event',
    goalCost: 2500,
    description: 'Fund a full beach cleanup day — boats, crew, dive teams, and 500+ lbs of marine debris removed from Miami-Dade waterways.',
    whatItCovers: ['Boat fuel & crew for 8 hours', 'Dive team (4 certified divers)', 'Debris removal & recycling', 'Student volunteer coordination'],
    color: 'text-cyan-400',
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/5',
    accent: 'bg-cyan-500',
    goalLabel: '$2,500 Goal',
  },
  {
    id: 'adventure',
    icon: Compass,
    label: 'Magic Adventures on the Water',
    tagline: '$5,000 per season',
    goalCost: 5000,
    description: 'Sponsor a season of guided eco-tours, snorkel excursions, and sunset sails for underserved families and students.',
    whatItCovers: ['10 guided eco-tours per season', 'Snorkel gear for 30 students', 'Certified marine educators', 'Transportation & meals included'],
    color: 'text-teal',
    border: 'border-teal/20',
    bg: 'bg-teal/5',
    accent: 'bg-teal',
    goalLabel: '$5,000 Goal',
  },
  {
    id: 'student',
    icon: Microscope,
    label: 'STEM Kits for Students',
    tagline: '$75 per kit',
    goalCost: 75,
    description: 'Put a hands-on STEM kit in a student\'s hands — microscopes, water testing gear, and ocean field guides for real marine science.',
    whatItCovers: ['Portable microscope', 'Water quality testing kit', 'Ocean species field guide', 'Lab journal & supplies'],
    color: 'text-emerald-400',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/5',
    accent: 'bg-emerald-500',
    goalLabel: '$75 per Kit',
  },
  {
    id: 'field-trip',
    icon: GraduationCap,
    label: 'Marine Science Field Trips',
    tagline: '$1,200 per trip',
    goalCost: 1200,
    description: 'Send a classroom of 30 students on a full-day marine science field trip with certified educators on the water.',
    whatItCovers: ['Charter vessel for 30 students', 'Certified marine science educator', 'All safety & snorkel equipment', 'Lunch, hydration & sunscreen'],
    color: 'text-violet-400',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
    accent: 'bg-violet-500',
    goalLabel: '$1,200 per Trip',
  },
];

export function GiftCardsPage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Gift Cards — Fund Real Programs | Luxury Marine Life';
    loadGiftCards();
  }, []);

  const loadGiftCards = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts(50, 'product_type:"Gift Card"');
      if (data.length === 0) {
        const tagData = await fetchProducts(50, 'tag:"Tax-Deductible"');
        setProducts(tagData);
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.error('Failed to load gift cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const startCheckout = (variantId: string) => {
    const gid = variantId.replace('gid://shopify/ProductVariant/', '');
    window.location.href = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/cart/${gid}:1?utm_source=luxurymarinelife&utm_medium=shop&utm_campaign=giftcards`;
  };

  const filteredProducts = activeCategory
    ? products.filter((p) => {
        const title = p.node.title.toLowerCase();
        const desc = (p.node.description || '').toLowerCase();
        if (activeCategory === 'cleanup') return title.includes('cleanup') || desc.includes('cleanup') || desc.includes('ocean');
        if (activeCategory === 'adventure') return title.includes('adventure') || desc.includes('adventure') || desc.includes('experience');
        if (activeCategory === 'student') return title.includes('student') || desc.includes('student') || desc.includes('stem');
        if (activeCategory === 'field-trip') return title.includes('field') || title.includes('trip') || desc.includes('field trip');
        return true;
      })
    : products;

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <section className="relative min-h-screen bg-marine-900 pt-28 pb-20">
      <div className="px-6 lg:px-[7vw]">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-white/70 hover:text-teal transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Store
        </button>

        {/* ── Hero ────────────────────────────────────────────────── */}
        <div className="mt-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 mb-3">
            <Heart className="w-3 h-3 text-emerald-400" />
            <span className="text-emerald-400 text-[10px] font-bold tracking-wider uppercase">10% of Every Purchase → GARMN Immersive Learning</span>
          </div>
          <h1 className="heading-display text-white text-[clamp(28px,4.5vw,52px)] leading-[1.05]">
            Gift Cards That <span className="text-teal">Fund Real Programs</span>
          </h1>
          <p className="mt-3 text-white/60 text-sm lg:text-base leading-relaxed max-w-xl">
            Every purchase directly funds beach cleanups, magic adventures, STEM kits, and marine science field trips through <strong className="text-emerald-400">GARMN's 501(c)(3) immersive learning programs</strong>. See the real costs — choose your impact.
          </p>
        </div>

        {/* ── Buy One, Donate One Banner ──────────────────────────── */}
        <div className="mt-6 rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-4 max-w-3xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-display font-bold text-sm">BUY ONE, DONATE ONE</span>
            </div>
            <p className="text-white/70 text-xs leading-relaxed">
              Buy any gift card — <strong className="text-white">we donate a matching one</strong> to a student or family. You get up to <strong className="text-amber-400">$500 in charter credit</strong>.
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              <GraduationCap className="w-3 h-3" /> 25% OFF for Students
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold">
              <Users className="w-3 h-3" /> 15% OFF for Families
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold">
              <Ship className="w-3 h-3" /> Up to $500 Charter Credit
            </span>
          </div>
        </div>

        {/* ── Category Filters ────────────────────────────────────── */}
        <div className="mt-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              !activeCategory
                ? 'bg-white/10 text-white border-white/20'
                : 'text-white/50 border-white/10 hover:border-white/20 hover:text-white/70'
            }`}
          >
            All Cards
          </button>
          {PROGRAMS.map((prog) => {
            const Icon = prog.icon;
            const isActive = activeCategory === prog.id;
            return (
              <button
                key={prog.id}
                onClick={() => setActiveCategory(isActive ? null : prog.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  isActive
                    ? `${prog.bg} ${prog.color} ${prog.border}`
                    : 'text-white/50 border-white/10 hover:border-white/20 hover:text-white/70'
                }`}
              >
                <Icon className="w-3 h-3" />
                {prog.label}
              </button>
            );
          })}
        </div>

        {/* ── Impact Stats ────────────────────────────────────────── */}
        <div className="mt-6 grid grid-cols-4 gap-3 max-w-2xl">
          {[
            { emoji: '🏖️', value: '37', label: 'Cleanups Funded' },
            { emoji: '🧭', value: '120+', label: 'Adventures Gifted' },
            { emoji: '🔬', value: '580+', label: 'STEM Kits Delivered' },
            { emoji: '🎓', value: '45', label: 'Field Trips Done' },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-white/10 bg-white/[0.02] p-2.5 text-center">
              <p className="text-lg leading-none">{s.emoji}</p>
              <p className="text-white font-display font-bold text-base mt-1">{s.value}</p>
              <p className="text-white/40 text-[9px] tracking-wider uppercase">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Gift Cards Grid ─────────────────────────────────────── */}
        <div className="mt-10">
          <h2 className="text-white font-display text-xl font-bold mb-5 flex items-center gap-2">
            <Gift className="w-4 h-4 text-emerald-400" />
            {activeCategory
              ? PROGRAMS.find((c) => c.id === activeCategory)?.label || 'Gift Cards'
              : 'Choose Your Impact'}
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-3">
              <Loader2 className="h-8 w-8 text-emerald-400 animate-spin" />
              <p className="text-white/60 animate-pulse text-sm font-medium">Loading gift cards…</p>
            </div>
          ) : displayProducts.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-white/20 rounded-2xl">
              <Gift className="h-12 w-12 text-white/20 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white">Gift cards coming soon</h4>
              <p className="text-white/50 text-sm mt-1">Donate directly in the meantime:</p>
              <a href="https://luxurymarinelife.com/garmn" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block">
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm">Donate to GARMN</Button>
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {displayProducts
                .sort((a, b) => parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount))
                .map((product, idx) => {
                  const prog = PROGRAMS[idx % PROGRAMS.length];
                  const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
                  const firstVariant = product.node.variants.edges[0]?.node;
                  const imageUrl = product.node.images.edges[0]?.node.url;
                  const Icon = prog.icon;

                  return (
                    <article
                      key={product.node.id}
                      className={`relative rounded-xl border ${prog.border} ${prog.bg} p-3.5 flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/5 group`}
                    >
                      {/* Badge */}
                      <div className={`inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold ${prog.color} self-start`}>
                        <Icon className="w-3 h-3" />
                        {prog.label}
                      </div>

                      {/* Image */}
                      {imageUrl && (
                        <div className="mt-2.5 h-24 rounded-lg overflow-hidden border border-white/5">
                          <img src={imageUrl} alt={product.node.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        </div>
                      )}

                      {/* Content */}
                      <h3 className="mt-2.5 text-white font-display text-sm leading-tight line-clamp-2">{product.node.title}</h3>
                      <p className="mt-1 text-white/40 text-[10px] leading-relaxed flex-1 line-clamp-2">
                        {product.node.description?.slice(0, 80) || prog.description}
                      </p>

                      {/* Price + CTA */}
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <p className="text-white font-display text-xl font-bold">
                          ${price >= 1000 ? `${(price / 1000).toFixed(0)}K` : price.toLocaleString()}
                        </p>
                        <Button
                          size="sm"
                          onClick={() => firstVariant && startCheckout(firstVariant.id)}
                          disabled={!firstVariant?.availableForSale}
                          className={`${prog.accent} hover:opacity-90 text-white text-[10px] px-2.5 py-1 h-auto font-semibold disabled:opacity-40`}
                        >
                          <Gift className="w-3 h-3 mr-1" />
                          {firstVariant?.availableForSale ? 'Gift' : 'Soon'}
                        </Button>
                      </div>
                    </article>
                  );
                })}
            </div>
          )}
        </div>

        {/* ── Program Goals (replaces "How It Works") ─────────────── */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-white font-display text-xl font-bold flex items-center justify-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              Program Goals — See What Your Gift Funds
            </h3>
            <p className="mt-2 text-white/50 text-xs">Real costs. Real programs. 100% funds GARMN Immersive Learning.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROGRAMS.map((prog) => {
              const Icon = prog.icon;
              return (
                <div key={prog.id} className={`rounded-xl border ${prog.border} ${prog.bg} p-5`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-full ${prog.accent}/20 border ${prog.border} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${prog.color}`} />
                    </div>
                    <div>
                      <h4 className="text-white font-display font-bold text-sm">{prog.label}</h4>
                      <span className={`${prog.color} text-[10px] font-bold uppercase tracking-wider`}>{prog.goalLabel}</span>
                    </div>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed mb-3">{prog.description}</p>
                  <div className="space-y-1.5">
                    {prog.whatItCovers.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <span className={`${prog.color} text-[10px] mt-0.5`}>✓</span>
                        <span className="text-white/50 text-[11px]">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 text-[10px] uppercase tracking-wider">Program Cost</span>
                      <span className={`${prog.color} font-display font-bold text-sm`}>
                        ${prog.goalCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Buy One, Donate One Detail ──────────────────────────── */}
        <div className="mt-12 max-w-2xl mx-auto rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-white font-display font-bold text-sm">Buy One, Donate One — Your Impact Doubled</h4>
              <p className="mt-1.5 text-white/60 text-xs leading-relaxed">
                Buy any gift card for a student or family and <strong className="text-amber-400">LML matches with up to $500 in charter credit</strong> for you.
                Credits apply to any LML charter booking or SmartCharter experience. Just forward your donation receipt
                to <a href="mailto:support@luxurymarinelife.com" className="text-teal underline underline-offset-2">support@luxurymarinelife.com</a>.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">
                  🎓 Students get 25% off all programs
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-semibold">
                  👨‍👩‍👧 Families get 15% off all programs
                </span>
              </div>
              <p className="mt-3 text-emerald-400/70 text-[10px] font-semibold uppercase tracking-wider">
                100% of donations fund GARMN's 501(c)(3) immersive learning · Tax-deductible receipt included
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
