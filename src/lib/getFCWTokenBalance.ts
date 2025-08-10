import { Connection, PublicKey } from '@solana/web3.js';

export async function getMainnetTokenBalance(walletAddress: string, mintAddress: string) {
  // Connect to mainnet RPC to fetch the real token balance
  const mainnetConnection = new Connection('https://rpc.helius.xyz/?api-key=d01dcc03-73ca-409f-af9e-781fad7e5af0');

  const walletPubkey = new PublicKey(walletAddress);
  const mintPubkey = new PublicKey(mintAddress);

  const tokenAccounts = await mainnetConnection.getParsedTokenAccountsByOwner(walletPubkey, { mint: mintPubkey });

  if (tokenAccounts.value.length === 0) {
    console.log('No token accounts found on mainnet for this mint');
    return 0;
  }

  let totalBalance = 0;
  for (const tokenAccount of tokenAccounts.value) {
    totalBalance += tokenAccount.account.data.parsed.info.tokenAmount.uiAmount;
  }

  console.log(`Mainnet token balance: ${totalBalance}`);

  return totalBalance;
}
