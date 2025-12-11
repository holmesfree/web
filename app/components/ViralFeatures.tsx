'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Share2,
  Twitter,
  MessageCircle,
  Copy,
  Check,
  Users,
  Flame,
  Zap,
  Heart,
  TrendingUp,
  Feather
} from 'lucide-react';
import MintButton from './MintButton';

// Simulated live stats that would come from blockchain/API
const useStats = () => {
  const [stats, setStats] = useState({
    minters: 0,
    holders: 0,
    tweets: 0
  });

  useEffect(() => {
    // Simulate growing numbers
    const interval = setInterval(() => {
      setStats(prev => ({
        minters: Math.min(prev.minters + Math.floor(Math.random() * 3), 10000),
        holders: Math.min(prev.holders + Math.floor(Math.random() * 5), 25000),
        tweets: Math.min(prev.tweets + Math.floor(Math.random() * 2), 5000)
      }));
    }, 3000);

    // Initialize with some base numbers
    setStats({
      minters: 1247,
      holders: 3891,
      tweets: 892
    });

    return () => clearInterval(interval);
  }, []);

  return stats;
};

// Countdown to a symbolic date
const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Countdown to July 4, 2026 - "Independence Day for Holmes"
    const targetDate = new Date('2026-07-04T00:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
};

export default function ViralFeatures() {
  const [copied, setCopied] = useState(false);
  const stats = useStats();
  const countdown = useCountdown();

  const shareUrl = 'https://holmes.free';
  const shareText = "Everyone deserves a second chance. 🔥 Free mint $HOLMES token - a movement for redemption. #FreeHolmes #SecondChance";

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <section id="community" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-600/5 blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="outline" className="px-4 py-2 border-primary/20 bg-primary/5">
              <Flame className="w-4 h-4 mr-2 text-primary" />
              Go Viral
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
            Join the <span className="gradient-text">Movement</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One voice can be dismissed. A chorus cannot be ignored.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Countdown Card */}
          <Card className="border-border/30 bg-card/30 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-lg">Countdown to Independence Day</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">July 4, 2026 - The day we deliver our petition</p>

              <div className="grid grid-cols-4 gap-3">
                {[
                  { value: countdown.days, label: 'Days' },
                  { value: countdown.hours, label: 'Hours' },
                  { value: countdown.minutes, label: 'Mins' },
                  { value: countdown.seconds, label: 'Secs' }
                ].map((item, i) => (
                  <div key={i} className="text-center p-3 rounded-lg bg-background/50 border border-border/30">
                    <div className="text-2xl sm:text-3xl font-black gradient-text">{item.value}</div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Live Stats Card */}
          <Card className="border-border/30 bg-card/30 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <h3 className="font-bold text-lg">Live Movement Stats</h3>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-amber-400" />
                    <span className="text-sm">Free Minters</span>
                  </div>
                  <span className="font-bold text-lg">{stats.minters.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-pink-400" />
                    <span className="text-sm">HOLMES Holders</span>
                  </div>
                  <span className="font-bold text-lg">{stats.holders.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30">
                  <div className="flex items-center gap-3">
                    <Twitter className="w-5 h-5 text-blue-400" />
                    <span className="text-sm">#FreeHolmes Tweets</span>
                  </div>
                  <span className="font-bold text-lg">{stats.tweets.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Share Buttons */}
        <Card className="max-w-2xl mx-auto mt-8 border-border/30 bg-card/30 backdrop-blur-sm">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6 justify-center">
              <Share2 className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg">Spread the Word</h3>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                onClick={shareTwitter}
                className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Share on X
              </Button>
              <Button
                onClick={shareTelegram}
                className="bg-[#0088cc] hover:bg-[#0077b3] text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Share on Telegram
              </Button>
              <Button
                onClick={copyLink}
                variant="outline"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-green-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-background/50 border border-border/30">
              <p className="text-sm text-muted-foreground text-center">
                <span className="font-semibold text-foreground">Pro tip:</span> Use{' '}
                <span className="text-amber-400 font-mono">#FreeHolmes</span> and{' '}
                <span className="text-amber-400 font-mono">$HOLMES</span> to join the conversation
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12 space-y-8">
          <p className="text-xl sm:text-2xl font-serif italic text-muted-foreground max-w-2xl mx-auto">
            &ldquo;In a world that loves a comeback story, let&apos;s write one together.&rdquo;
          </p>
          <div className="flex justify-center">
            <MintButton size="large" />
          </div>
        </div>
      </div>
    </section>
  );
}
