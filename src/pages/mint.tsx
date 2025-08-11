import { min } from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Countdown from "../components/Countdown";
import { motion } from "framer-motion";
import { ScaleLoader } from "react-spinners";
import { ethers } from "ethers";
import MINTCONTRACT_ABI from "../../public/abis/MINTCONTACT_ABI.json";
import GFLRTOKENCONTRACT_ABI from "../../public/abis/GFLRTOKENCONTRACT_ABI.json";
import {
  MINTCONTRACT_ADDR,
  PUBLICMINTPRICE,
  TOKENCONTRACT_ADDR,
  WHITELISTMINTPRICE,
  CANDY_MACHINE_ID,
} from "../config";
import { useWeb3React } from "@web3-react/core";
import { useWhitelist } from "../contexts/WhitelistContext";
import { errorAlert, infoAlert, successAlert } from "../components/toastGroup";
import { WindowWithEthereum } from "../types";
import { useRouter } from "next/router";
import { get_WL_state } from "../lib/get_WL_state";
import { set_WL_state } from "../lib/set_WL_state";
import { useWallet } from "@solana/wallet-adapter-react";
import { mintNFT } from "../lib/mint";
import { getMainnetTokenBalance } from "../lib/getFCWTokenBalance";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { fetchCandyMachine, mplCandyMachine as mplCoreCandyMachine } from "@metaplex-foundation/mpl-core-candy-machine";
import { publicKey as umiPublicKey } from "@metaplex-foundation/umi";
import { clusterApiUrl } from "@solana/web3.js";


export default function Mint() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 300,
    fade: true,
  };

  const umi = createUmi('https://mainnet.helius-rpc.com/?api-key=ef50d5d8-cc07-48a6-8ed2-5c1e312a56ee').use(mplCoreCandyMachine());
  // const umi = createUmi('https://api.devnet.solana.com').use(mplCoreCandyMachine());
  // const umi = createUmi('https://devnet.helius-rpc.com/?api-key=ef50d5d8-cc07-48a6-8ed2-5c1e312a56ee').use(mplCoreCandyMachine());
  
  
  // const candyMachineID = umiPublicKey('8DWfWUwuRuiNvCB9reHZeDwN1iaQnVXJYdy5F8VnKojj');
  // const candyMachineID = umiPublicKey('HpMvbfNFk4uf9L2Aec9Y7vyEDMSTve7aQ3qNMwPbtThu');
  const candyMachineID = umiPublicKey('FTq6eb3eVsndPrumVbdysDbxJ5Wm4KPW7S7HiwidbhAo');
console.log(candyMachineID, "candyMachineID")


  const { publicKey, connected, wallet } = useWallet();
  console.log(publicKey, connected)
  const { account } = useWeb3React();
  const { isWhitelisted, setConnectedWallet } = useWhitelist();
  const router = useRouter();
  const [mintCount, setMintCount] = useState<number>(1);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [whiteListCounts, setWhiteListCounts] = useState<number>(0);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [whtieListMintState, setWhiteListMintState] = useState<boolean>(false);
  const [endWhiteListState, setEndWhiteListState] = useState<boolean>(false);
  const [maxMintCount, setMaxMintCount] = useState(5);
  const [stats, setStats] = useState<{ totalAvailableSupply: number, minted: number, remaining: number } | null>(null)
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);
  const provider =
    typeof window !== "undefined" && (window as WindowWithEthereum).ethereum
      ? new ethers.providers.Web3Provider(
        (window as WindowWithEthereum).ethereum
      )
      : null;
  const Signer = provider?.getSigner();

  const MINTCONTRACT = new ethers.Contract(
    MINTCONTRACT_ADDR,
    MINTCONTRACT_ABI,
    Signer
  );

  const handleMintFunc = async () => {
    // Check if wallet is connected
    if (!connected || !publicKey) {
      errorAlert("Please connect your wallet first!");
      return;
    }

    // Set loading state
    setLoadingState(true);
    console.log(wallet, "wallet")
    try {
      const walletAddress = publicKey.toBase58();
      const mintAddress = "2UWTpLPx5gPbREtRB7vYJFj9ruWrBJrNx7zrugDD3QVL"; // FCW token mint
      console.log("💕💕💕", walletAddress);
      
      const balance = await getMainnetTokenBalance(walletAddress, mintAddress);
      // const balance = 2000000;
      console.log("FCW token balance:", balance);
      const WL_state = await get_WL_state(walletAddress);
      console.log(WL_state);
      
      let mintResult;
      // mintResult = await mintNFT("wl500k", wallet);
      // console.log("👍👍👍", mintResult);
      // return;
      // const dev = 1;
       if (balance >= 500000) {
        if (WL_state == 1) {  
          infoAlert("Transaction will cost 0 SOL (Free mint)");          // cost is free only once to mint - 500K WL
          mintResult = await mintNFT("wl500K", wallet);
          if (mintResult == "ok") {
            let updateResult = await set_WL_state(walletAddress);
            console.log(updateResult, "updateResult");
            successAlert("Mint Successful! 🎉");
            // Start polling for mint data update
            if (stats) {
              startPollingForMintUpdate(stats.minted, stats.remaining);
            }
          } else if (mintResult == "NotEnoughSOL") {
            errorAlert("Not enough SOL to pay for mint.");
          } else {
            errorAlert("Mint failed. Please try again.");
          }
        }
        else if (balance >= 1000000) {                                    // cost is 0.25 SOL to mint - 1M
          infoAlert("Transaction will cost 0.25 SOL");
          mintResult = await mintNFT("1m", wallet);
          if (mintResult == "ok") {
            successAlert("Mint Successful! 🎉");
            // Start polling for mint data update
            if (stats) {
              startPollingForMintUpdate(stats.minted, stats.remaining);
            }
          } else if (mintResult == "NotEnoughSOL") {
            errorAlert("Not enough SOL to pay for mint");
          } else {
            errorAlert("Mint failed. Please try again.");
          }
        }
        else if (WL_state != 0) {                                          // cost is 0.5 SOL to mint - wl
          infoAlert("Transaction will cost 0.5 SOL");
          mintResult = await mintNFT("wl", wallet);
          if (mintResult == "ok") {
            successAlert("Mint Successful! 🎉");
            // Start polling for mint data update
            if (stats) {
              startPollingForMintUpdate(stats.minted, stats.remaining);
            }
          } else if (mintResult == "NotEnoughSOL") {
            errorAlert("Not enough SOL to pay for mint.");

          } else {
            errorAlert("Mint failed. Please try again.");
          }
        }
      } else if (balance >= 100000) { 
        if (WL_state != 0) {                                                 // cost is 0.5 SOL to mint - wl
          infoAlert("Transaction will cost 0.5 SOL");
          mintResult = await mintNFT("wl", wallet);
          if (mintResult == "ok") {
            successAlert("Mint Successful! 🎉");
            // Start polling for mint data update
            if (stats) {
              startPollingForMintUpdate(stats.minted, stats.remaining);
            }
          } else if (mintResult == "NotEnoughSOL") {
            errorAlert("Not enough SOL to pay for mint.");

          } else {
            errorAlert("Mint failed. Please try again.");
          }
        } else {                                                              // cost is 0.65 SOL to mint - 100k
          infoAlert("Transaction will cost 0.65 SOL");
          mintResult = await mintNFT("100k", wallet);
          if (mintResult == "ok") {
            successAlert("Mint Successful! 🎉");
            // Start polling for mint data update
            if (stats) {
              startPollingForMintUpdate(stats.minted, stats.remaining);
            }
          } else if (mintResult == "NotEnoughSOL") {
            errorAlert("Not enough SOL to pay for mint.");

          } else {
            errorAlert("Mint failed. Please try again.");
          }
        }
      } else {
        if (WL_state != 0) {                                                  // cost is 0.5 SOL to mint - wl
          infoAlert("Transaction will cost 0.5 SOL");
          mintResult = await mintNFT("wl", wallet);
          if (mintResult == "ok") {
            successAlert("Mint Successful! 🎉");
            // Start polling for mint data update
            if (stats) {
              startPollingForMintUpdate(stats.minted, stats.remaining);
            }
          } else if (mintResult == "NotEnoughSOL") {
            errorAlert("Not enough SOL to pay for mint.");

          } else {
            errorAlert("Mint failed. Please try again.");
          }
        } else {                                                              // cost is 1 SOL to mint - base
          infoAlert("Transaction will cost 1 SOL");
          mintResult = await mintNFT("base", wallet);
          if (mintResult == "ok") {
            successAlert("Mint Successful! 🎉");
            // Start polling for mint data update
            if (stats) {
              startPollingForMintUpdate(stats.minted, stats.remaining);
            }
          } else if (mintResult == "NotEnoughSOL") {
            errorAlert("Not enough SOL to pay for mint.");
          } else {
            errorAlert("Mint failed. Please try again.");
          }
        }
      }
      console.log("👍👍👍", mintResult);
    } catch (error) {
      console.error("Mint error:", error);
      errorAlert("Mint failed. Please try again.");
    } finally {
      setLoadingState(false);
    }
  };

  const getMintData = async () => {
    const candyMachine = await fetchCandyMachine(umi, candyMachineID);
    console.log('🧠 Candy Machine Raw Data:', candyMachine);
    let itemsMinted: number = Number(candyMachine.itemsRedeemed);
    let totalAvailableSupply: number = Number(candyMachine.itemsLoaded);
    let itemsRemaining: number = totalAvailableSupply - itemsMinted;
    setStats({ totalAvailableSupply: totalAvailableSupply, minted: itemsMinted, remaining: itemsRemaining });
  };

  const startPollingForMintUpdate = (currentMinted: number, currentRemaining: number) => {
    // Clear any existing polling interval
    if (pollingInterval) {
      clearInterval(pollingInterval);
    }

    const interval = setInterval(async () => {
      const candyMachine = await fetchCandyMachine(umi, candyMachineID);
      const newItemsMinted: number = Number(candyMachine.itemsRedeemed);
      const newTotalAvailableSupply: number = Number(candyMachine.itemsLoaded);
      const newItemsRemaining: number = newTotalAvailableSupply - newItemsMinted;
      
      console.log('Polling for mint update:', {
        current: { minted: currentMinted, remaining: currentRemaining },
        new: { minted: newItemsMinted, remaining: newItemsRemaining }
      });

      // Check if the mint data has changed
      if (newItemsMinted !== currentMinted || newItemsRemaining !== currentRemaining) {
        console.log('Mint data updated! Stopping polling.');
        setStats({ totalAvailableSupply: newTotalAvailableSupply, minted: newItemsMinted, remaining: newItemsRemaining });
        clearInterval(interval);
        setPollingInterval(null);
      }
    }, 5000); // Poll every 10 seconds

    setPollingInterval(interval);
  };

  useEffect(() => {
    console.log("🧠 stats Data:", stats);
  }, [stats]);

  useEffect(() => {
    setConnectedWallet(account || null);
  }, [account, setConnectedWallet]);

  useEffect(() => {
    if (account && !isWhitelisted) {
      router.replace("/");
      return;
    }
  }, [account, isWhitelisted, router]);

  useEffect(() => {
    if (account && isWhitelisted) {
      getMintData();
      const interval = setInterval(() => {
        getMintData();
      }, 60); // 1 minute
      return () => clearInterval(interval);
    }
  }, [account, isWhitelisted]);

  // Cleanup polling interval on component unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);
  useEffect(() => {
    const walletAddress = 'YourWalletAddressHere';
    const mintAddress = 'YourTokenMintAddressHere';


    getMintData();
  }, []);
  // Show loading or redirect if not whitelisted
  // if (!account || !isWhitelisted) {
  //   return (
  //     <div></div>
  //     // <div className="min-h-screen flex items-center justify-center bg-black">
  //     //   <div className="text-center text-white">
  //     //     <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
  //     //     <p className="text-lg">You are not whitelisted to access this page.</p>
  //     //     <p className="text-sm mt-2">Redirecting to home...</p>
  //     //   </div>
  //     // </div>
  //   );
  // }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
    >
      <section className="relative flex flex-col w-full">
        <img
          src="/img/home.jpg"
          className="fixed top-0 bottom-0 object-cover w-full h-full -z-10"
        />
        <div className="2xl:px-[300px] xl:px-[200px] lg:px-[100px] md:px-[100px] px-5 mt-[100px] lg:mt-[100px] w-full gap-5 pb-10">
          <Link href={"/"} passHref>
            <div className="w-full my-5 text-right transition-all duration-300 hover:translate-x-2">
              <h1 className="font-bold text-right text-white cursor-pointer">{`<- Back to Home`}</h1>
            </div>
          </Link>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="xl:w-[500px] lg:w-[400px] w-[350px] md:w-[500px] p-2">
              <div className="p-2 border-[1px] border-gray-400 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm">
                <Slider
                  {...settings}
                  className="mx-3 my-2"
                  cssEase="ease-in-out"
                >
                  {nftArray.map((data, index) => (
                    <img
                      src={data.imgurl}
                      key={index}
                      className="object-cover w-full rounded-lg"
                    />
                  ))}
                </Slider>
              </div>
            </div>
            <div>
              <div className="flex flex-col items-center justify-center w-full">
                <Countdown
                  endDateTime={168431040000} // 1684310400000 is the timestamp of start public mint
                  onCanBreed={() => {
                    setEndWhiteListState(true);
                    setMaxMintCount(7);
                  }}
                  totalSupply={totalSupply}
                />
              </div>
              <div className="flex items-center justify-center w-full mt-10">
                <h1 className="text-xl font-normal text-center text-white">
                  The FatCatWens NFTs
                  <br />
                  FatCatWens Minting Cost = 1 SOL
                </h1>
              </div><br/>
              {/* <div className="flex items-center justify-between w-full mt-5">
                <div
                  className={`px-6 py-4 text-xl font-bold text-center text-black transition-all duration-300 rounded-md ${mintCount <= 1
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-400 cursor-pointer "
                    }`}
                  onClick={() =>
                    mintCount <= 1
                      ? setMintCount(1)
                      : setMintCount(mintCount - 1)
                  }
                >
                  {`-`}
                </div>{" "}
                <h1 className="text-xl font-bold text-white">{mintCount}</h1>
                <div
                  className={`px-6 py-4 text-xl font-bold text-center text-black transition-all duration-300 rounded-md ${mintCount >= maxMintCount
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-400 cursor-pointer "
                    }`}
                  onClick={() =>
                    mintCount >= maxMintCount
                      ? setMintCount(maxMintCount)
                      : setMintCount(mintCount + 1)
                  }
                >
                  {`+`}
                </div>
              </div> */}
              <div className="flex items-center justify-center w-full mt-5">
                <h1 className="text-2xl font-bold text-center text-white">
                  {stats ? (
                    <div className="text-white font-bold text-xl space-y-1">
                      <div className="flex">
                        <span className="w-52">Total FCW NFTs</span>
                        <span>: {stats.totalAvailableSupply}</span>
                      </div>
                      <div className="flex">
                        <span className="w-52">Minted</span>
                        <span>:  {stats.minted}</span>
                      </div>
                      <div className="flex">
                        <span className="w-52">Remaining</span>
                        <span>: {stats.remaining}</span>
                      </div>
                    </div>
                  ) : (
                    <p>Loading mint data...</p>
                  )}
                </h1>
              </div>
              {totalSupply !== 999 ? (
                <>
                  <div className="relative">
                    <div
                      className="z-[49] relative w-full px-10 py-4 mt-10 font-bold text-center text-black transition-all duration-300 bg-white rounded-md cursor-pointer lg:w-auto hover:bg-gray-400"
                      onClick={() => handleMintFunc()}
                    >
                      Mint Now
                    </div>
                    {whtieListMintState === true && whiteListCounts >= 50 && (
                      <div className="absolute top-0 bottom-0 left-0 right-0 z-50 bg-gray-500 rounded-md cursor-not-allowed bg-opacity-80"></div>
                    )}{" "}
                  </div>
                  {/* <div className="flex items-center justify-center w-full mt-2">
                    <h1 className="text-sm font-bold text-center text-white">
                      {maxMintCount} Mint per TX allowed
                    </h1>
                  </div> */}
                  {/* <div className="flex items-center justify-center w-full mt-2">
                    <h1 className="text-sm font-bold text-center text-white">
                      240 NFTs during Whitelist
                    </h1>
                  </div> */}
                </>
              ) : (
                <h1 className="text-3xl font-bold text-center text-red-500">
                  Sold Out!
                </h1>
              )}
            </div>
          </div>
        </div>
        <div className="light x1"></div>
        <div className="light x2"></div>
        <div className="light x3"></div>
        <div className="light x4"></div>
        <div className="light x5"></div>
        <div className="light x6"></div>
        <div className="light x7"></div>
        <div className="light x8"></div>
        <div className="light x9"></div>
        {loadingState && (
          <div className="fixed top-0 bottom-0 left-0 right-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80 flex-col text-white">
            <ScaleLoader color="white" />
          </div>
        )}
      </section>
    </motion.section>
  );
}

type NFTIMG = {
  id: number;
  imgurl: string;
};

const nftArray: NFTIMG[] = [
  {
    id: 1,
    imgurl: "/img/nft/v4-slider-img.png",
  },
  {
    id: 9,
    imgurl: "/img/nft/v4-slider-img2.png",
  },
  {
    id: 2,
    imgurl: "/img/nft/v4-slider-img3.png",
  },
  {
    id: 3,
    imgurl: "/img/nft/v4-slider-img4.png",
  },
  {
    id: 4,
    imgurl: "/img/nft/v4-slider-img5.png",
  },
  {
    id: 5,
    imgurl: "/img/nft/v4-slider-img6.png",
  },
  {
    id: 6,
    imgurl: "/img/nft/v4-slider-img7.png",
  },
  {
    id: 7,
    imgurl: "/img/nft/v4-slider-img8.png",
  },
  {
    id: 8,
    imgurl: "/img/nft/v4-slider-img9.png",
  },
  {
    id: 16,
    imgurl: "/img/nft/v4-slider-img10.png",
  },
  {
    id: 10,
    imgurl: "/img/nft/v4-slider-img11.png",
  },
  {
    id: 11,
    imgurl: "/img/nft/v4-slider-img12.png",
  },
  {
    id: 12,
    imgurl: "/img/nft/v4-slider-img13.png",
  },
  {
    id: 13,
    imgurl: "/img/nft/v4-slider-img14.png",
  },
  {
    id: 14,
    imgurl: "/img/nft/v4-slider-img15.png",
  },
  {
    id: 15,
    imgurl: "/img/nft/v4-slider-img16.png",
  },
];
