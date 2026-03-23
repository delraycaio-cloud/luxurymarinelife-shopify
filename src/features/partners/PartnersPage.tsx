import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Store, CheckCircle, ArrowUpRight, Anchor, Send } from 'lucide-react';

export function PartnersPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Become a Partner | Luxury Marine Life';
  }, []);

  return (
    <div className="min-h-[100dvh] bg-marine-900">
      {/* Header */}
      <header className="relative pt-28 lg:pt-32 pb-10 lg:pb-14 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(1100px_520px_at_20%_10%,rgba(45,212,191,0.18),transparent_60%),radial-gradient(900px_520px_at_85%_35%,rgba(201,169,110,0.14),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-marine-900/40 via-marine-900/85 to-marine-900" />
        </div>

        <div className="relative px-6 lg:px-[7vw]">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm tracking-wide"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </button>

          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-3">
              <Anchor className="w-5 h-5 text-teal" />
              <span className="label-elite text-teal">Partnership Program</span>
            </div>

            <h1 className="heading-display text-white text-[clamp(36px,4.2vw,68px)] mt-4">
              Grow with Luxury Marine Life
            </h1>
            <p className="mt-5 text-white/60 text-base lg:text-lg leading-relaxed max-w-[62ch]">
              Join our ecosystem as an affiliate partner or list your products in our curated marketplace.
              Earn recurring commissions or reach our premium audience of marine lifestyle enthusiasts.
            </p>
          </div>
        </div>
      </header>

      {/* Two-Column Cards */}
      <section className="relative pb-16 lg:pb-24">
        <div className="px-6 lg:px-[7vw]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

            {/* Affiliate Card */}
            <div className="group relative rounded-2xl overflow-hidden glass-card p-8 lg:p-10">
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-teal/20 before:via-teal/10 before:to-transparent" />

              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-teal" />
                </div>

                <h2 className="text-white font-display font-extrabold uppercase tracking-[0.02em] text-2xl lg:text-3xl">
                  Become an Affiliate
                </h2>
                <p className="mt-4 text-white/60 leading-relaxed">
                  Earn commission on every sale you refer. Share our premium wellness products, apparel, 
                  and sustainable tech with your audience and earn recurring revenue.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-medium text-sm">15% Commission</span>
                      <p className="text-white/50 text-xs mt-0.5">On every referred sale, recurring for subscriptions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-medium text-sm">30-Day Cookie</span>
                      <p className="text-white/50 text-xs mt-0.5">Extended attribution window for higher conversions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-medium text-sm">Marketing Assets</span>
                      <p className="text-white/50 text-xs mt-0.5">Branded banners, product images, and copy templates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-medium text-sm">Real-Time Dashboard</span>
                      <p className="text-white/50 text-xs mt-0.5">Track clicks, conversions, and commissions live</p>
                    </div>
                  </div>
                </div>

                {/* Affiliate Form */}
                <form
                  className="mt-10 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    // Form data ready for Firebase backend integration
                    alert('Application submitted! We will review and get back to you within 48 hours.');
                    form.reset();
                  }}
                >
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Full Name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50 transition-all"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email Address"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50 transition-all"
                  />
                  <input
                    name="website"
                    type="url"
                    placeholder="Website or Social Profile (optional)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50 transition-all"
                  />
                  <textarea
                    name="audience"
                    rows={3}
                    placeholder="Tell us about your audience..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50 transition-all resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-teal hover:bg-teal-light text-marine-900 font-semibold px-6 py-3.5 rounded-full transition-all duration-300 hover:translate-y-[-2px]"
                  >
                    <Send className="w-4 h-4" />
                    Apply as Affiliate
                  </button>
                </form>
              </div>
            </div>

            {/* Vendor Card */}
            <div className="group relative rounded-2xl overflow-hidden glass-card p-8 lg:p-10">
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[rgba(201,169,110,0.18)] before:via-[rgba(201,169,110,0.06)] before:to-transparent" />

              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-[rgba(201,169,110,0.10)] border border-[rgba(201,169,110,0.20)] flex items-center justify-center mb-6">
                  <Store className="w-7 h-7 text-[var(--gold-light)]" />
                </div>

                <h2 className="text-white font-display font-extrabold uppercase tracking-[0.02em] text-2xl lg:text-3xl">
                  List Your Products
                </h2>
                <p className="mt-4 text-white/60 leading-relaxed">
                  Reach our premium audience of yacht owners, marine enthusiasts, and high-performance 
                  lifestyle consumers. We curate only the best products for life on the water.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--gold-light)] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-medium text-sm">Premium Audience</span>
                      <p className="text-white/50 text-xs mt-0.5">Access yacht owners, charter clients, and marine professionals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--gold-light)] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-medium text-sm">Brand Alignment</span>
                      <p className="text-white/50 text-xs mt-0.5">Your products alongside luxury marine lifestyle brands</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--gold-light)] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-medium text-sm">Integrated Marketing</span>
                      <p className="text-white/50 text-xs mt-0.5">Featured in newsletters, social campaigns, and blog content</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--gold-light)] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-medium text-sm">10% Impact Pledge</span>
                      <p className="text-white/50 text-xs mt-0.5">Your brand contributes to ocean restoration through GARMN</p>
                    </div>
                  </div>
                </div>

                {/* Vendor Form */}
                <form
                  className="mt-10 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    // Form data ready for Firebase backend integration
                    alert('Application submitted! Our curation team will review within 5 business days.');
                    form.reset();
                  }}
                >
                  <input
                    name="brandName"
                    type="text"
                    required
                    placeholder="Brand / Company Name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(201,169,110,0.5)] transition-all"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Business Email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(201,169,110,0.5)] transition-all"
                  />
                  <input
                    name="website"
                    type="url"
                    required
                    placeholder="Product Website"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(201,169,110,0.5)] transition-all"
                  />
                  <select
                    name="category"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(201,169,110,0.5)] transition-all appearance-none"
                  >
                    <option value="" className="bg-marine-900">Product Category</option>
                    <option value="wellness" className="bg-marine-900">Wellness & Supplements</option>
                    <option value="apparel" className="bg-marine-900">Apparel & Accessories</option>
                    <option value="tech" className="bg-marine-900">Marine Tech & Equipment</option>
                    <option value="lifestyle" className="bg-marine-900">Lifestyle & Home</option>
                    <option value="other" className="bg-marine-900">Other</option>
                  </select>
                  <textarea
                    name="description"
                    rows={3}
                    placeholder="Describe your products and why they fit the LML ecosystem..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(201,169,110,0.5)] transition-all resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[rgba(201,169,110,0.9)] hover:bg-[rgba(201,169,110,1)] text-marine-900 font-semibold px-6 py-3.5 rounded-full transition-all duration-300 hover:translate-y-[-2px]"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    Submit Vendor Application
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="pb-16 lg:pb-24">
        <div className="px-6 lg:px-[7vw]">
          <div className="text-center">
            <p className="text-white/40 text-sm tracking-wide">
              Questions? Email us at{' '}
              <a
                href="mailto:partners@luxurymarinelife.com"
                className="text-teal/80 hover:text-teal underline underline-offset-2 transition-colors"
              >
                partners@luxurymarinelife.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
