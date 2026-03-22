import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-white/40 text-sm mb-10">
          Last updated: March 22, 2026
        </p>

        <div className="space-y-8 text-white/70 text-[15px] leading-relaxed [&_h2]:text-white [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mb-3 [&_h2]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
          <section>
            <h2>1. Who We Are</h2>
            <p>
              Luxury Marine Life ("we," "us," or "our") operates the website{' '}
              <span className="text-teal">luxurymarinelife.shop</span> and related
              digital properties. Luxury Marine Life is a division of the
              for-profit entity headquartered in Miami, Florida. Our mission is
              premium wellness and lifestyle for life on the water, with 10% of
              every purchase supporting ocean restoration through GARMN, our
              501(c)(3) non-profit partner.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <p>We may collect the following information:</p>
            <ul>
              <li>
                <strong className="text-white/90">Email address</strong> — when
                you subscribe via our Connect section or contact form
              </li>
              <li>
                <strong className="text-white/90">Name and shipping address</strong>{' '}
                — when you place an order
              </li>
              <li>
                <strong className="text-white/90">Payment information</strong> —
                processed securely by Shopify Payments and/or Stripe; we never
                store full card numbers
              </li>
              <li>
                <strong className="text-white/90">Usage data</strong> — pages
                visited, time on site, referral source, collected via Google
                Analytics (GA4)
              </li>
              <li>
                <strong className="text-white/90">Device information</strong> —
                browser type, operating system, screen resolution
              </li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <ul>
              <li>Process and fulfill orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>
                Deliver marketing communications you've opted into (e.g.,
                newsletter, product drops, conservation updates)
              </li>
              <li>Improve our website experience and product offerings</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Storage</h2>
            <p>
              Email subscriptions are stored in Google Cloud Firestore, a
              SOC&nbsp;2 and ISO&nbsp;27001 certified database service. Order and
              transactional data is processed through Shopify's PCI-DSS compliant
              infrastructure. We use Firebase Hosting (Google Cloud) to serve our
              website.
            </p>
          </section>

          <section>
            <h2>5. Cookies & Analytics</h2>
            <p>
              We use Google Analytics 4 (GA4) to understand how visitors interact
              with our site. GA4 uses first-party cookies. You may disable cookies
              through your browser settings. We do not sell your personal data.
            </p>
          </section>

          <section>
            <h2>6. Third-Party Services</h2>
            <p>We share data with trusted third parties only as necessary:</p>
            <ul>
              <li>
                <strong className="text-white/90">Shopify</strong> — e-commerce
                platform and payment processing
              </li>
              <li>
                <strong className="text-white/90">Stripe</strong> — payment
                processing
              </li>
              <li>
                <strong className="text-white/90">Google (Firebase, GA4)</strong>{' '}
                — hosting, database, analytics
              </li>
              <li>
                <strong className="text-white/90">Shipping carriers</strong> —
                order fulfillment
              </li>
            </ul>
            <p className="mt-2">
              We do not sell, rent, or trade your personal information to third
              parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2>7. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Opt out of marketing communications at any time</li>
              <li>Request a copy of your data in a portable format</li>
            </ul>
            <p className="mt-2">
              <strong className="text-white/90">California Residents (CCPA):</strong>{' '}
              You have the right to know what data we collect, request deletion,
              and opt out of the sale of personal information. We do not sell
              personal information.
            </p>
          </section>

          <section>
            <h2>8. Data Retention</h2>
            <p>
              We retain your personal data only as long as necessary to fulfill
              the purposes outlined in this policy, or as required by law. Email
              subscriptions are retained until you unsubscribe. Order data is
              retained for 7 years for tax and compliance purposes.
            </p>
          </section>

          <section>
            <h2>9. Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal data, including encryption in transit (TLS)
              and at rest. However, no method of electronic transmission or
              storage is 100% secure.
            </p>
          </section>

          <section>
            <h2>10. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 13.
              We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated "Last updated" date.
            </p>
          </section>

          <section>
            <h2>12. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, contact us at:
            </p>
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
