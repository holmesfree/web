'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useAccount, useConnect, useWriteContract, useReadContract, useWaitForTransactionReceipt, useSwitchChain } from 'wagmi';
import { base } from 'wagmi/chains';
import { HOLMES_ADDRESS, HOLMES_ABI } from '@/lib/wagmi';
import { Loader2, Check, Wallet } from 'lucide-react';
import { formatUnits } from 'viem';

export default function MintCoin() {
  const coinRef = useRef<HTMLDivElement>(null);
  const [clickCount, setClickCount] = useState(0);
  const [showMintEffect, setShowMintEffect] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors } = useConnect();
  const { switchChain } = useSwitchChain();

  const isWrongNetwork = isConnected && chainId !== base.id;

  // Check if user has already minted
  const { data: hasMinted, refetch: refetchHasMinted } = useReadContract({
    address: HOLMES_ADDRESS,
    abi: HOLMES_ABI,
    functionName: 'hasMinted',
    args: address ? [address] : undefined,
  });

  // Get user's HOLMES balance
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: HOLMES_ADDRESS,
    abi: HOLMES_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  // Write contract
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Refetch data after successful mint
  useEffect(() => {
    if (isSuccess) {
      refetchHasMinted();
      refetchBalance();
      setShowMintEffect(true);
      setTimeout(() => setShowMintEffect(false), 2000);
    }
  }, [isSuccess, refetchHasMinted, refetchBalance]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCoinClick = () => {
    if (!mounted) return;

    // Add click animation
    setClickCount(prev => prev + 1);

    // If not connected, connect wallet
    if (!isConnected) {
      connect({ connector: connectors[0] });
      return;
    }

    // If on wrong network, switch to Base
    if (isWrongNetwork) {
      switchChain({ chainId: base.id });
      return;
    }

    // If already minted, just animate
    if (hasMinted) {
      return;
    }

    // If not pending, trigger mint
    if (!isPending && !isConfirming) {
      writeContract({
        address: HOLMES_ADDRESS,
        abi: HOLMES_ABI,
        functionName: 'freeMint',
      });
    }
  };

  useEffect(() => {
    const coin = coinRef.current;
    if (!coin) return;

    let rotation = 0;
    let animationId: number;
    let lastUpdateTime = performance.now();
    let isDragging = false;
    let startX = 0;
    let startRotation = 0;

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      startX = clientX;
      startRotation = rotation;
      coin.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const deltaX = clientX - startX;
      rotation = startRotation + deltaX * 0.5;
      coin.style.transform = `rotateY(${rotation}deg)`;
    };

    const handleMouseUp = () => {
      isDragging = false;
      coin.style.cursor = 'grab';
    };

    coin.addEventListener('mousedown', handleMouseDown);
    coin.addEventListener('touchstart', handleMouseDown, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);

    const animate = () => {
      const now = performance.now();
      const deltaTime = now - lastUpdateTime;
      lastUpdateTime = now;

      if (!isDragging) {
        rotation += 0.5 * (deltaTime / 16.67);
        coin.style.transform = `rotateY(${rotation}deg)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      coin.removeEventListener('mousedown', handleMouseDown);
      coin.removeEventListener('touchstart', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  const coinThickness = 12;
  const coinSize = 220;

  const getStatusText = () => {
    if (!mounted) return 'Loading...';
    if (!isConnected) return 'Click to Connect Wallet';
    if (isWrongNetwork) return 'Click to Switch to Base';
    if (hasMinted) {
      const formattedBalance = balance ? formatUnits(balance, 18) : '0';
      return `You have ${Number(formattedBalance).toLocaleString()} HOLMES`;
    }
    if (isPending) return 'Confirm in Wallet...';
    if (isConfirming) return 'Minting...';
    if (isSuccess) return 'Minted 1,000 HOLMES!';
    return 'Click to Mint 1,000 HOLMES';
  };

  const getStatusIcon = () => {
    if (!isConnected) return <Wallet className="w-4 h-4 mr-2" />;
    if (hasMinted || isSuccess) return <Check className="w-4 h-4 mr-2 text-green-400" />;
    if (isPending || isConfirming) return <Loader2 className="w-4 h-4 mr-2 animate-spin" />;
    return null;
  };

  return (
    <div className="flex flex-col items-center">
      {/* Mint effect particles - Enhanced with sparkles */}
      {showMintEffect && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-amber-400 rounded-full animate-ping"
              style={{
                left: `${50 + (Math.random() - 0.5) * 40}%`,
                top: `${50 + (Math.random() - 0.5) * 40}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: '1s',
              }}
            />
          ))}
          {/* Add sparkle stars for extra fun */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute text-amber-300 animate-sparkle"
              style={{
                left: `${50 + (Math.random() - 0.5) * 60}%`,
                top: `${50 + (Math.random() - 0.5) * 60}%`,
                fontSize: `${12 + Math.random() * 8}px`,
                animationDelay: `${Math.random() * 0.8}s`,
              }}
            >
              ⭐
            </div>
          ))}
        </div>
      )}

      <div
        onClick={handleCoinClick}
        className={`mx-auto relative perspective-1000 cursor-pointer transition-transform duration-150 ${
          clickCount > 0 ? 'scale-95' : 'scale-100'
        } hover:scale-105 active:scale-95`}
        style={{
          perspectiveOrigin: 'center center',
          width: `${coinSize}px`,
          height: `${coinSize}px`,
        }}
        onAnimationEnd={() => setClickCount(0)}
      >
        {/* Glow effect - stronger when hovering */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-30 hover:opacity-50 transition-opacity"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 193, 7, 0.3) 0%, rgba(255, 193, 7, 0) 70%)',
          }}
        />

        {/* Loading/Status overlay */}
        {(isPending || isConfirming) && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/30 rounded-full">
            <Loader2 className="w-12 h-12 text-amber-400 animate-spin" />
          </div>
        )}

        {/* Success overlay */}
        {isSuccess && showMintEffect && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-green-500/20 rounded-full animate-pulse">
            <Check className="w-16 h-16 text-green-400" />
          </div>
        )}

        <div
          ref={coinRef}
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {/* 3D Edge segments */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * Math.PI;
            const z = Math.cos(angle) * (coinThickness / 2);
            const brightness = 58 + Math.sin(angle) * 18;

            return (
              <div
                key={`edge-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${coinSize}px`,
                  height: `${coinSize}px`,
                  top: 0,
                  left: 0,
                  transform: `translateZ(${z}px)`,
                  background: `linear-gradient(180deg,
                    hsl(42, 85%, ${brightness + 8}%) 0%,
                    hsl(40, 80%, ${brightness}%) 50%,
                    hsl(38, 75%, ${brightness - 8}%) 100%
                  )`,
                  border: '1px solid rgba(120, 53, 15, 0.15)',
                }}
              />
            );
          })}

          {/* Front face - Elizabeth Holmes */}
          <div
            className="absolute rounded-full overflow-hidden"
            style={{
              width: `${coinSize}px`,
              height: `${coinSize}px`,
              top: 0,
              left: 0,
              backfaceVisibility: 'hidden',
              transform: `translateZ(${coinThickness / 2 + 0.5}px)`,
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(145deg, #fcd34d 0%, #f59e0b 50%, #d97706 100%)',
              boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.3), inset 0 -2px 10px rgba(0,0,0,0.2)',
            }}
          >
            <div
              className="absolute rounded-full"
              style={{
                top: '4px',
                left: '4px',
                right: '4px',
                bottom: '4px',
                transformStyle: 'preserve-3d',
                background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.4), inset 0 -1px 3px rgba(0,0,0,0.2)',
              }}
            >
              <div
                className="absolute rounded-full bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500"
                style={{
                  top: '8px',
                  left: '8px',
                  right: '8px',
                  bottom: '8px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Image container with circular clipping */}
                <div
                  className="absolute rounded-full overflow-hidden border border-amber-700/30"
                  style={{
                    top: '12px',
                    left: '12px',
                    right: '12px',
                    bottom: '12px',
                    transformStyle: 'preserve-3d',
                    clipPath: 'circle(50% at 50% 50%)',
                  }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden" style={{ clipPath: 'circle(50% at 50% 50%)' }}>
                    <Image
                      src="/elizabeth-holmes.jpg"
                      alt="Elizabeth Holmes"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: '50% 25%', transform: 'scale(0.85)', clipPath: 'circle(50% at 50% 50%)' }}
                      priority
                    />
                  </div>
                </div>

                {/* Text elements - positioned outside the clipped container */}
                <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                    <defs>
                      <path id="curve-top-front" d="M 20, 100 A 80,80 0 0,1 180,100" fill="none" />
                    </defs>
                    <text fill="#78350f" fontSize="11" fontWeight="700" letterSpacing="0.1em">
                      <textPath href="#curve-top-front" startOffset="50%" textAnchor="middle">
                        ELIZABETH HOLMES
                      </textPath>
                    </text>
                  </svg>

                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                    <defs>
                      <path id="curve-bottom-front" d="M 180, 100 A 80,80 0 0,1 20,100" fill="none" />
                    </defs>
                    <text fill="#78350f" fontSize="10" fontWeight="700" letterSpacing="0.08em">
                      <textPath href="#curve-bottom-front" startOffset="50%" textAnchor="middle">
                        ★ BRING HER HOME ★
                      </textPath>
                    </text>
                  </svg>
                </div>

                <div
                  className="absolute inset-0 rounded-full pointer-events-none animate-shimmer"
                  style={{
                    background: 'linear-gradient(130deg, rgba(255,255,255,0.5) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.1) 100%)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Back face - HOLMES branding */}
          <div
            className="absolute rounded-full overflow-hidden"
            style={{
              width: `${coinSize}px`,
              height: `${coinSize}px`,
              top: 0,
              left: 0,
              backfaceVisibility: 'hidden',
              transform: `rotateY(180deg) translateZ(${coinThickness / 2 + 0.5}px)`,
              background: 'linear-gradient(145deg, #fcd34d 0%, #f59e0b 50%, #d97706 100%)',
              boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.3), inset 0 -2px 10px rgba(0,0,0,0.2)',
            }}
          >
            <div
              className="absolute rounded-full"
              style={{
                top: '4px',
                left: '4px',
                right: '4px',
                bottom: '4px',
                background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.4), inset 0 -1px 3px rgba(0,0,0,0.2)',
              }}
            >
              <div
                className="absolute rounded-full bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-400 overflow-hidden flex items-center justify-center"
                style={{
                  top: '8px',
                  left: '8px',
                  right: '8px',
                  bottom: '8px',
                }}
              >
                <div className="text-center z-10 relative">
                  <div
                    className="text-3xl font-black text-amber-900"
                    style={{
                      textShadow: '0 1px 0 rgba(255,255,255,0.4), 0 -1px 0 rgba(0,0,0,0.1)',
                      fontFamily: 'Georgia, serif',
                      letterSpacing: '0.05em',
                    }}
                  >
                    HOLMES
                  </div>
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-800/50 to-transparent mx-auto my-1.5" />
                  <div
                    className="text-sm font-bold text-amber-800"
                    style={{ textShadow: '0 1px 0 rgba(255,255,255,0.3)' }}
                  >
                    FREE MINT
                  </div>
                  <div className="text-[10px] text-amber-700 mt-0.5 font-semibold">
                    1,000 TOKENS
                  </div>
                </div>

                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200">
                  <defs>
                    <path id="curve-top-back" d="M 20, 100 A 80,80 0 0,1 180,100" fill="none" />
                  </defs>
                  <text fill="#78350f" fontSize="10" fontWeight="700" letterSpacing="0.1em">
                    <textPath href="#curve-top-back" startOffset="50%" textAnchor="middle">
                      REDEMPTION TOKEN
                    </textPath>
                  </text>
                </svg>

                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200">
                  <defs>
                    <path id="curve-bottom-back" d="M 180, 100 A 80,80 0 0,1 20,100" fill="none" />
                  </defs>
                  <text fill="#78350f" fontSize="10" fontWeight="700" letterSpacing="0.08em">
                    <textPath href="#curve-bottom-back" startOffset="50%" textAnchor="middle">
                      ★ BASE CHAIN 2025 ★
                    </textPath>
                  </text>
                </svg>

                <div
                  className="absolute inset-0 rounded-full pointer-events-none animate-shimmer"
                  style={{
                    background: 'linear-gradient(130deg, rgba(255,255,255,0.5) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.1) 100%)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status text below coin - HIDDEN to simplify layout */}
      {/* <div className="mt-6 text-center">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
          hasMinted || isSuccess
            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
            : isPending || isConfirming
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
        }`}>
          {getStatusIcon()}
          {getStatusText()}
        </div>
      </div> */}

      {/* Photo credit - HIDDEN to simplify layout */}
      {/* <p className="text-xs text-muted-foreground/50 mt-4">
        Photo: Max Morse/TechCrunch (CC BY 2.0)
      </p> */}
    </div>
  );
}
