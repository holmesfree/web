'use client';

import { useState, useEffect, createContext, useContext, useRef } from 'react';
import { X, Sparkles, Users, TrendingUp } from 'lucide-react';
import { MAX_MINTS } from '@/lib/wagmi';

const BANNER_DISMISSED_KEY = 'holmes-banner-dismissed';
const BANNER_HEIGHT = 44; // px - keep in sync with actual banner height

// Context to share banner state with other components
interface BannerContextType {
  bannerVisible: boolean;
  bannerHeight: number;
}
export const BannerContext = createContext<BannerContextType>({ bannerVisible: false, bannerHeight: 0 });
export const useBanner = () => useContext(BannerContext);

// Provider component to wrap the app
export function BannerProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Always show banner on page load - clear any previous dismissal
    localStorage.removeItem(BANNER_DISMISSED_KEY);
    setDismissed(false);
  }, []);

  const bannerVisible = mounted && !dismissed;

  return (
    <BannerContext.Provider value={{ bannerVisible, bannerHeight: bannerVisible ? BANNER_HEIGHT : 0 }}>
      {children}
    </BannerContext.Provider>
  );
}

export default function MintBanner() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mintCount, setMintCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch live stats and poll every 3 seconds
  useEffect(() => {
    const fetchMintCount = async () => {
      try {
        const { fetchMinterCount } = await import('@/lib/api');
        const count = await fetchMinterCount();
        setMintCount(count);
      } catch (error) {
        console.error('Error fetching mint count:', error);
      }
    };

    fetchMintCount();
    const interval = setInterval(fetchMintCount, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animate the count when it changes
  useEffect(() => {
    if (displayCount === mintCount) return;

    // Clear any existing animation
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    // Animate towards the new count
    const diff = mintCount - displayCount;
    const step = Math.max(1, Math.ceil(Math.abs(diff) / 20));

    const animate = () => {
      setDisplayCount(prev => {
        if (prev < mintCount) {
          return Math.min(prev + step, mintCount);
        } else if (prev > mintCount) {
          return Math.max(prev - step, mintCount);
        }
        return prev;
      });
    };

    animationRef.current = setTimeout(animate, 50);
    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, [mintCount, displayCount]);

  useEffect(() => {
    setMounted(true);
    // Always show banner on page load - clear any previous dismissal
    localStorage.removeItem(BANNER_DISMISSED_KEY);
    setDismissed(false);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(BANNER_DISMISSED_KEY, 'true');
  };

  const scrollToMint = () => {
    document.getElementById('how-to-mint')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted || dismissed) return null;

  const currentMints = displayCount;
  const mintsRemaining = MAX_MINTS - currentMints;
  const progressPercent = (currentMints / MAX_MINTS) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] animate-slide-down" style={{ height: BANNER_HEIGHT }}>
      <div
        onClick={scrollToMint}
        className="relative h-full overflow-hidden bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 bg-[length:200%_100%] animate-gradient-x cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer pointer-events-none" />

        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="flex items-center justify-between gap-4 w-full">
            {/* Left: Simple CTA */}
            <div className="flex items-center gap-2 text-black font-semibold">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>FREE MINT LIVE!</span>
            </div>

            {/* Center: Progress bar with counts */}
            <div className="flex-1 max-w-lg flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-black/80 text-sm">
                <Users className="w-3.5 h-3.5" />
                <span className="font-bold">{currentMints.toLocaleString()}</span>
                <span className="text-black/60 hidden sm:inline">minted</span>
              </div>

              <div className="flex-1 h-1.5 bg-black/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black/50 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                />
              </div>

              <div className="flex items-center gap-1.5 text-black/80 text-sm">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="font-bold">{mintsRemaining.toLocaleString()}</span>
                <span className="text-black/60 hidden sm:inline">left</span>
              </div>
            </div>

            {/* Right: Dismiss */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
              className="p-1 hover:bg-black/10 rounded-full transition-colors text-black/70 hover:text-black"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
