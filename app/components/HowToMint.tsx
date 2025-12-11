'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wallet, Globe, Gift, Sparkles, ExternalLink, Heart } from 'lucide-react';
import MintButton from './MintButton';
import { HOLMES_ADDRESS } from '@/lib/wagmi';

export default function HowToMint() {
  const steps = [
    {
      icon: Wallet,
      number: 1,
      title: 'Get a Wallet',
      description: 'Download MetaMask or Coinbase Wallet. It takes about 2 minutes.',
    },
    {
      icon: Globe,
      number: 2,
      title: 'Connect to Base',
      description: 'Add the Base network to your wallet. Low fees, fast transactions.',
    },
    {
      icon: Gift,
      number: 3,
      title: 'Free Mint',
      description: 'Click the button below to claim your 1,000 HOLMES tokens. Just pay gas.',
    },
    {
      icon: Sparkles,
      number: 4,
      title: 'Join the Movement',
      description: 'Share the story. Spread the word. Help us appeal for a second chance.',
    },
  ];

  return (
    <section id="how-to-mint" className="py-32 sm:py-40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 sm:mb-24 max-w-3xl mx-auto">
          <Badge variant="outline" className="px-5 py-2.5 mb-8 border-orange-500/20 bg-orange-500/5">
            <Heart className="w-4 h-4 mr-2 text-orange-400" />
            Join Us
          </Badge>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground mb-6">
            How to Mint
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Four simple steps to join the movement for a second chance.
          </p>
        </div>

        {/* Giant Mint Button */}
        <div className="max-w-4xl mx-auto mb-20">
          <Card className="border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-black text-foreground mb-4">
                Free Mint: 1,000 HOLMES
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                Every wallet can mint 1,000 HOLMES tokens for free (just gas).
                One mint per address—because everyone deserves exactly one second chance.
              </p>
              <MintButton size="giant" />
            </CardContent>
          </Card>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <Card
                  key={step.number}
                  className="border-border/30 bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-orange-500/20 transition-all duration-500 hover:-translate-y-1"
                >
                  <CardContent className="p-8">
                    <div className="flex gap-6">
                      <div className="shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-3 text-xs">
                          Step {step.number}
                        </Badge>
                        <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contract Address */}
          <Card className="border-border/30 bg-card/30 backdrop-blur-sm mb-12">
            <CardContent className="p-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">Contract Address (Base)</p>
              <code className="block text-base font-mono text-primary bg-secondary/30 px-6 py-4 rounded-xl break-all mb-4">
                {HOLMES_ADDRESS}
              </code>
              <p className="text-xs text-muted-foreground">Always verify before minting</p>
            </CardContent>
          </Card>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MintButton />
            <Button asChild variant="outline" size="lg" className="h-14 px-10 text-base font-semibold">
              <a
                href={`https://basescan.org/address/${HOLMES_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Basescan
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
