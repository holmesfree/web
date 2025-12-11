'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, TrendingUp, Coins, ExternalLink } from 'lucide-react';
import { HOLMES_ADDRESS, POOL_ADDRESS } from '@/lib/wagmi';

export default function Trade() {
  const UNISWAP_SWAP_URL = `https://app.uniswap.org/swap?outputCurrency=${HOLMES_ADDRESS}&chain=base`;
  const UNISWAP_POOL_URL = `https://app.uniswap.org/explore/pools/base/${POOL_ADDRESS}`;
  const DEXSCREENER_URL = `https://dexscreener.com/base/${POOL_ADDRESS}`;

  return (
    <section id="trade" className="py-32 sm:py-40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-green-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 sm:mb-24 max-w-3xl mx-auto">
          <Badge variant="outline" className="px-5 py-2.5 mb-8 border-green-500/20 bg-green-500/5">
            <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
            Trade
          </Badge>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground mb-6">
            Get HOLMES
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Trade HOLMES on Uniswap. 100M tokens in liquidity on Base.
          </p>
        </div>

        {/* Trade Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 to-amber-500/5 backdrop-blur-sm">
            <CardContent className="p-10 sm:p-12">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-amber-500 mb-6">
                  <Coins className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black text-foreground mb-4">
                  Swap on Uniswap
                </h3>
                <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                  HOLMES is live on Uniswap V3 with deep liquidity. Trade ETH for HOLMES on Base network.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10">
                <div className="text-center p-4 rounded-xl bg-background/50 border border-border/30">
                  <div className="text-2xl font-bold text-foreground">100M</div>
                  <div className="text-sm text-muted-foreground">Initial LP</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-background/50 border border-border/30">
                  <div className="text-2xl font-bold text-foreground">1%</div>
                  <div className="text-sm text-muted-foreground">Swap Fee</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-background/50 border border-border/30 col-span-2 sm:col-span-1">
                  <div className="text-2xl font-bold text-foreground">Base</div>
                  <div className="text-sm text-muted-foreground">Network</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-10 text-base font-semibold bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 border-0"
                >
                  <a
                    href={UNISWAP_SWAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowUpRight className="w-5 h-5 mr-2" />
                    Trade on Uniswap
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 px-10 text-base font-semibold border-green-500/40 hover:bg-green-500/10"
                >
                  <a
                    href={UNISWAP_POOL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    View Pool
                  </a>
                </Button>
              </div>

              {/* DEX Screener link */}
              <div className="mt-8 text-center">
                <a
                  href={DEXSCREENER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  View on DEX Screener
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
