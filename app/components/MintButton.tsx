'use client';

import { useState, useEffect } from 'react';
import { useAccount, useConnect, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { Button } from '@/components/ui/button';
import { HOLMES_ADDRESS, HOLMES_ABI } from '@/lib/wagmi';
import { Sparkles, Loader2, Check, Wallet, AlertCircle } from 'lucide-react';
import { formatUnits } from 'viem';

export default function MintButton({ size = 'default' }: { size?: 'default' | 'giant' }) {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    }
  }, [isSuccess, refetchHasMinted, refetchBalance]);

  const handleMint = () => {
    writeContract({
      address: HOLMES_ADDRESS,
      abi: HOLMES_ABI,
      functionName: 'freeMint',
    });
  };

  if (!mounted) {
    return (
      <Button
        size="lg"
        disabled
        className={size === 'giant'
          ? "h-20 px-16 text-2xl font-black bg-gradient-to-r from-amber-600 to-yellow-500 border-0"
          : "h-14 px-10 text-base font-semibold bg-gradient-to-r from-amber-600 to-yellow-500 border-0"
        }
      >
        <Sparkles className={size === 'giant' ? "w-8 h-8 mr-3" : "w-5 h-5 mr-2"} />
        Free Mint HOLMES
      </Button>
    );
  }

  // Not connected
  if (!isConnected) {
    return (
      <Button
        size="lg"
        onClick={() => connect({ connector: connectors[0] })}
        className={size === 'giant'
          ? "h-20 px-16 text-2xl font-black bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 border-0 glow-sm hover:glow-md transition-all"
          : "h-14 px-10 text-base font-semibold bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 border-0 glow-sm hover:glow-md transition-all"
        }
      >
        <Wallet className={size === 'giant' ? "w-8 h-8 mr-3" : "w-5 h-5 mr-2"} />
        Connect Wallet
      </Button>
    );
  }

  // Already minted
  if (hasMinted) {
    const formattedBalance = balance ? formatUnits(balance, 18) : '0';
    return (
      <div className="text-center">
        <Button
          size="lg"
          disabled
          className={size === 'giant'
            ? "h-20 px-16 text-2xl font-black bg-green-600 border-0"
            : "h-14 px-10 text-base font-semibold bg-green-600 border-0"
          }
        >
          <Check className={size === 'giant' ? "w-8 h-8 mr-3" : "w-5 h-5 mr-2"} />
          Already Minted
        </Button>
        <p className="mt-4 text-muted-foreground">
          You have {Number(formattedBalance).toLocaleString()} HOLMES
        </p>
      </div>
    );
  }

  // Transaction pending or confirming
  if (isPending || isConfirming) {
    return (
      <Button
        size="lg"
        disabled
        className={size === 'giant'
          ? "h-20 px-16 text-2xl font-black bg-gradient-to-r from-amber-600 to-yellow-500 border-0"
          : "h-14 px-10 text-base font-semibold bg-gradient-to-r from-amber-600 to-yellow-500 border-0"
        }
      >
        <Loader2 className={`${size === 'giant' ? "w-8 h-8 mr-3" : "w-5 h-5 mr-2"} animate-spin`} />
        {isPending ? 'Confirm in Wallet...' : 'Minting...'}
      </Button>
    );
  }

  // Success
  if (isSuccess) {
    return (
      <div className="text-center">
        <Button
          size="lg"
          disabled
          className={size === 'giant'
            ? "h-20 px-16 text-2xl font-black bg-green-600 border-0"
            : "h-14 px-10 text-base font-semibold bg-green-600 border-0"
          }
        >
          <Check className={size === 'giant' ? "w-8 h-8 mr-3" : "w-5 h-5 mr-2"} />
          Minted Successfully!
        </Button>
        <p className="mt-4 text-muted-foreground">
          You now have 1,000 HOLMES tokens!
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center">
        <Button
          size="lg"
          onClick={handleMint}
          className={size === 'giant'
            ? "h-20 px-16 text-2xl font-black bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 border-0 glow-sm hover:glow-md transition-all"
            : "h-14 px-10 text-base font-semibold bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 border-0 glow-sm hover:glow-md transition-all"
          }
        >
          <Sparkles className={size === 'giant' ? "w-8 h-8 mr-3" : "w-5 h-5 mr-2"} />
          Try Again
        </Button>
        <p className="mt-4 text-red-400 text-sm flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error.message.includes('rejected') ? 'Transaction rejected' : 'Error occurred'}
        </p>
      </div>
    );
  }

  // Ready to mint
  return (
    <Button
      size="lg"
      onClick={handleMint}
      className={size === 'giant'
        ? "h-20 px-16 text-2xl font-black bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 border-0 glow-sm hover:glow-md transition-all animate-pulse"
        : "h-14 px-10 text-base font-semibold bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 border-0 glow-sm hover:glow-md transition-all"
      }
    >
      <Sparkles className={size === 'giant' ? "w-8 h-8 mr-3" : "w-5 h-5 mr-2"} />
      Free Mint 1,000 HOLMES
    </Button>
  );
}
