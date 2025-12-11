import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Terms of Service | HOLMES Token',
  description: 'Terms of Service for the HOLMES Token website and community.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-black mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: December 11, 2025</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using the HOLMES Token website (holmes.free), interacting with the HOLMES smart contract,
              or participating in any HOLMES community activities, you agree to be bound by these Terms of Service.
              If you do not agree to these terms, do not use our services.
            </p>
          </section>

          <section className="p-6 border-2 border-red-500/50 rounded-lg bg-red-500/5">
            <h2 className="text-2xl font-bold mb-4 text-red-400">CRITICAL FINANCIAL DISCLAIMER</h2>
            <p className="text-muted-foreground leading-relaxed mb-4 font-semibold">
              READ THIS CAREFULLY BEFORE PARTICIPATING:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>YOU MAY LOSE ALL YOUR MONEY.</strong> Assume any funds spent on or exchanged for HOLMES tokens may be lost entirely.</li>
              <li><strong>THIS IS NOT A SECURITY.</strong> HOLMES does not represent an investment contract, security, or financial instrument under any jurisdiction&apos;s laws.</li>
              <li><strong>NO EXPECTATION OF PROFIT.</strong> Do not purchase or hold HOLMES with the expectation of profit from the efforts of others.</li>
              <li><strong>NO TEAM, NO PROMISES.</strong> There is no formal team, company, or entity behind HOLMES. There are no promises of development, utility, or future value.</li>
              <li><strong>EXTREME VOLATILITY.</strong> Meme tokens can lose 99%+ of their value in minutes. This is normal for this asset class.</li>
              <li><strong>LIQUIDITY RISK.</strong> You may not be able to sell your tokens at any price.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Nature of HOLMES Token</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              HOLMES is a community meme token created as a cultural statement and social movement. It is important
              to understand the following:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>HOLMES is NOT an investment vehicle and should not be treated as such</li>
              <li>HOLMES has no intrinsic value and may become worthless</li>
              <li>HOLMES does not represent any ownership, equity, or claim to any assets</li>
              <li>HOLMES does not guarantee any returns, profits, or financial benefits</li>
              <li>The value of HOLMES may fluctuate dramatically and unpredictably</li>
              <li>You may lose the entire value of any funds used to acquire HOLMES</li>
            </ul>
          </section>

          <section className="p-6 border border-amber-500/50 rounded-lg bg-amber-500/5">
            <h2 className="text-2xl font-bold mb-4 text-amber-400">Position on Elizabeth Holmes&apos; Actions</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>The HOLMES community does not condone, excuse, or minimize fraud, deception, or any criminal activity.</strong>
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Elizabeth Holmes was convicted of wire fraud in a court of law. The evidence presented at trial
              established that investors were misled about Theranos technology. These facts are not disputed by this movement.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our position is that she has been held accountable, is serving her sentence, and that the principles of
              rehabilitation, redemption, and mercy are also important components of a just society. We believe in
              justice AND compassion—not one at the expense of the other.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. No Affiliation</h2>
            <p className="text-muted-foreground leading-relaxed">
              HOLMES Token, its creators, and community members are not affiliated with, endorsed by, or connected
              to Elizabeth Holmes, Theranos, or any related parties. This is an independent community project
              expressing viewpoints about criminal justice reform and second chances.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              You must be at least 18 years old and legally capable of entering into binding contracts to use our
              services. By using our services, you represent and warrant that you meet these requirements. You are
              responsible for ensuring that your use of HOLMES complies with all laws and regulations applicable
              to you in your jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Risks</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You acknowledge and accept the following risks:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Market Risk:</strong> Cryptocurrency markets are highly volatile</li>
              <li><strong>Technology Risk:</strong> Smart contracts may contain bugs or vulnerabilities</li>
              <li><strong>Regulatory Risk:</strong> Laws regarding cryptocurrencies may change</li>
              <li><strong>Liquidity Risk:</strong> You may not be able to sell or transfer HOLMES</li>
              <li><strong>Loss Risk:</strong> You may lose access to your tokens due to lost keys, hacks, or errors</li>
              <li><strong>No Recourse:</strong> Blockchain transactions are irreversible</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Prohibited Activities</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Use our services for any illegal purpose or in violation of any laws</li>
              <li>Manipulate or attempt to manipulate the price of HOLMES</li>
              <li>Engage in market manipulation, wash trading, or other deceptive practices</li>
              <li>Use our services to launder money or finance illegal activities</li>
              <li>Interfere with or disrupt our services or servers</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Misrepresent your identity or affiliation</li>
              <li>Promote HOLMES as an investment opportunity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The HOLMES name, logo, website content, and associated materials are provided for community use.
              The smart contract code is open source and available for review. You may not use our intellectual
              property in ways that are misleading or harmful to the community.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              OUR SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
              EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR
              SECURE. WE MAKE NO WARRANTIES REGARDING THE VALUE, UTILITY, OR FUTURE PERFORMANCE OF HOLMES TOKEN.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, HOLMES TOKEN, ITS CREATORS, DEVELOPERS, AND COMMUNITY
              MEMBERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
              DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE
              LOSSES, RESULTING FROM YOUR USE OF OR INABILITY TO USE OUR SERVICES.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to indemnify, defend, and hold harmless HOLMES Token, its creators, developers, and
              community members from any claims, damages, losses, liabilities, costs, and expenses arising
              from your use of our services, violation of these terms, or violation of any third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction
              in which you reside, without regard to its conflict of law provisions. Any disputes arising
              from these Terms shall be resolved through binding arbitration.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">12. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately
              upon posting to this website. Your continued use of our services after any changes constitutes
              acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">13. Severability</h2>
            <p className="text-muted-foreground leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall
              be limited or eliminated to the minimum extent necessary, and the remaining provisions shall
              remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">14. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms, please reach out through our community channels on Twitter
              (@FreeHolmesToken) or Telegram (t.me/FreeHolmesCommunity).
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            By using HOLMES Token services, you acknowledge that you have read, understood, and agree to these Terms of Service.
          </p>
        </div>
      </div>
    </main>
  );
}
