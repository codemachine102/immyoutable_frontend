import React from 'react';

import { useMetamaskProvider } from './useMetamaskProvider';
//types
import { CryptoAccoutType } from './types';
import { FetchBalanceResult } from '@wagmi/core';

export interface MetamaskState {
  address?: string;
  isAccountConnected: boolean;
  isAccountConnecting: boolean;
  isAccountReconecting: boolean;
  accountStatus: 'disconnected' | 'connected' | 'reconnecting' | 'connecting';
  balance?: FetchBalanceResult;
  isBalanceError: boolean;
  isBalanceLoading: boolean;
  balanceStatus: 'error' | 'idle' | 'loading' | 'success';
  ensName?: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  disconnectAndDeleteWallet: () => Promise<void>;
  cryptoAccount: CryptoAccoutType | null;
}

export const MetamaskContext = React.createContext<MetamaskState>({
  address: undefined,
  isAccountConnected: false,
  isAccountConnecting: false,
  isAccountReconecting: false,
  accountStatus: 'disconnected',
  balance: undefined,
  isBalanceError: false,
  isBalanceLoading: false,
  balanceStatus: 'idle',
  ensName: undefined,
  connectWallet: async () => {},
  disconnectWallet: async () => {},
  disconnectAndDeleteWallet: async () => {},
  cryptoAccount: null,
});

interface MetamaskProps {
  children: React.ReactNode;
}

export const MetamaskProvider = ({ children }: MetamaskProps) => {
  const metamask = useMetamaskProvider();

  return (
    <MetamaskContext.Provider value={metamask}>
      {children}
    </MetamaskContext.Provider>
  );
};
