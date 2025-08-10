import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WhitelistContextType {
  isWhitelisted: boolean;
  checkWhitelist: (address: string) => Promise<boolean>;
  setConnectedWallet: (address: string | null) => void;
}

const WhitelistContext = createContext<WhitelistContextType | undefined>(undefined);

// Legacy function for backward compatibility (can be removed later)
const getWhitelistedAddresses = (): string[] => {
  if (typeof window === 'undefined') return [];
  
  const whitelist = process.env.NEXT_PUBLIC_WHITELIST_ADDRESSES;
  if (!whitelist) return [];
  
  return whitelist.split(',').map(addr => addr.trim().toLowerCase());
};

export const WhitelistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isWhitelisted, setIsWhitelisted] = useState(false);

  const checkWhitelist = async (address: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/whitelist/check?wallet=${encodeURIComponent(address)}`);
      const data = await response.json();
      return data.isWhitelisted || false;
    } catch (error) {
      console.error('Error checking whitelist:', error);
      // Fallback to legacy check if API fails
      const legacyWhitelist = getWhitelistedAddresses();
      return legacyWhitelist.includes(address.toLowerCase());
    }
  };

  const setConnectedWallet = async (address: string | null) => {
    if (address) {
      const whitelisted = await checkWhitelist(address);
      setIsWhitelisted(whitelisted);
    } else {
      setIsWhitelisted(false);
    }
  };

  const value: WhitelistContextType = {
    isWhitelisted,
    checkWhitelist,
    setConnectedWallet,
  };

  return (
    <WhitelistContext.Provider value={value}>
      {children}
    </WhitelistContext.Provider>
  );
};

export const useWhitelist = (): WhitelistContextType => {
  const context = useContext(WhitelistContext);
  if (context === undefined) {
    throw new Error('useWhitelist must be used within a WhitelistProvider');
  }
  return context;
}; 