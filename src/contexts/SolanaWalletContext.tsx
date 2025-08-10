import React, { createContext, useContext, useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

require('@solana/wallet-adapter-react-ui/styles.css');

const SolanaWalletContext = createContext(null);

export const useSolanaWallet = () => useContext(SolanaWalletContext);

export const SolanaWalletProvider = ({ children }: any) => {
  // Use devnet for local development
  const endpoint = useMemo(() => clusterApiUrl('mainnet-beta'), []);
  // No need to add PhantomWalletAdapter; Wallet Standard will auto-detect
  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <SolanaWalletInnerProvider>{children}</SolanaWalletInnerProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const SolanaWalletInnerProvider = ({ children } : any) => {
  const { publicKey, connected, connect, disconnect, connecting, select } = useWallet();

  return (
    <SolanaWalletContext.Provider
      value={{
        publicKey,
        connected,
        connect,
        disconnect,
        connecting,
        select,
      } as any } 
    >
      {children}
    </SolanaWalletContext.Provider>
  );
}; 