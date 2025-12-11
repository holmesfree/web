'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Building2, Gavel } from 'lucide-react';

const backers = [
  {
    name: 'Tim Draper',
    role: 'Legendary VC',
    quote: 'I still believe in Elizabeth.',
    highlight: 'Original Investor',
    icon: TrendingUp,
  },
  {
    name: 'David Sacks',
    role: 'PayPal Mafia',
    quote: 'Second chances define America.',
    highlight: 'Trump Ally',
    icon: Building2,
  },
  {
    name: 'Silicon Valley',
    role: 'The Community',
    quote: 'We all believed once.',
    highlight: 'Full Circle',
    icon: Users,
  },
  {
    name: 'The People',
    role: 'Petition Signers',
    quote: 'Mercy over vengeance.',
    highlight: 'Growing Daily',
    icon: Gavel,
  },
];

export default function Backers() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Theranos-style green accent glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#00a878]/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="px-4 py-2 mb-6 border-[#00a878]/30 bg-[#00a878]/5 text-[#00c896]">
            <Users className="w-4 h-4 mr-2" />
            The Movement
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Backing the <span className="gradient-text-theranos">Comeback</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From Silicon Valley legends to everyday believers. The coalition for redemption grows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {backers.map((backer, index) => {
            const Icon = backer.icon;
            return (
              <Card
                key={index}
                className="border-border/30 bg-card/50 backdrop-blur-sm hover:border-[#00a878]/30 transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00a878]/10 flex items-center justify-center group-hover:bg-[#00a878]/20 transition-colors">
                    <Icon className="w-8 h-8 text-[#00a878]" />
                  </div>
                  <Badge className="mb-3 bg-[#00a878]/10 text-[#00c896] border-[#00a878]/20 text-xs">
                    {backer.highlight}
                  </Badge>
                  <h3 className="text-xl font-bold text-foreground mb-1">{backer.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{backer.role}</p>
                  <p className="text-sm italic text-muted-foreground/80">
                    &ldquo;{backer.quote}&rdquo;
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* The Pardon Pitch */}
        <div className="mt-20 max-w-4xl mx-auto">
          <Card className="border-[#00a878]/20 bg-gradient-to-br from-[#00a878]/5 to-transparent backdrop-blur-sm glow-theranos">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00a878]/10 text-[#00c896] text-sm font-medium mb-6">
                <Gavel className="w-4 h-4" />
                The Case for Clemency
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                A Message to <span className="gradient-text">President Trump</span>
              </h3>
              <div className="space-y-4 text-lg text-muted-foreground max-w-2xl mx-auto font-serif italic">
                <p>
                  Elizabeth Holmes dreamed too big and fell too hard. But America has always been the land of second chances.
                </p>
                <p>
                  She has served time. She has two young children. She is not a danger to society.
                </p>
                <p className="text-foreground font-semibold not-italic">
                  Grant her a pardon. Let her story become one of redemption, not destruction.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span className="px-3 py-1 rounded-full bg-card/50 border border-border/30">
                  Mother of Two
                </span>
                <span className="px-3 py-1 rounded-full bg-card/50 border border-border/30">
                  Time Served
                </span>
                <span className="px-3 py-1 rounded-full bg-card/50 border border-border/30">
                  Non-Violent
                </span>
                <span className="px-3 py-1 rounded-full bg-card/50 border border-border/30">
                  Reformed
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
