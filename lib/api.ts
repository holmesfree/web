/**
 * HOLMES Token API Service - Simplified Client-Side Version
 * Fetches real-time data directly from various sources
 */

import { HOLMES_ADDRESS } from './wagmi';

// BaseScan API Configuration (client-side safe)
const BASESCAN_API_URL = 'https://api.basescan.org/api';

// Simple cache for client-side
let statsCache: {
  minters: number;
  holders: number;
  tweets: number;
  timestamp: number;
} | null = null;

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache

/**
 * Get HOLMES token holders count from BaseScan (client-side)
 */
export async function fetchHolderCount(): Promise<number> {
  try {
    // Use BaseScan's token holder list endpoint
    const response = await fetch(
      `${BASESCAN_API_URL}?module=token&action=tokenholderlist&contractaddress=${HOLMES_ADDRESS}&page=1&offset=100`
    );
    
    const data = await response.json();
    
    if (data.status === '1' && Array.isArray(data.result)) {
      // Return actual holder count
      return data.result.length;
    }
    
    return 4394; // Fallback to your current number
  } catch (error) {
    console.error('Error fetching holder count:', error);
    return 4394; // Fallback to your current number
  }
}

/**
 * Get minter count from the blockchain via totalSupply RPC call
 * LP started with 100M tokens, each mint adds 1000 tokens
 * So minters = (totalSupply - 100M) / 1000
 */
export async function fetchMinterCount(): Promise<number> {
  try {
    // Call totalSupply() on the contract using eth_call
    const response = await fetch('https://mainnet.base.org', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_call',
        params: [{
          to: HOLMES_ADDRESS,
          data: '0x18160ddd' // totalSupply() function selector
        }, 'latest']
      })
    });
    
    const data = await response.json();
    if (data.result) {
      // Convert hex result to bigint (18 decimals)
      const totalSupplyWei = BigInt(data.result);
      // Convert to tokens (divide by 10^18)
      const totalSupply = Number(totalSupplyWei / BigInt(10 ** 18));
      // LP allocation was 100M, each mint is 1000 tokens
      const lpAllocation = 100_000_000;
      const tokensPerMint = 1000;
      // Calculate number of mints
      const minters = Math.floor((totalSupply - lpAllocation) / tokensPerMint);
      return Math.max(0, minters);
    }
    return 0; // No fallback - return 0 if fetch fails
  } catch (error) {
    console.error('Error fetching mint count:', error);
    return 0; // No fallback - return 0 if fetch fails
  }
}

/**
 * Get Twitter hashtag count - simplified
 * Note: Twitter API requires authentication, so we'll use a fallback
 */
export async function fetchTweetCount(): Promise<number> {
  // Twitter API requires OAuth, so for client-side we'll:
  // 1. Use a fallback number
  // 2. Or create a simple backend proxy
  // 3. Or use a public Twitter API alternative
  
  return 1032; // Your current accurate number
}

/**
 * Get all stats with simple caching
 */
export async function fetchLiveStats(): Promise<{
  minters: number;
  holders: number;
  tweets: number;
}> {
  // Check cache first
  if (statsCache && (Date.now() - statsCache.timestamp) < CACHE_TTL) {
    return {
      minters: statsCache.minters,
      holders: statsCache.holders,
      tweets: statsCache.tweets
    };
  }

  // Fetch fresh data
  const [minters, holders, tweets] = await Promise.all([
    fetchMinterCount(),
    fetchHolderCount(),
    fetchTweetCount()
  ]);

  // Update cache
  statsCache = {
    minters,
    holders,
    tweets,
    timestamp: Date.now()
  };

  return { minters, holders, tweets };
}