'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Twitter, Send, MessageCircle, FileText, ExternalLink, Github, Copy, Check, Plus, ArrowUpRight } from 'lucide-react';
import { HOLMES_ADDRESS } from '@/lib/wagmi';
import { useAddTokenToWallet, useCopyToClipboard } from '@/lib/hooks';

export default function Footer() {
  const { copyToClipboard, copied } = useCopyToClipboard();
  const { addToMetaMask, addedToWallet } = useAddTokenToWallet();

  const navLinks = [
    { href: '#about', label: 'The Story' },
    { href: '#tokenomics', label: 'Tokenomics' },
    { href: '#how-to-mint', label: 'Free Mint' },
    { href: '#roadmap', label: 'Journey' },
  ];

  const resourceLinks = [
    { href: '/holmes-whitepaper.pdf', label: 'Manifesto' },
    { href: `https://basescan.org/token/${HOLMES_ADDRESS}`, label: 'Basescan' },
    { href: 'https://github.com/holmesfree', label: 'GitHub' },
  ];

  const socialLinks = [
    { href: 'https://twitter.com/FreeHolmesToken', icon: Twitter, label: 'Twitter' },
    { href: 'https://t.me/FreeHolmesCommunity', icon: Send, label: 'Telegram' },
    { href: 'https://discord.gg/freeholmes', icon: MessageCircle, label: 'Discord' },
    { href: 'https://github.com/holmesfree', icon: Github, label: 'GitHub' },
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
        <div className="mb-16 p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border-2 border-amber-500/30 max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-bold text-foreground">HOLMES Contract (Base)</span>
            </div>
            <span className="text-xs px-3 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
              Live
            </span>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-background/80 border border-amber-500/20 mb-4">
            <code className="flex-1 font-mono text-sm sm:text-base text-amber-300 break-all font-semibold">
              {HOLMES_ADDRESS}
            </code>
            <Button
              onClick={() => copyToClipboard(HOLMES_ADDRESS, 'Contract address copied!')}
              size="icon"
              variant="ghost"
              className="shrink-0 hover:bg-amber-500/20"
              title="Copy address"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-amber-400" />
              )}
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={addToMetaMask}
              variant="outline"
              size="sm"
              className="flex-1 border-amber-500/40 hover:bg-amber-500/20"
            >
              {addedToWallet ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-400" />
                  Added to Wallet
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add to MetaMask
                </>
              )}
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 border-amber-500/40 hover:bg-amber-500/20"
            >
              <a
                href={`https://basescan.org/token/${HOLMES_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Basescan
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 border-amber-500/40 hover:bg-amber-500/20"
            >
              <a
                href={`https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=${HOLMES_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Trade on Uniswap
              </a>
            </Button>
          </div>
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
