'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Feather, Wallet, Loader2 } from 'lucide-react';
import { useAccount, useConnect, useDisconnect, useWriteContract, useReadContract, useWaitForTransactionReceipt, useSwitchChain } from 'wagmi';
import { base } from 'wagmi/chains';
import { HOLMES_ADDRESS, HOLMES_ABI } from '@/lib/wagmi';

const BANNER_DISMISSED_KEY = 'holmes-banner-dismissed';
const BANNER_HEIGHT = 44;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);

  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending: isConnectPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitchPending } = useSwitchChain();

  const isWrongNetwork = isConnected && chainId !== base.id;

  // Check if user has already minted
  const { data: hasMinted } = useReadContract({
    address: HOLMES_ADDRESS,
    abi: HOLMES_ABI,
    functionName: 'hasMinted',
    args: address ? [address] : undefined,
  });

  // Write contract for minting
  const { writeContract, data: hash, isPending: isMintPending } = useWriteContract();

  // Wait for transaction
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    setMounted(true);
    // Check if banner is visible (not dismissed)
    const wasDismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
    setBannerVisible(wasDismissed !== 'true');

    // Listen for storage changes (in case banner is dismissed)
    const handleStorage = () => {
      const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
      setBannerVisible(dismissed !== 'true');
    };
    window.addEventListener('storage', handleStorage);

    // Also poll for changes since storage event doesn't fire in same tab
    const interval = setInterval(() => {
      const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
      setBannerVisible(dismissed !== 'true');
    }, 100);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWalletAction = () => {
    if (!isConnected) {
      connect({ connector: connectors[0] });
    } else if (isWrongNetwork) {
      switchChain({ chainId: base.id });
    } else if (!hasMinted && !isMintPending && !isConfirming) {
      writeContract({
        address: HOLMES_ADDRESS,
        abi: HOLMES_ABI,
        functionName: 'freeMint',
      });
    }
  };

  const getButtonContent = () => {
    if (!mounted) return { text: 'Connect', icon: <Wallet className="w-4 h-4 mr-2" /> };
    if (isConnectPending) return { text: 'Connecting...', icon: <Loader2 className="w-4 h-4 mr-2 animate-spin" /> };
    if (!isConnected) return { text: 'Connect Wallet', icon: <Wallet className="w-4 h-4 mr-2" /> };
    if (isWrongNetwork) return { text: 'Switch to Base', icon: <Wallet className="w-4 h-4 mr-2" /> };
    if (isSwitchPending) return { text: 'Switching...', icon: <Loader2 className="w-4 h-4 mr-2 animate-spin" /> };
    if (isMintPending || isConfirming) return { text: 'Minting...', icon: <Loader2 className="w-4 h-4 mr-2 animate-spin" /> };
    if (hasMinted) return { text: `${address?.slice(0, 6)}...${address?.slice(-4)}`, icon: null };
    return { text: 'Free Mint', icon: <Feather className="w-4 h-4 mr-2" /> };
  };

  const buttonContent = getButtonContent();

  const navLinks = [
    { href: '#about', label: 'Story' },
    { href: '#gallery', label: 'Timeline' },
    { href: '#tokenomics', label: 'Token' },
    { href: '#how-to-mint', label: 'Mint' },
    { href: '#press', label: 'Press' },
    { href: '#faq', label: 'FAQ' },
  ];

  const navTop = mounted && bannerVisible ? BANNER_HEIGHT : 0;
  
  // Live mint counter - syncs with banner
  const [mintCount, setMintCount] = useState(0);
  const [isLoadingCount, setIsLoadingCount] = useState(true);
  
  // Fetch mint count to keep navbar in sync with banner
  useEffect(() => {
    const fetchMintCount = async () => {
      try {
        const { fetchMinterCount } = await import('@/lib/api');
        const count = await fetchMinterCount();
        setMintCount(count);
        setIsLoadingCount(false);
      } catch (error) {
        console.error('Error fetching mint count for navbar:', error);
        setIsLoadingCount(false);
      }
    };
    
    fetchMintCount();
    
    // Poll every 15 seconds to stay in sync
    const interval = setInterval(fetchMintCount, 15000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav
        style={{ top: navTop }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Animated to match banner style */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl font-black gradient-text animate-shimmer-text bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 bg-[length:200%_100%] bg-clip-text text-transparent">
                HOLMES
              </span>
              {/* FOMO Counter - Live sync with blockchain */}
              <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30 animate-pulse">
                🔥 {isLoadingCount ? 'Loading...' : `${mintCount.toLocaleString()} Minted`}
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm"
                >
                  {link.label}
                </Link>
              ))}
              <Button
                onClick={handleWalletAction}
                className="bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 border-0"
              >
                {buttonContent.icon}
                {buttonContent.text}
              </Button>
            </div>

            {/* Mobile: Always visible mint button + Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <Button
                onClick={handleWalletAction}
                size="sm"
                className="bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 border-0"
              >
                {buttonContent.icon}
                <span className="hidden xs:inline">{buttonContent.text}</span>
                <span className="xs:hidden">{hasMinted ? buttonContent.text.slice(0, 6) : 'Mint'}</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-card border-l border-border transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-24 pb-8 px-6">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted-foreground hover:text-foreground hover:bg-accent transition-all font-medium text-lg py-3 px-4 rounded-lg"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto pt-6 border-t border-border">
              <Button
                onClick={() => {
                  handleWalletAction();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 border-0 h-12"
              >
                {buttonContent.icon}
                {buttonContent.text}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
