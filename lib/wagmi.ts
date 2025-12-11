import { http, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'
import { injected, coinbaseWallet } from 'wagmi/connectors'

export const config = createConfig({
  chains: [base],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'HOLMES' }),
  ],
  transports: {
    [base.id]: http(),
  },
})

// HOLMES Token Contract
export const HOLMES_ADDRESS = '0xA7de8462a852eBA2C9b4A3464C8fC577cb7090b8' as const

// Uniswap Pool
export const POOL_ADDRESS = '0xcA6C4C0743C9ed9425FF94f7BC3297C3AAFB44B8' as const

// WETH on Base
export const WETH_ADDRESS = '0x4200000000000000000000000000000000000006' as const

// Trading Links
export const TRADING_LINKS = {
  uniswap: `https://app.uniswap.org/swap?outputCurrency=${HOLMES_ADDRESS}&chain=base`,
  dexscreener: `https://dexscreener.com/base/${POOL_ADDRESS}`,
  dextools: `https://www.dextools.io/app/en/base/pair-explorer/${POOL_ADDRESS}`,
  basescan: `https://basescan.org/token/${HOLMES_ADDRESS}`,
  pool: `https://basescan.org/address/${POOL_ADDRESS}`,
} as const

// HOLMES Token ABI (just the functions we need)
export const HOLMES_ABI = [
  {
    inputs: [],
    name: 'freeMint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'hasMinted',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const
