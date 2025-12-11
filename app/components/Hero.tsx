'use client';

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Copy, Feather, Heart, Scale, ExternalLink, Plus, Wallet } from 'lucide-react';
import { HOLMES_ADDRESS } from '@/lib/wagmi';
import { useAddTokenToWallet, useCopyToClipboard } from '@/lib/hooks';

// Dynamic import to avoid SSR issues with the mint coin
const MintCoin = dynamic(() => import('./MintCoin'), { ssr: false });

export default function Hero() {
  const { copyToClipboard, copied } = useCopyToClipboard();
  const { addToMetaMask, addedToWallet } = useAddTokenToWallet();
  const contractAddress = HOLMES_ADDRESS;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-amber-600/10 blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-yellow-600/8 blur-[130px] animate-pulse-glow delay-200" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* 3D Mint Coin - Click to Mint */}
          <div className="mb-10 animate-fade-in">
            <MintCoin />
          </div>

          {/* Badge */}
          <div className="mb-8 animate-fade-in">
            <Badge variant="outline" className="px-5 py-2.5 text-sm border-primary/20 bg-primary/5">
              <Feather className="w-4 h-4 mr-2 text-primary" />
              A Second Chance
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-8 animate-fade-in delay-100">
            <span className="text-foreground">Free Elizabeth</span>
            <br />
            <span className="gradient-text">Holmes.</span>
          </h1>

          {/* Mission Statement */}
          <div className="mb-12 animate-fade-in delay-200">
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              Supporting the pardon of Elizabeth Holmes. Everyone deserves a second chance.
            </p>
          </div>

          {/* Value Props */}
          <div className="flex flex-wrap justify-center gap-6 mb-14 animate-fade-in delay-300">
            <Card className="border-border/30 bg-card/30 backdrop-blur-sm">
              <CardContent className="flex items-center gap-4 px-6 py-5">
                <div className="p-3 rounded-xl bg-amber-500/10">
                  <Feather className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-semibold text-foreground">Free Mint</div>
                  <div className="text-sm text-muted-foreground">1,000 HOLMES each</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/30 bg-card/30 backdrop-blur-sm">
              <CardContent className="flex items-center gap-4 px-6 py-5">
                <div className="p-3 rounded-xl bg-yellow-500/10">
                  <Scale className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-semibold text-foreground">Justice</div>
                  <div className="text-sm text-muted-foreground">Tempered with mercy</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/30 bg-card/30 backdrop-blur-sm">
              <CardContent className="flex items-center gap-4 px-6 py-5">
                <div className="p-3 rounded-xl bg-orange-500/10">
                  <Heart className="w-6 h-6 text-orange-400" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-semibold text-foreground">Redemption</div>
                  <div className="text-sm text-muted-foreground">For all who seek it</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in delay-400">
            <Button asChild variant="outline" size="lg" className="h-14 px-10 text-base font-semibold">
              <a
                href="/holmes-whitepaper.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the Manifesto
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>

          {/* Contract Address Card - Prominent */}
          <Card className="max-w-2xl mx-auto border-2 border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-yellow-500/5 backdrop-blur-sm animate-fade-in delay-400 shadow-lg shadow-amber-500/10">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 px-4 py-1.5 text-sm">
                  <Check className="w-4 h-4 mr-2" />
                  Live on Base
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-center text-foreground mb-4">
                HOLMES Token Contract
              </h3>
              <div className="flex items-center gap-3 p-5 rounded-xl bg-background/80 border-2 border-amber-500/30">
                <code className="flex-1 font-mono text-base sm:text-lg text-amber-300 break-all font-semibold text-center">
                  {contractAddress}
                </code>
                <Button
                  onClick={() => copyToClipboard(contractAddress, 'Contract address copied!')}
                  size="icon"
                  variant="outline"
                  className="shrink-0 border-amber-500/40 hover:bg-amber-500/20"
                  title="Copy address"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-amber-400" />
                  )}
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <Button
                  onClick={addToMetaMask}
                  variant="outline"
                  className="flex-1 border-amber-500/40 hover:bg-amber-500/20 h-12"
                >
                  {addedToWallet ? (
                    <>
                      <Check className="w-5 h-5 mr-2 text-green-400" />
                      Added to Wallet
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 mr-2" />
                      Add to MetaMask
                    </>
                  )}
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 border-amber-500/40 hover:bg-amber-500/20 h-12"
                >
                  <a
                    href={`https://basescan.org/token/${contractAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    View on Basescan
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground/50 max-w-md mx-auto mt-8">
            This is a community meme token. Not financial advice. Not an investment. A cultural statement about redemption.
          </p>
        </div>
      </div>
    </section>
  );
}
