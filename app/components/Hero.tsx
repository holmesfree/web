'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Copy, Feather, Heart, Scale, Sparkles, ExternalLink } from 'lucide-react';

// Dynamic import to avoid SSR issues with the spinning coin
const SpinningCoin = dynamic(() => import('./SpinningCoin'), { ssr: false });

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const contractAddress = '0x0000000000000000000000000000000000000000'; // TBD after deployment

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-amber-600/10 blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-yellow-600/8 blur-[130px] animate-pulse-glow delay-200" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* 3D Spinning Coin */}
          <div className="mb-10 animate-fade-in">
            <SpinningCoin />
            <p className="text-xs text-muted-foreground/50 mt-4">
              Photo: Max Morse/TechCrunch (CC BY 2.0)
            </p>
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
            <span className="text-foreground">Everyone deserves</span>
            <br />
            <span className="gradient-text">redemption.</span>
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
            <Button asChild size="lg" className="h-14 px-10 text-base font-semibold bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 border-0 glow-sm hover:glow-md transition-all">
              <a href="#how-to-mint">
                <Sparkles className="w-5 h-5 mr-2" />
                Free Mint HOLMES
              </a>
            </Button>
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

          {/* Contract Address Card */}
          <Card className="max-w-xl mx-auto border-border/30 bg-card/30 backdrop-blur-sm animate-fade-in delay-400">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Contract Address (Base)
                </span>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Coming Soon
                </Badge>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-border/30">
                <code className="flex-1 font-mono text-sm text-foreground/70 break-all">
                  {contractAddress}
                </code>
                <Button
                  onClick={copyToClipboard}
                  size="icon"
                  variant="ghost"
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
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
