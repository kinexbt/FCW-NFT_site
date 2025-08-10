import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { keypairIdentity, publicKey, generateSigner, some, sol, transactionBuilder, none, SolAmount} from '@metaplex-foundation/umi';
import { fetchCandyMachine, fetchCandyGuard, mintV1, mplCandyMachine as mplCoreCandyMachine } from '@metaplex-foundation/mpl-core-candy-machine'; // or appropriate Core Candy Machine minting method
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox';
import secret from './my-wallet';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';

// Setup Umi client connected to cluster
// const umi = createUmi('https://api.devnet.solana.com').use(mplCoreCandyMachine());

// const secretKey = new Uint8Array(secret);
// const keypair = umi.eddsa.createKeypairFromSecretKey(secretKey);

// umi.use(keypairIdentity(keypair))

const candyMachineId = publicKey('qi4TmzYjucP6sdw4hT4yphLWkFH2B6qWHa7wcqvxSxu');
const coreCollectionId = publicKey('AbkEFsQcTwKenoRg7chT6NBhCUqAuSpRub3XjEvw94yL');

// let getMintGroupLabel = "1m";

let mySolPayment = none<{ lamports: SolAmount; destination: ReturnType<typeof publicKey> }>();

    
// Your deployed candy machine address
export async function mintNFT(getMintGroupLabel: any, wallet: any): Promise<string> {
  if (!wallet?.adapter?.publicKey)  {
    console.log("wallet is null");
    return "null";
  }
  // console.log(wallet.adapter.publicKey, "wallet.publicKey")
  const umi = await createUmi('https://api.mainnet-beta.solana.com').use(walletAdapterIdentity(wallet.adapter)).use(mplCoreCandyMachine());
// console.log(umi, "umi") 
  const asset = generateSigner(umi);

  try {
      // const candyMachine = await fetchCandyMachine(umi, candyMachineId);
      // console.log(candyMachine)
      // Step 2: Extract the candyGuard address
      // const candyGuardAddress = await candyMachine.candyGuard;
    // 💡 Fetch Candy Guard Config
    // const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);
    // console.log("🛡️ Candy Guard configuration:", candyGuard);

    if (getMintGroupLabel === "base") {
      mySolPayment = some({
        lamports: sol(1),
        destination: publicKey("GLrje9c1YXEpWFtzkQKLf2rFa9V9jLppFFHeQnAbz2pE"),
      });
    } else if (getMintGroupLabel === "1m") {
      mySolPayment = some({
        lamports: sol(0.25),
        destination: publicKey("GLrje9c1YXEpWFtzkQKLf2rFa9V9jLppFFHeQnAbz2pE"),
      });
    } else if (getMintGroupLabel === "100k") {
      mySolPayment = some({
        lamports: sol(0.65),
        destination: publicKey("GLrje9c1YXEpWFtzkQKLf2rFa9V9jLppFFHeQnAbz2pE"),
      });
    } else if (getMintGroupLabel === "wl") {
      mySolPayment = some({
        lamports: sol(0.5),
        destination: publicKey("GLrje9c1YXEpWFtzkQKLf2rFa9V9jLppFFHeQnAbz2pE"),
      });
    } else if (getMintGroupLabel === "wl500K") {
      mySolPayment = some({
        lamports: sol(0),
        destination: publicKey("GLrje9c1YXEpWFtzkQKLf2rFa9V9jLppFFHeQnAbz2pE"),
      });
    }
    
    console.log("I am here! 😍😍😍");
    
    const response = await transactionBuilder()
      .add(setComputeUnitLimit(umi, { units: 300_000 }))
      .add(
        mintV1(umi, {
          candyMachine: candyMachineId,
          asset,
          collection: coreCollectionId,
          group: some(getMintGroupLabel), // ← dynamic group
          mintArgs: {
            solPayment: mySolPayment,
          },
        })
      )
      .sendAndConfirm(umi);

    console.log("✅ Mint successful:", response.signature);
    return "ok";
  } catch (error: any) {
    console.log(error, "error");
    
    if (error.getLogs) {
      console.error("Simulation logs:\n", error.getLogs());
    }
    
    // Check for specific error types
    const errorMessage = error.message || error.toString();
    if (errorMessage.includes('NotEnoughSOL')) {
      return "NotEnoughSOL";
    }
    
    return "fail";
  }
}

