import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Privacy Policy | HOLMES Token',
  description: 'Privacy Policy for the HOLMES Token website and community.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: December 11, 2025</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy explains how HOLMES Token (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses,
              and protects information when you use our website (holmes.free) and related services. We are
              committed to protecting your privacy and being transparent about our data practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Information You Provide</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may collect information you voluntarily provide, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Wallet addresses when you connect your wallet to our site</li>
              <li>Transaction data when you interact with the HOLMES smart contract</li>
              <li>Communications if you contact us through social media or community channels</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you visit our website, we may automatically collect:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Device information (browser type, operating system)</li>
              <li>IP address and approximate location</li>
              <li>Pages visited and time spent on site</li>
              <li>Referring website or source</li>
              <li>Interaction data (clicks, scrolls)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Blockchain Data</h3>
            <p className="text-muted-foreground leading-relaxed">
              Please note that blockchain transactions are public by nature. When you mint or transfer HOLMES
              tokens, your wallet address and transaction details are permanently recorded on the Base blockchain
              and visible to anyone. This is inherent to blockchain technology and outside our control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. How We Use Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use collected information to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Provide and maintain our website and services</li>
              <li>Improve user experience and website functionality</li>
              <li>Analyze usage patterns and optimize performance</li>
              <li>Display live statistics about the HOLMES community</li>
              <li>Respond to inquiries and provide support</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Remember your preferences</li>
              <li>Understand how you use our site</li>
              <li>Analyze traffic and usage patterns</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              You can control cookies through your browser settings. Disabling cookies may affect some
              functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Information Sharing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We do not sell your personal information. We may share information in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Service Providers:</strong> With third parties who help us operate our website (hosting, analytics)</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
              <li><strong>Protection:</strong> To protect our rights, privacy, safety, or property</li>
              <li><strong>Consent:</strong> With your explicit consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our website may integrate with or link to third-party services including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Wallet providers (MetaMask, Coinbase Wallet, etc.)</li>
              <li>Blockchain networks (Base)</li>
              <li>Decentralized exchanges (Uniswap)</li>
              <li>Analytics services</li>
              <li>Social media platforms</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              These services have their own privacy policies, and we encourage you to review them. We are not
              responsible for the privacy practices of third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement reasonable security measures to protect your information. However, no method of
              transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute
              security of your data. You are responsible for maintaining the security of your wallet and private keys.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain information for as long as necessary to provide our services and fulfill the purposes
              described in this policy. Blockchain data is permanent and cannot be deleted. Non-blockchain data
              may be retained for legal, analytical, or operational purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Access personal information we hold about you</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information (where applicable)</li>
              <li>Object to or restrict certain processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Note that some data (particularly blockchain data) cannot be modified or deleted due to the
              immutable nature of blockchain technology.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. International Users</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are available globally. By using our services, you consent to the transfer and
              processing of your information in jurisdictions that may have different data protection laws
              than your country of residence.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect
              personal information from children. If you believe we have collected information from a child,
              please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">12. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with
              an updated revision date. We encourage you to review this policy periodically. Your continued
              use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">13. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, please contact us through
              our community channels on Twitter (@FreeHolmesToken) or Telegram (t.me/FreeHolmesCommunity).
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            By using HOLMES Token services, you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </div>
      </div>
    </main>
  );
}
