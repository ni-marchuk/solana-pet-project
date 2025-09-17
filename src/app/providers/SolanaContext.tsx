import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { SolanaSDK, createSolanaSDK, defaultConfig } from '@entities/solana/sdk';
import type { WalletState } from '@entities/solana/sdk';

interface SolanaContextType {
  sdk: SolanaSDK;
  walletState: WalletState;
  isLoading: boolean;
  error: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (network: 'mainnet-beta' | 'testnet' | 'devnet') => void;
}

const SolanaContext = createContext<SolanaContextType | undefined>(undefined);

interface SolanaProviderProps {
  children: ReactNode;
}

export const SolanaProvider: React.FC<SolanaProviderProps> = ({ children }) => {
  const [sdk] = useState(() => createSolanaSDK(defaultConfig));
  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    connecting: false,
    publicKey: null,
    wallet: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe to wallet state changes
    const unsubscribe = sdk.wallet.onStateChange((newState: WalletState) => {
      setWalletState(newState);
      setIsLoading(newState.connecting);
    });

    return unsubscribe;
  }, [sdk]);

  const connectWallet = async () => {
    try {
      setError(null);
      setIsLoading(true);
      await sdk.wallet.connectWallet('demo');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    try {
      setError(null);
      sdk.wallet.disconnectWallet();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disconnect wallet');
    }
  };

  const switchNetwork = (network: 'mainnet-beta' | 'testnet' | 'devnet') => {
    try {
      setError(null);
      sdk.wallet.switchNetwork(network);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to switch network');
    }
  };

  const value: SolanaContextType = {
    sdk,
    walletState,
    isLoading,
    error,
    connectWallet,
    disconnectWallet,
    switchNetwork,
  };

  return <SolanaContext.Provider value={value}>{children}</SolanaContext.Provider>;
};

export const useSolana = (): SolanaContextType => {
  const context = useContext(SolanaContext);
  if (context === undefined) {
    throw new Error('useSolana must be used within a SolanaProvider');
  }
  return context;
};
