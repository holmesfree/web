'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { HOLMES_ADDRESS } from './wagmi';

export function useAddTokenToWallet() {
  const [addedToWallet, setAddedToWallet] = useState(false);

  const addToMetaMask = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      toast.error('Wallet not found', {
        description: 'Please install MetaMask or another Web3 wallet',
      });
      return;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: HOLMES_ADDRESS,
            symbol: 'HOLMES',
            decimals: 18,
            image: 'https://holmes.free/elizabeth-holmes.jpg',
          },
        },
      });
      setAddedToWallet(true);
      toast.success('Token added to wallet!', {
        description: 'HOLMES is now visible in your wallet',
      });
      setTimeout(() => setAddedToWallet(false), 2000);
    } catch (error) {
      console.error('Failed to add token to wallet:', error);
      toast.error('Failed to add token', {
        description: 'Please try again or add manually',
      });
    }
  };

  return { addToMetaMask, addedToWallet };
}

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string, successMessage = 'Copied to clipboard!') => {
    try {
      if (!navigator.clipboard) {
        toast.error('Clipboard not available', {
          description: 'Please copy manually',
        });
        return;
      }
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(successMessage);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error('Failed to copy', {
        description: 'Please try again',
      });
    }
  };

  return { copyToClipboard, copied };
}
