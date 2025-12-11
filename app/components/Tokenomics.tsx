'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Coins, AlertTriangle, Gift } from 'lucide-react';
import Link from 'next/link';

export default function Tokenomics() {
  const tokenomicsData = [
    { label: 'Free Mint', value: '90%', tokens: '900M', desc: 'Click to mint', gradient: 'from-amber-500 to-amber-400' },
    { label: 'Initial Liquidity', value: '10%', tokens: '100M', desc: 'Uniswap LP', gradient: 'from-yellow-500 to-yellow-400' },
  ];

  const specs = [
    { label: 'Name', value: 'Holmes' },
    { label: 'Symbol', value: 'HOLMES' },
    { label: 'Supply', value: '1B' },
    { label: 'Chain', value: 'Base' },
    { label: 'Mint', value: 'FREE' },
  ];

  return (
    <section id="tokenomics" className="py-32 sm:py-40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 sm:mb-24 max-w-3xl mx-auto">
          <Badge variant="outline" className="px-5 py-2.5 mb-8 border-yellow-500/20 bg-yellow-500/5">
            <PieChart className="w-4 h-4 mr-2 text-yellow-400" />
            Distribution
          </Badge>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground mb-6">
            Tokenomics
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Fair launch. Free mint. Everyone gets a chance.
          </p>
        </div>

        {/* Free Mint Highlight */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="border-amber-500/30 bg-amber-500/5 glow-sm">
            <CardContent className="p-8 flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-amber-500/10">
                <Gift className="w-10 h-10 text-amber-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  <Link href="#how-to-mint" className="hover:text-amber-400 transition-colors">
                    Free Mint: 1,000 HOLMES
                  </Link>
                </h3>
                <p className="text-muted-foreground">
                  Every wallet can mint 1,000 HOLMES tokens for free (just gas). One mint per address—because everyone deserves exactly one second chance.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Token Specs */}
        <div className="max-w-3xl mx-auto mb-16">
          <Card className="border-border/30 bg-card/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-amber-500/10">
                  <Coins className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Token Details</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                {specs.map((spec, index) => (
                  <div key={index} className="text-center p-3 sm:p-4 rounded-xl bg-secondary/30">
                    <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1 sm:mb-2">{spec.label}</div>
                    <div className="text-sm sm:text-base font-semibold text-foreground">{spec.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Distribution Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-2xl mx-auto mb-16">
          {tokenomicsData.map((item, index) => (
            <Card
              key={index}
              className="border-border/30 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-500 hover:-translate-y-1"
            >
              <CardContent className="p-4 sm:p-8 text-center">
                <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-2 sm:mb-4 font-medium">
                  {item.label}
                </div>
                <div className={`text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-1 sm:mb-2`}>
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">{item.desc}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-8 flex items-start gap-5">
              <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
              <p className="text-sm text-amber-200/80 leading-relaxed">
                <strong className="text-amber-400">Important:</strong> HOLMES is a community meme token. Not financial advice. Assume any money spent may be lost. This is a cultural statement, not an investment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
