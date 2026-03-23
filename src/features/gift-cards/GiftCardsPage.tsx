import { useState, useEffect } from 'react';
import { ArrowLeft, Gift, Heart, GraduationCap, Anchor, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchProducts, SHOPIFY_STORE_PERMANENT_DOMAIN } from '@/lib/shopify';
import type { ShopifyProduct } from '@/lib/shopify';

const TIERS = [
  { icon: GraduationCap, label: 'Study Buddy', description: 'Supplies a STEM kit for a student', color: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'bg-emerald-500/5' },
  { icon: Anchor, label: "Captain's Circle", description: 'Sponsors a student learning adventure', color: 'text-teal', border: 'border-teal/20', bg: 'bg-teal/5' },
  { icon: Sparkles, label: 'Magic Adventure', description: 'Full field trip + Magic School Box kits', color: 'text-sky-400', border: 'border-sky-500/20', bg: 'bg-sky-500/5' },
  { icon: Heart, label: "Founder's Legacy", description: 'Maximum impact — 20 students receive adventures', color: 'text-amber-400', border: 'border-amber-500/20', bg: 'bg-amber-500/5' },
];

export function GiftCardsPage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Gift Cards | Luxury Marine Life';
    loadGiftCards();
  }, []);

  const loadGiftCards = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts(50, 'product_type:"Gift Card"');
      if (data.length === 0) {
        // Fallback: search by tag
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

        {/* Hero */}
        <div className="mt-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-4">
            <Gift className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-bold tracking-wider uppercase">501(c)(3) Tax-Deductible</span>
          </div>
          <h1 className="heading-display text-white text-[clamp(34px,5vw,64px)] leading-[1.02]">
            Donation Gift Cards
          </h1>
          <p className="mt-4 text-white/70 text-base lg:text-lg leading-relaxed">
            Every purchase directly funds immersive learning adventures on the water — STEM education,
            ocean cleanup, veteran wellness, and Magic School Box kits for classrooms across Miami-Dade County.
          </p>
          <p className="mt-2 text-emerald-400/80 text-sm font-semibold">
            100% of donations go to GARMN's 501(c)(3) programs · Tax-deductible receipt included
          </p>
        </div>

        {/* Impact Stats */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
          {[
            { stat: '🎓', label: 'Help Us Reach Our Goals', value: '240+' },
            { stat: '🌊', label: 'Ocean Cleanups', value: '37' },
            { stat: '🎖️', label: 'Veteran Adventures', value: '48' },
            { stat: '📦', label: 'STEM Kits Shipped', value: '580+' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
              <p className="text-2xl">{s.stat}</p>
              <p className="text-white font-display font-bold text-lg mt-1">{s.value}</p>
              <p className="text-white/40 text-[10px] tracking-wider uppercase mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Gift Cards Grid */}
        <div className="mt-16">
          <h2 className="text-white font-display text-2xl font-bold mb-8 flex items-center gap-3">
            <Gift className="w-5 h-5 text-emerald-400" />
            Choose Your Impact Level
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <Loader2 className="h-10 w-10 text-emerald-400 animate-spin" />
              <p className="text-white/60 animate-pulse font-medium">Loading gift cards from Shopify...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-white/20 rounded-3xl">
              <Gift className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white">Gift cards coming soon</h4>
              <p className="text-white/50 mt-2">In the meantime, donate directly:</p>
              <a href="https://luxurymarinelife.com/garmn" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block">
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-white">Donate to GARMN</Button>
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products
                .sort((a, b) => parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount))
                .map((product, idx) => {
                  const tier = TIERS[idx % TIERS.length];
                  const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
                  const firstVariant = product.node.variants.edges[0]?.node;
                  const imageUrl = product.node.images.edges[0]?.node.url;
                  const Icon = tier.icon;

                  return (
                    <article
                      key={product.node.id}
                      className={`relative rounded-2xl border ${tier.border} ${tier.bg} p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/5`}
                    >
                      {/* Badge */}
                      <div className={`inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold ${tier.color} self-start`}>
                        <Icon className="w-3.5 h-3.5" />
                        Tax-Deductible
                      </div>

                      {/* Image */}
                      {imageUrl && (
                        <div className="mt-4 h-36 rounded-xl overflow-hidden border border-white/5">
                          <img src={imageUrl} alt={product.node.title} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      )}

                      {/* Content */}
                      <h3 className="mt-4 text-white font-display text-xl leading-tight">{product.node.title}</h3>
                      <p className="mt-2 text-white/50 text-xs leading-relaxed flex-1">
                        {product.node.description?.slice(0, 120) || tier.description}
                        {product.node.description && product.node.description.length > 120 ? '...' : ''}
                      </p>

                      {/* Price */}
                      <div className="mt-4 flex items-end justify-between">
                        <p className="text-white font-display text-3xl font-bold">
                          ${price >= 1000 ? `${(price / 1000).toFixed(0)}K` : price.toLocaleString()}
                        </p>
                        <p className={`text-xs font-semibold ${tier.color}`}>
                          {product.node.vendor || 'GARMN'}
                        </p>
                      </div>

                      {/* CTA */}
                      <Button
                        onClick={() => firstVariant && startCheckout(firstVariant.id)}
                        disabled={!firstVariant?.availableForSale}
                        className={`mt-5 w-full font-semibold py-5 bg-emerald-500 hover:bg-emerald-400 text-white disabled:opacity-50`}
                      >
                        <Gift className="w-4 h-4 mr-2" />
                        {firstVariant?.availableForSale ? 'Give This Gift' : 'Coming Soon'}
                      </Button>
                    </article>
                  );
                })}
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <h3 className="text-white font-display text-2xl font-bold mb-8">How Gift Card Donations Work</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Choose Your Level', desc: 'Pick the impact tier that matches your vision' },
              { step: '2', title: 'Checkout via Shopify', desc: 'Secure payment through our Shopify store' },
              { step: '3', title: 'Impact Delivered', desc: 'GARMN sends your tax receipt and a student gets an adventure' },
            ].map((s) => (
              <div key={s.step} className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">{s.step}</div>
                <h4 className="mt-3 text-white font-semibold">{s.title}</h4>
                <p className="mt-1 text-white/50 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
