'use client';

import dynamic from 'next/dynamic';
import { Badge } from '@/components/ui/badge';
import { Feather } from 'lucide-react';

// Dynamic import to avoid SSR issues with the mint coin
const MintCoin = dynamic(() => import('./MintCoin'), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Subtle gradient orbs - Apple-inspired refined glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-amber-500/8 to-yellow-400/4 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-l from-yellow-400/6 to-amber-300/3 blur-[100px] animate-pulse-glow delay-300" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* 3D Mint Coin - Centered with refined spacing */}
          <div className="mb-10 animate-fade-in">
            <MintCoin />
          </div>

          {/* Badge - More refined with subtle elevation */}
          <div className="mb-8 animate-fade-in delay-100">
            <Badge variant="outline" className="px-6 py-3 text-sm border-primary/15 bg-primary/5 backdrop-blur-sm">
              <Feather className="w-4 h-4 mr-2 text-primary opacity-80" />
              <span className="font-medium tracking-wide">A Second Chance</span>
            </Badge>
          </div>

          {/* Main Heading - Apple-style typography with refined tracking */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tighter mb-8 animate-fade-in delay-200">
            <span className="text-foreground block">Free Elizabeth</span>
            <span className="gradient-text block mt-1">Holmes.</span>
          </h1>

          {/* Mission Statement - Refined typography with better rhythm */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground/90 max-w-2xl mx-auto leading-[1.6] animate-fade-in delay-300">
            Supporting the pardon of Elizabeth Holmes. Everyone deserves a second chance.
          </p>

          {/* Disclaimer - More Apple-like subtle and precise */}
          <p className="text-xs text-muted-foreground/50 max-w-md mx-auto mt-10 animate-fade-in delay-400 tracking-wider">
            COMMUNITY MEME TOKEN. NOT FINANCIAL ADVICE. A CULTURAL STATEMENT ABOUT REDEMPTION.
          </p>
        </div>
      </div>
    </section>
  );
}
