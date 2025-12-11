'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function SpinningCoin() {
  const coinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const coin = coinRef.current;
    if (!coin) return;

    let rotation = 0;
    let animationId: number;
    let lastUpdateTime = performance.now();
    let isDragging = false;
    let startX = 0;
    let startRotation = 0;

    // Mouse/touch interaction for manual spinning
    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      startX = clientX;
      startRotation = rotation;
      coin.style.cursor = 'grabbing';
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const deltaX = clientX - startX;
      rotation = startRotation + deltaX * 0.5; // More responsive rotation
      coin.style.transform = `rotateY(${rotation}deg)`;
    };

    const handleMouseUp = () => {
      isDragging = false;
      coin.style.cursor = 'grab';
    };

    // Add event listeners
    coin.addEventListener('mousedown', handleMouseDown);
    coin.addEventListener('touchstart', handleMouseDown, { passive: false });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove, { passive: false });
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);

    const animate = () => {
      const now = performance.now();
      const deltaTime = now - lastUpdateTime;
      lastUpdateTime = now;
      
      // Only auto-rotate if not being dragged
      if (!isDragging) {
        // Smooth rotation based on time for consistent speed
        rotation += 0.5 * (deltaTime / 16.67); // 60fps normalization
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

  return (
    <div
      className="mx-auto relative perspective-1000"
      style={{
        perspectiveOrigin: 'center center',
        width: `${coinSize}px`,
        height: `${coinSize}px`,
      }}
    >
      {/* Simplified glow effect - subtle and clean */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 193, 7, 0.15) 0%, rgba(255, 193, 7, 0) 70%)',
        }}
      />
      
      <div
        ref={coinRef}
        className="relative w-full h-full cursor-grab active:cursor-grabbing"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform', // Performance optimization
        }}
      >
        {/* 3D Edge segments - smooth coin edge */}
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
          {/* Raised rim */}
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
            {/* Inner field */}
            <div
              className="absolute rounded-full bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 overflow-hidden"
              style={{
                top: '8px',
                left: '8px',
                right: '8px',
                bottom: '8px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Portrait circle - using explicit dimensions with 3D clipping */}
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

              {/* Top curved text */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 200 200"
              >
                <defs>
                  <path
                    id="curve-top-front"
                    d="M 20, 100 A 80,80 0 0,1 180,100"
                    fill="none"
                  />
                </defs>
                <text fill="#78350f" fontSize="11" fontWeight="700" letterSpacing="0.1em">
                  <textPath href="#curve-top-front" startOffset="50%" textAnchor="middle">
                    ELIZABETH HOLMES
                  </textPath>
                </text>
              </svg>

              {/* Bottom curved text */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 200 200"
              >
                <defs>
                  <path
                    id="curve-bottom-front"
                    d="M 180, 100 A 80,80 0 0,1 20,100"
                    fill="none"
                  />
                </defs>
                <text fill="#78350f" fontSize="10" fontWeight="700" letterSpacing="0.08em">
                  <textPath href="#curve-bottom-front" startOffset="50%" textAnchor="middle">
                    ★ A SECOND CHANCE ★
                  </textPath>
                </text>
              </svg>

              {/* Enhanced shine effect with animation */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none animate-shimmer"
                style={{
                  background: 'linear-gradient(130deg, rgba(255,255,255,0.5) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.1) 100%)',
                  animationDuration: '4s',
                  animationTimingFunction: 'ease-in-out',
                }}
              />
              
              {/* Additional glow */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 20px rgba(255, 193, 7, 0.2)',
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
          {/* Raised rim */}
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
            {/* Inner field */}
            <div
              className="absolute rounded-full bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-400 overflow-hidden flex items-center justify-center"
              style={{
                top: '8px',
                left: '8px',
                right: '8px',
                bottom: '8px',
              }}
            >
              {/* Center content */}
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

              {/* Top curved text */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 200 200"
              >
                <defs>
                  <path
                    id="curve-top-back"
                    d="M 20, 100 A 80,80 0 0,1 180,100"
                    fill="none"
                  />
                </defs>
                <text fill="#78350f" fontSize="10" fontWeight="700" letterSpacing="0.1em">
                  <textPath href="#curve-top-back" startOffset="50%" textAnchor="middle">
                    REDEMPTION TOKEN
                  </textPath>
                </text>
              </svg>

              {/* Bottom curved text */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 200 200"
              >
                <defs>
                  <path
                    id="curve-bottom-back"
                    d="M 180, 100 A 80,80 0 0,1 20,100"
                    fill="none"
                  />
                </defs>
                <text fill="#78350f" fontSize="10" fontWeight="700" letterSpacing="0.08em">
                  <textPath href="#curve-bottom-back" startOffset="50%" textAnchor="middle">
                    ★ BASE CHAIN 2025 ★
                  </textPath>
                </text>
              </svg>

              {/* Enhanced shine effect with animation */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none animate-shimmer"
                style={{
                  background: 'linear-gradient(130deg, rgba(255,255,255,0.5) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.1) 100%)',
                  animationDuration: '4s',
                  animationTimingFunction: 'ease-in-out',
                }}
              />
              
              {/* Additional glow */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 20px rgba(255, 193, 7, 0.2)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
