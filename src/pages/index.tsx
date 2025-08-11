/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useWeb3React } from "@web3-react/core";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import About from "./about";
import Collection from "./collection";
import RoadMap from "./roadmap";
import Team from "./team";
import { Bounce } from "react-awesome-reveal";
import Link from "next/link";
import { motion } from "framer-motion";
import BlurredContent from "../components/BlurredContent";
import BookWhitelistButton from '../components/BookWhitelistButton';
import BookWhitelistModal from '../components/BookWhitelistModal';
import { successAlert, errorAlert, infoAlert } from '../components/toastGroup';
import { useSolanaWallet } from '../contexts/SolanaWalletContext';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWhitelist } from '../contexts/WhitelistContext';

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

// Solana wallet connection scaffold (UI only)

const Home: NextPage = () => {
  const wallet = useSolanaWallet() as unknown as { connected?: boolean; publicKey?: { toBase58: () => string } };
  const connected = wallet?.connected;
  const publicKey = wallet?.publicKey;
  const [modalOpen, setModalOpen] = useState(false);
  const [hasBooked, setHasBooked] = useState(false);
  const { isWhitelisted, setConnectedWallet } = useWhitelist();

  // Check whitelist status when wallet connects
  useEffect(() => {
    if (connected && publicKey) {
      setConnectedWallet(publicKey.toBase58());
    } else {
      setConnectedWallet(null);
    }
  }, [connected, publicKey, setConnectedWallet]);

  // Book button click handler
  const handleBookClick = () => {
    if (!connected) {
      errorAlert('Connect wallet first');
      return;
    }
    setModalOpen(true);
  };

  // Book modal submit handler
  const handleBook = async (data: { username: string; email: string; walletAddress: string }) => {
    try {
      const response = await fetch('/api/whitelist/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setModalOpen(false);
        setHasBooked(true); // Hide the book button after successful registration
        successAlert(result.message || 'Successfully booked whitelist spot');
        // Refresh whitelist status
        if (publicKey) {
          setConnectedWallet(publicKey.toBase58());
        }
      } else {
        errorAlert(result.error || 'Failed to book whitelist spot');
      }
    } catch (error) {
      console.error('Error booking whitelist:', error);
      errorAlert('Failed to book whitelist spot. Please try again.');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
    >
      <section className="relative flex flex-col w-full" id="#home">
        <img
          src="/img/home.jpg"
          className="fixed top-0 bottom-0 object-cover w-full h-full rounded-lg -z-10"
        />
        <div className="2xl:px-[300px] xl:px-[200px] lg:px-[100px] md:px-[100px] px-5 mt-[100px] lg:mt-[200px] flex lg:flex-row flex-col-reverse w-full gap-5 pb-10">
          <Bounce>
            <div>
              <h1 className="2xl:text-[65px] xl:text-[55px] lg:text-[50px] md:text-[40px] text-[30px] font-extrabold text-white text-center lg:text-left">
                <span className="font-black text-yellow-500">FAT<span className="text-yellow-300 italic">CAT </span>WEN </span>NFTS For EVERYONE
              </h1>
              <p className="text-center text-gray-400 lg:text-left">
                The chonkiest cats on Solana-geared up for glory, games, and gains
              </p>
              <div className="flex flex-col items-center justify-center gap-2 md:justify-start md:flex-row">
                {/* Mint and Claim buttons stay blurred even for whitelisted users */}
                {/* <BlurredContent placeholder="August 1st" forceBlur={false}> */}     {/* MOMO blocked */}
                <Link href="/mint" passHref>
                  <button className="w-full px-10 py-4 mt-5 font-bold text-black transition-all duration-300 bg-white rounded-md lg:w-auto hover:bg-gray-400">
                    Mint
                  </button>
                </Link>
                {/* </BlurredContent> */}
                {/* <BlurredContent placeholder="August 1st" forceBlur={true}>         */}       {/* MOMO blocked */}
                {/* <Link href="/claim" passHref>
                  <button className="w-full px-10 py-4 mt-5 font-bold text-black transition-all duration-300 bg-white rounded-md lg:w-auto hover:bg-gray-400">
                    Claim
                  </button>
                </Link> */}
                {/* </BlurredContent> */}
                <Link href="https://www.fatcatwen.com" passHref>
                  <button className="w-full px-10 py-4 mt-5 font-bold text-black transition-all duration-300 bg-white rounded-md lg:w-auto hover:bg-gray-400">
                    Website
                  </button>
                </Link>
              </div>
            </div>
          </Bounce>
          <div className="flex items-center justify-center w-full lg:justify-end">
            <div className="xl:w-[500px] lg:w-[400px] w-[350px] md:w-[500px] p-2">
              {/* <BlurredContent placeholder="999 FAT CATS" blurIntensity="heavy"> */}
                <div className="p-2 border-[1px] border-yellow-500 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm">
                  <Slider
                    {...settings}
                    className="mx-3 my-2"
                    cssEase="ease-in-out"
                  >
                    {nftArray.map((data, index) => (
                      <img
                        src={data.imgurl}
                        key={index}
                        className="object-cover w-full"
                      />
                    ))}
                  </Slider>
                </div>
              {/* </BlurredContent> */}
            </div>
          </div>
        </div>
      </section >
      <About />
      <Collection />
      <RoadMap />
      <Team />
      {/* Floating Book Whitelist Button - only show if not whitelisted and not booked */}
      {/* {
        !isWhitelisted && !hasBooked && (
          <BookWhitelistButton onClick={handleBookClick} />
        )
      } */}
      {/* Book Whitelist Modal */}
      <BookWhitelistModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onBook={handleBook}
        walletAddress={publicKey ? publicKey.toBase58() : ''}
      />
    </motion.section >
  );
};

export default Home;

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
