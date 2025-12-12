'use client';

import { useState, useEffect, createContext, useContext, useRef } from 'react';
import { X, Sparkles, Users } from 'lucide-react';

const BANNER_DISMISSED_KEY = 'holmes-banner-dismissed';
const BANNER_HEIGHT = 44; // px - keep in sync with actual banner height
const TOTAL_SUPPLY = 1_000_000_000; // 1B total token supply
const LP_ALLOCATION = 100_000_000; // 100M tokens allocated to LP at start
const TOKENS_PER_MINT = 1000; // Each mint is 1000 tokens

// Polling intervals with backoff: 1s, 3s, 5s, 15s
const POLL_INTERVALS = [1000, 3000, 5000, 15000];

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
  const [displayCount, setDisplayCount] = useState(0);
  const [targetCount, setTargetCount] = useState(0);
  const [phase, setPhase] = useState<'initial' | 'live'>('initial');
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startValueRef = useRef(0);
  const startTimeRef = useRef(0);
  const pollIndexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Eased animation function - animates from current to target over duration
  const animateTo = (from: number, to: number, duration: number, onComplete?: () => void) => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    startValueRef.current = from;
    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(startValueRef.current + (to - startValueRef.current) * eased);

      setDisplayCount(value);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayCount(to);
        onComplete?.();
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // Fetch initial data on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { fetchMinterCount } = await import('@/lib/api');
        const minters = await fetchMinterCount();
        const initialTarget = LP_ALLOCATION + (minters * TOKENS_PER_MINT);
        
        setTargetCount(initialTarget);
        setInitialLoadComplete(true);
      } catch (error) {
        console.error('Error fetching initial mint count:', error);
        // Fallback to LP allocation only
        setTargetCount(LP_ALLOCATION);
        setInitialLoadComplete(true);
      }
    };

    fetchInitialData();
  }, []);

  // Phase 1: Animate 0 -> initial target on mount
  useEffect(() => {
    if (!initialLoadComplete || phase !== 'initial') return;

    // Start live polling immediately
    setPhase('live');
    
    // Animate from current display count to the initial target
    animateTo(displayCount, targetCount, 1500);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [phase, displayCount, targetCount, initialLoadComplete]);

  // Phase 2: Fetch live data with backoff polling
  useEffect(() => {
    if (phase !== 'live') return;

    const fetchData = async () => {
      try {
        const { fetchMinterCount } = await import('@/lib/api');
        const minters = await fetchMinterCount();
        const totalTokens = LP_ALLOCATION + (minters * TOKENS_PER_MINT);

        // Always update target to the latest value
        setTargetCount(prev => {
          // Only animate if the new value is different from current
          if (totalTokens !== prev) {
            // Reset backoff when we get new data
            pollIndexRef.current = 0;
            console.log(`New mint count detected: ${minters} mints, ${totalTokens} total tokens`);
            return totalTokens;
          }
          // Increase backoff when no change
          pollIndexRef.current = Math.min(pollIndexRef.current + 1, POLL_INTERVALS.length - 1);
          return prev;
        });
      } catch (error) {
        console.error('Error fetching mint count:', error);
      }

      // Schedule next poll with current interval
      const nextInterval = POLL_INTERVALS[pollIndexRef.current];
      timeoutRef.current = setTimeout(fetchData, nextInterval);
    };

    // Start polling with initial delay
    const initialDelay = 1000; // Start polling 1 second after initial animation
    timeoutRef.current = setTimeout(fetchData, initialDelay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [phase]);

  // Animate to new target when it changes
  useEffect(() => {
    if (phase !== 'live' || targetCount === displayCount) return;

    // Animate from current display to new target over 1.5s
    // Always animate to the new target, even if it's lower (shouldn't happen, but handle gracefully)
    animateTo(displayCount, targetCount, 1500);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [targetCount, phase, displayCount]);

  useEffect(() => {
    setMounted(true);
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

  const progressPercent = (displayCount / TOTAL_SUPPLY) * 100;

  // Always format as XXX.XXXM
  const formatTokens = (num: number) => {
    return (num / 1_000_000).toFixed(3) + 'M';
  };

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
                <span className="font-bold tabular-nums">{formatTokens(displayCount)}</span>
                <span className="text-black/60 hidden sm:inline">minted</span>
              </div>

              <div className="flex-1 h-1.5 bg-black/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black/50 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                />
              </div>

              <div
                className="flex items-center gap-1.5 text-black/80 text-sm"
                title="of 1,000,000,000 MAX"
              >
                <span className="text-black/60">of 1B</span>
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
