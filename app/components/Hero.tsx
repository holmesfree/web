'use client';

import dynamic from 'next/dynamic';
import { Badge } from '@/components/ui/badge';
import { Feather } from 'lucide-react';

// Dynamic import to avoid SSR issues with the mint coin
const MintCoin = dynamic(() => import('./MintCoin'), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-amber-600/10 blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-yellow-600/8 blur-[130px] animate-pulse-glow delay-200" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* 3D Mint Coin - Click to Mint */}
          <div className="mb-8 animate-fade-in">
            <MintCoin />
          </div>

          {/* Badge */}
          <div className="mb-6 animate-fade-in delay-100">
            <Badge variant="outline" className="px-5 py-2.5 text-sm border-primary/20 bg-primary/5">
              <Feather className="w-4 h-4 mr-2 text-primary" />
              A Second Chance
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-6 animate-fade-in delay-200">
            <span className="text-foreground">Free Elizabeth</span>
            <br />
            <span className="gradient-text">Holmes.</span>
          </h1>

          {/* Mission Statement */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in delay-300">
            Supporting the pardon of Elizabeth Holmes. Everyone deserves a second chance.
          </p>

          {/* Disclaimer - subtle */}
          <p className="text-xs text-muted-foreground/40 max-w-md mx-auto mt-8 animate-fade-in delay-400">
            Community meme token. Not financial advice. A cultural statement about redemption.
          </p>
        </div>
      </div>
    </section>
  );
}
