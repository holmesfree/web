'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Twitter, Send, MessageCircle, FileText, ExternalLink, Github } from 'lucide-react';

export default function Footer() {
  const navLinks = [
    { href: '#about', label: 'The Story' },
    { href: '#tokenomics', label: 'Tokenomics' },
    { href: '#how-to-mint', label: 'Free Mint' },
    { href: '#roadmap', label: 'Journey' },
  ];

  const resourceLinks = [
    { href: '/holmes-whitepaper.pdf', label: 'Manifesto' },
    { href: 'https://basescan.org', label: 'Basescan' },
    { href: 'https://github.com/free-holmes', label: 'GitHub' },
  ];

  const socialLinks = [
    { href: 'https://twitter.com/FreeHolmesToken', icon: Twitter, label: 'Twitter' },
    { href: 'https://t.me/FreeHolmesCommunity', icon: Send, label: 'Telegram' },
    { href: 'https://discord.gg/freeholmes', icon: MessageCircle, label: 'Discord' },
    { href: 'https://github.com/free-holmes', icon: Github, label: 'GitHub' },
  ];

  return (
    <footer className="relative border-t border-border/50 bg-card/20">
      <div className="container mx-auto px-6 sm:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="text-4xl font-black gradient-text">HOLMES</span>
            </Link>
            <p className="text-lg text-muted-foreground max-w-sm leading-relaxed mb-4 italic font-serif">
              &ldquo;Everyone deserves a second chance.&rdquo;
            </p>
            <p className="text-muted-foreground max-w-sm leading-relaxed mb-8">
              A community token supporting the pardon of Elizabeth Holmes. Everyone deserves a second chance.
            </p>
            <p className="text-xs text-muted-foreground/50 max-w-sm">
              Community meme token. Not financial advice. Not an investment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-bold text-lg mb-6">Quick Links</h4>
            <div className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-foreground font-bold text-lg mb-6">Resources</h4>
            <div className="space-y-4">
              {resourceLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contract Address */}
        <div className="mb-16 p-6 rounded-2xl bg-card/50 border border-border/30 max-w-xl">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Contract (Base)</span>
          </div>
          <code className="text-sm font-mono text-foreground/70 break-all">
            Coming Soon - Contract Not Yet Deployed
          </code>
        </div>

        <Separator className="mb-10 bg-border/30" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} HOLMES Token
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-11 w-11"
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
