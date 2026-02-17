import { useInView } from "@/hooks/useInView";
import { useCartStore } from "@/store/cartStore";
import { Sparkles, Zap, Trophy, Flame } from "lucide-react";

const pricingPlans = [
  {
    id: "single",
    name: "The Single",
    subtitle: "FIRST-TIME BUYER EXCLUSIVE",
    description: "1x Super Antioxidant NanoSpray",
    originalPrice: 79,
    foundersPrice: 63,
    savings: "Save $16 (20% off)",
    supply: "30-Day Supply",
    badge: "SUPER SALE",
    badgeIcon: Flame,
    badgeColor: "bg-orange-500",
  },
  {
    id: "biohacker",
    name: "The Biohacker's Stack",
    subtitle: "MOST POPULAR",
    description: "3x Super Antioxidant NanoSpray",
    originalPrice: 237,
    foundersPrice: 189,
    savings: "Save $48 (20% off)",
    supply: "90-Day Supply — $63/bottle",
    badge: "FOUNDERS OFFER",
    badgeIcon: Zap,
    badgeColor: "bg-[#D4A84B]",
    popular: true,
  },
  {
    id: "executive",
    name: "Executive Longevity Stack",
    subtitle: "MAXIMIZED VALUE",
    description: "6x Super Antioxidant NanoSpray",
    originalPrice: 474,
    foundersPrice: 367,
    savings: "Save $107 (22.5% off)",
    supply: "6-Month Supply — $61.17/bottle",
    badge: "MAXIMIZED VALUE",
    badgeIcon: Sparkles,
    badgeColor: "bg-purple-500",
  },
  {
    id: "ceo",
    name: "Health CEO Annual Supply",
    subtitle: "BEST VALUE",
    description: "12x Super Antioxidant NanoSpray",
    originalPrice: 948,
    foundersPrice: 719,
    savings: "Save $229 (24% off)",
    supply: "12-Month Supply — $59.92/bottle",
    badge: "EXECUTIVE ALLOCATION",
    badgeIcon: Trophy,
    badgeColor: "bg-[#D4A84B]",
    bestValue: true,
  },
];

const trustSignals = [
  "Free Shipping on Stacks",
  "30-Day Guarantee",
  "Pharmaceutical-Grade Manufacturing",
  "40,000 PSI Certified Process",
];

export function Pricing() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { addItem } = useCartStore();

  const handleAddToCart = (plan: (typeof pricingPlans)[0]) => {
    addItem({
      id: plan.id,
      name: plan.name,
      price: plan.foundersPrice,
      originalPrice: plan.originalPrice,
      image: "/images/product-1.png",
      subtitle: plan.description,
    });
  };

  return (
    <section ref={ref} id="pricing" className="section-padding bg-white">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className={`font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4 transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            LIMITED-TIME FOUNDERS OPPORTUNITY
          </h2>
          <p
            className={`text-[#8B1A1A] font-medium text-lg mb-6 transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            Lock in UltraShear Technology™ at Historic Pricing
          </p>
          <p
            className={`text-gray-600 transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Due to unprecedented demand and a commitment to our earliest
            supporters, we are extending this exclusive, limited-number Founders
            pricing. Once this batch is sold, prices will return to standard
            retail.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-white border h-full flex flex-col transition-all duration-700 hover:shadow-xl hover:-translate-y-3 ${
                plan.popular || plan.bestValue
                  ? "border-[#D4A84B]"
                  : "border-gray-200"
              } ${
                isInView
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

        {/* Trust Signals */}
        <div
          className={`flex flex-wrap justify-center gap-6 md:gap-10 mb-8 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          {trustSignals.map((signal) => (
            <div key={signal} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#8B1A1A] rounded-full" />
              <span className="text-sm text-gray-600">{signal}</span>
            </div>
          ))}
        </div>

        {/* Urgency Note */}
        <p
          className={`text-center text-sm text-gray-500 italic transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "1100ms" }}
        >
          Stock is limited to 100 annual memberships. Pricing will expire when
          current inventory hits 50 units.
        </p>
      </div>
    </section>
  );
}
