import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TermsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-marine-900 text-white">
      {/* Header */}
      <div className="px-6 lg:px-[7vw] pt-8 pb-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-white/60 hover:text-white hover:bg-white/5 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      {/* Content */}
      <article className="px-6 lg:px-[7vw] pb-20 max-w-3xl mx-auto">
        <h1 className="font-display text-[clamp(28px,4vw,48px)] font-bold mb-2">
          Terms of Service
        </h1>
        <p className="text-white/40 text-sm mb-10">
          Last updated: March 22, 2026
        </p>

        <div className="space-y-8 text-white/70 text-[15px] leading-relaxed [&_h2]:text-white [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mb-3 [&_h2]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using{' '}
              <span className="text-teal">luxurymarinelife.shop</span> (the
              "Site"), you agree to be bound by these Terms of Service. If you do
              not agree, please do not use our Site. Luxury Marine Life reserves
              the right to modify these terms at any time.
            </p>
          </section>

          <section>
            <h2>2. Products & Services</h2>
            <p>
              Luxury Marine Life offers premium wellness products, performance
              apparel, sustainable marine technology, and related services. All
              product descriptions, pricing, and availability are subject to
              change without notice. We reserve the right to limit quantities and
              refuse orders at our sole discretion.
            </p>
          </section>

          <section>
            <h2>3. Pricing & Payment</h2>
            <ul>
              <li>
                All prices are listed in U.S. Dollars (USD) unless otherwise
                stated.
              </li>
              <li>
                Prices do not include applicable sales tax or shipping costs,
                which are calculated at checkout.
              </li>
              <li>
                Payment is processed securely through Shopify Payments and/or
                Stripe. We accept major credit cards and select digital wallets.
              </li>
              <li>
                We reserve the right to cancel orders due to pricing errors,
                product unavailability, or suspected fraud.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Shipping & Delivery</h2>
            <p>
              We ship to addresses within the United States and select
              international destinations. Estimated delivery times are provided
              at checkout and are not guaranteed. Risk of loss and title for
              products pass to you upon delivery to the carrier.
            </p>
          </section>

          <section>
            <h2>5. Returns & Refunds</h2>
            <ul>
              <li>
                Unused and unopened products may be returned within 30 days of
                delivery for a full refund.
              </li>
              <li>
                Items must be in original packaging and condition.
              </li>
              <li>
                Perishable goods, opened supplements, and custom/personalized
                items are non-refundable.
              </li>
              <li>
                Return shipping costs are the responsibility of the buyer unless
                the return is due to our error.
              </li>
              <li>
                Refunds are processed within 5–10 business days after we receive
                the returned item.
              </li>
            </ul>
          </section>

          <section>
            <h2>6. Intellectual Property</h2>
            <p>
              All content on this Site — including text, graphics, logos, images,
              product designs, and software — is the property of Luxury Marine
              Life or its licensors and is protected by United States and
              international copyright, trademark, and intellectual property laws.
              You may not reproduce, distribute, or create derivative works
              without our prior written consent.
            </p>
            <p className="mt-2">
              Trademarks including "Luxury Marine Life," "UltraShear,"
              "SmartYacht," "AC Yacht Club," "Hottie Yachtie," and "NanoSpray"
              are proprietary marks.
            </p>
          </section>

          <section>
            <h2>7. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>
                Use the Site for any unlawful purpose or in violation of any
                applicable laws
              </li>
              <li>
                Attempt to gain unauthorized access to any part of the Site or
                its systems
              </li>
              <li>
                Interfere with the proper working of the Site, including through
                bots, scraping, or denial-of-service attacks
              </li>
              <li>
                Submit false or misleading information during checkout or account
                creation
              </li>
            </ul>
          </section>

          <section>
            <h2>8. Third-Party Links</h2>
            <p>
              Our Site may contain links to third-party websites, including
              partner organizations such as GARMN (luxurymarinelife.com/garmn),
              SeaKeepers, and Pelican Harbor Seabird Station. We are not
              responsible for the content, privacy practices, or terms of those
              third-party sites.
            </p>
          </section>

          <section>
            <h2>9. Disclaimer of Warranties</h2>
            <p>
              The Site and all products are provided "as is" and "as available"
              without warranties of any kind, either express or implied.
              Statements regarding supplements and wellness products have not
              been evaluated by the FDA and are not intended to diagnose, treat,
              cure, or prevent any disease.
            </p>
          </section>

          <section>
            <h2>10. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Luxury Marine Life and its
              affiliates shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising out of your use
              of the Site or purchase of our products. Our total liability shall
              not exceed the amount you paid for the product giving rise to the
              claim.
            </p>
          </section>

          <section>
            <h2>11. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Luxury Marine Life, its
              officers, employees, and partners from any claims, damages, or
              expenses arising from your use of the Site or violation of these
              Terms.
            </p>
          </section>

          <section>
            <h2>12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the State of Florida, without regard to its conflict of
              law provisions. Any disputes shall be resolved in the federal or
              state courts located in Miami-Dade County, Florida.
            </p>
          </section>

          <section>
            <h2>13. GARMN & Charitable Donations</h2>
            <p>
              10% of every purchase supports ocean restoration and education
              through GARMN (Global Aquatic Resource Management Network), a
              501(c)(3) non-profit organization. Tax-deductible donation gift
              cards are processed separately through GARMN. Luxury Marine Life
              does not provide tax advice — consult a qualified tax professional.
            </p>
          </section>

          <section>
            <h2>14. Contact Us</h2>
            <p>For questions about these Terms, contact us at:</p>
            <p className="mt-2 text-teal">
              <a
                href="mailto:hello@luxurymarinelife.com"
                className="hover:underline"
              >
                hello@luxurymarinelife.com
              </a>
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
