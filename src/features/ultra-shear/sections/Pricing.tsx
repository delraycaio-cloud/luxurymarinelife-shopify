import { useInView } from "@/hooks/useInView";
import { Sparkles, Zap, Trophy, Flame } from "lucide-react";

const pricingPlans = [
  {
    id: "single",
    name: "The Single",
    subtitle: "FIRST-TIME BUYER EXCLUSIVE",
    description: "1x Super Antioxidant NanoSpray",
    video: "/images/droplets_gone.mp4",
    originalPrice: 79,
    foundersPrice: 64,
    savings: "Save $16 (20% off)",
    supply: "30-Day Supply",
    badge: "SUPER SALE",
    badgeIcon: Flame,
    badgeColor: "bg-orange-500",
    checkoutUrl:
      "https://shearsciences.com/discount/MARINE20?redirect=%2Fcart%2F46818496282869%3A1%3Fref%3DANGELINA_VIP",
  },
  {
    id: "biohacker",
    name: "The Biohacker's Stack",
    subtitle: "MOST POPULAR",
    description: "3x Super Antioxidant NanoSpray",
    image: "/images/oil_3.jpeg",
    defaultImage: "/images/kids.jpeg",
    originalPrice: 237,
    foundersPrice: 189,
    savings: "Save $48 (20% off)",
    supply: "90-Day Supply — $64/bottle",
    badge: "LIMITED-TIME OFFER",
    badgeIcon: Zap,
    badgeColor: "bg-[#D4A84B]",
    popular: true,
    variantId: "47621010030837",
  },
  {
    id: "executive",
    name: "Executive Longevity Stack",
    subtitle: "MAXIMIZED VALUE",
    description: "6x Super Antioxidant NanoSpray",
    image: "/images/oil_6.jpg",
    defaultImage: "/images/elder.jpeg",
    originalPrice: 474,
    foundersPrice: 367,
    savings: "Save $107 (22.5% off)",
    supply: "6-Month Supply — $61.17/bottle",
    badge: "MAXIMIZED VALUE",
    badgeIcon: Sparkles,
    badgeColor: "bg-purple-500",
    variantId: "47621066424565",
  },
  {
    id: "ceo",
    name: "Health CEO Annual Supply",
    subtitle: "BEST VALUE",
    description: "12x Super Antioxidant NanoSpray",
    image: "/images/oil_12.png",
    defaultImage: "/images/ceo.jpeg",
    originalPrice: 948,
    foundersPrice: 719,
    savings: "Save $229 (24% off)",
    supply: "12-Month Supply — $59.92/bottle",
    badge: "EXECUTIVE ALLOCATION",
    badgeIcon: Trophy,
    badgeColor: "bg-[#D4A84B]",
    bestValue: true,
    variantId: "47621098799349",
  },
];

export function Pricing() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  const handleAddToCart = (plan: (typeof pricingPlans)[0]) => {
    if (plan.checkoutUrl) {
      window.location.href = plan.checkoutUrl;
      return;
    }

    if (!plan.variantId) return;
    window.location.href = `https://shearsciences.com/cart/${plan.variantId}:1?ref=ANGELINA_VIP`;
  };

  return (
    <section ref={ref} id="pricing" className="section-padding bg-white">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] mb-4">Choose Your Protocol</h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto font-medium">Every Protocol. One Goal: Maximum Health.</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-white border h-full flex flex-col transition-all duration-700 hover:shadow-xl hover:-translate-y-3 ${plan.popular || plan.bestValue
                  ? "border-[#D4A84B]"
                  : "border-gray-200"
                } ${isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
                }`}
              style={{
                transitionDelay: `${300 + index * 150}ms`,
                transitionTimingFunction:
                  "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              }}
            >
              {/* Badge */}
              <div
                className={`absolute -top-3 left-1/2 -translate-x-1/2 ${plan.badgeColor} text-white px-4 py-1.5 text-xs uppercase tracking-wider flex items-center gap-1.5`}
              >
                <plan.badgeIcon className="w-3.5 h-3.5" />
                {plan.badge}
              </div>

              <div className="p-6 pt-8 flex flex-col h-full">
                {/* Product Image */}
                <div className="mb-6 flex justify-center items-center h-48 py-4 group/media">
                  {plan.video ? (
                    <video
                      src={plan.video}
                      className="h-full object-contain drop-shadow-xl"
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label={plan.name}
                    />
                  ) : (
                    <div className="relative h-full w-full flex items-center justify-center">
                      {plan.defaultImage ? (
                        <>
                          <img
                            src={plan.defaultImage}
                            alt={`${plan.name} lifestyle`}
                            className="absolute inset-0 h-full w-full object-contain drop-shadow-xl transition-opacity duration-500 group-hover/media:opacity-0"
                          />
                          <img
                            src={plan.image}
                            alt={plan.name}
                            className="absolute inset-0 h-full w-full object-contain drop-shadow-xl transition-opacity duration-500 opacity-0 group-hover/media:opacity-100"
                          />
                        </>
                      ) : (
                        <img src={plan.image} alt={plan.name} className="h-full object-contain drop-shadow-xl transition-transform duration-500 hover:scale-110" />
                      )}
                    </div>
                  )}
                </div>

                {/* Plan Info */}
                <p className="label-text text-gray-500 mb-2">{plan.subtitle}</p>
                <h3 className="font-serif text-xl text-[#1A1A1A] mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-600 mb-6">{plan.description}</p>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-gray-400 line-through text-lg">
                      ${plan.originalPrice}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-4xl text-[#8B1A1A]">
                      ${plan.foundersPrice}
                    </span>
                  </div>
                  <p className="text-sm text-[#8B1A1A] mt-1">{plan.savings}</p>
                </div>

                <p className="text-xs text-gray-500 mb-6">{plan.supply}</p>

                {/* CTA */}
                <button
                  onClick={() => handleAddToCart(plan)}
                  className="btn-primary w-full mt-auto"
                >
                  BUY NOW
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
