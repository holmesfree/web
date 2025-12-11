'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Copy, ExternalLink, Plus, TrendingUp, BarChart3 } from 'lucide-react';
import { HOLMES_ADDRESS, TRADING_LINKS } from '@/lib/wagmi';
import { useAddTokenToWallet, useCopyToClipboard } from '@/lib/hooks';

export default function ContractCard() {
  const { copyToClipboard, copied } = useCopyToClipboard();
  const { addToMetaMask, addedToWallet } = useAddTokenToWallet();

  return (
    <section id="contract" className="py-16 relative">
      <div className="container mx-auto px-6 sm:px-8">
        <Card className="max-w-2xl mx-auto border-2 border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-yellow-500/5 backdrop-blur-sm shadow-lg shadow-amber-500/10">
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
                {HOLMES_ADDRESS}
              </code>
              <Button
                onClick={() => copyToClipboard(HOLMES_ADDRESS, 'Contract address copied!')}
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
            {/* Trading Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              <Button
                asChild
                className="bg-pink-600 hover:bg-pink-500 text-white h-12 font-semibold"
              >
                <a
                  href={TRADING_LINKS.uniswap}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Buy on Uniswap
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-green-500/40 hover:bg-green-500/20 text-green-400 h-12"
              >
                <a
                  href={TRADING_LINKS.dexscreener}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  DEXScreener
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-blue-500/40 hover:bg-blue-500/20 text-blue-400 h-12"
              >
                <a
                  href={TRADING_LINKS.dextools}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  DEXTools
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-amber-500/40 hover:bg-amber-500/20 h-12"
              >
                <a
                  href={TRADING_LINKS.basescan}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Basescan
                </a>
              </Button>
            </div>

            {/* Wallet Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-3">
              <Button
                onClick={addToMetaMask}
                variant="outline"
                className="flex-1 border-amber-500/40 hover:bg-amber-500/20 h-11"
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
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
