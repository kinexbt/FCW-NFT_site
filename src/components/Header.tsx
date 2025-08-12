/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useSolanaWallet } from '../contexts/SolanaWalletContext';
import { FaWallet } from "react-icons/fa";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export default function Header() {
  const router = useRouter();
  // const [open, setOpen] = useState(false);

  const { publicKey, connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleConnect = () => {
    setVisible(true);
  };

  return (
    <>
      <header className="w-full h-[80px] flex justify-between 2xl:px-[300px] xl:px-[200px] lg:px-[100px] md:px-[20px] fixed z-[59] py-[14px] items-center px-4 backdrop-blur-lg">
        <Head>
          <link rel="icon" href="/img/Full Color.svg" />
        </Head>
        <Link href={`/`} passHref>
          <div className="cursor-pointer ">
            <img
              src="/img/Full Color.svg"
              className=" object-cover object-center p-1"
              alt="logo"
              width={100}
              height={100}
            />
          </div>
        </Link>
        <div
          className="items-center h-full px-4 py-5 text-white border-[1px] border-yellow-400 rounded-lg text-whitebg-white backdrop-blur-sm bg-opacity-10 bg-white hidden md:flex
      justify-between lg:gap-10 md:gap-3"
        >
          <Link href={`/`} passHref>
            <p className="font-normal text-white transition-all duration-300 cursor-pointer text-md hover:text-yellow-500">
              Home
            </p>
          </Link>
          <Link href="/#about" passHref>
            <p className="font-normal text-white transition-all duration-300 cursor-pointer text-md hover:text-yellow-500">
              About
            </p>
          </Link>
          <Link href="/#collection" passHref>
            <p className="font-normal text-white transition-all duration-300 cursor-pointer text-md hover:text-yellow-500">
              Collection
            </p>
          </Link>
          <Link href="/#roadmap" passHref>
            <p className="font-normal text-white transition-all duration-300 cursor-pointer text-md hover:text-yellow-500">
              RoadMap
            </p>
          </Link>
          <Link href="/#team" passHref>
            <p className="font-normal text-white transition-all duration-300 cursor-pointer text-md hover:text-yellow-500">
              Team
            </p>
          </Link>
        </div>
        <div className="flex items-center">
          {/* Custom Solana Wallet Connect Button with Original UI Style */}
          {connected && publicKey ? (
            <button
              onClick={disconnect}
              className="px-2 py-3 text-white border-[1px] border-yellow-400 rounded-lg backdrop-blur-sm font-normal bg-white bg-opacity-10"
            >
              <span className="flex gap-2 font-normal text">
                <FaWallet style={{ marginTop: "3%" }} />
                {publicKey.toBase58().slice(0, 4) + "..." + publicKey.toBase58().slice(-4)}
              </span>
            </button>
          ) : (
            <button
              onClick={handleConnect}
              className="px-2 py-3 text-white bg-opacity-10 border-[1px] border-yellow-400 rounded-lg backdrop-blur-sm font-normal bg-white"
            >
              <span className="flex gap-2 font-normal text">
                <FaWallet style={{ marginTop: "3%" }} /> Connect wallet
              </span>
            </button>
          )}
        </div>
        <div
          className="p-1 cursor-pointer md:hidden border-[1px] border-yellow-400 hover:border-white duration-300 transition-all rounded-lg"
          onClick={() => setMenuOpen(true)}
        >
          <FiMenu color="white" size={"30px"} />
        </div>
      </header>
      {menuOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-[60] items-center justify-center bg-black opacity-95 md:hidden">
          <div className="flex items-center justify-end w-full px-3 py-4">
            <div
              className="p-1 border-[1px] border-gray-300 hover:border-white duration-300 transition-all rounded-lg
            cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <IoMdClose color="white" size={"32px"} />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col justify-center gap-5 text-center lg:text-left lg:mx-0 lg:pl-4">
              <div className="flex flex-col items-center justify-center gap-10">
                <Link href={"/"} passHref>
                  <li
                    className={`text-lg font-normal ${
                      router.pathname === "/" ? "text-cyan-500" : "text-white"
                    } uppercase list-none transition-all duration-300 cursor-pointer hover:text-cyan-500`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </li>
                </Link>
                <Link href="/#about" passHref>
                  <li
                    className={`text-lg font-normal ${
                      router.pathname === "/createraffle"
                        ? "text-cyan-500"
                        : "text-white"
                    } uppercase list-none transition-all duration-300 cursor-pointer hover:text-cyan-500`}
                    onClick={() => setMenuOpen(false)}
                  >
                    About
                  </li>
                </Link>
                <Link href="/#collection" passHref>
                  <li
                    className={`text-lg font-normal ${
                      router.pathname === "/createraffle"
                        ? "text-cyan-500"
                        : "text-white"
                    } uppercase list-none transition-all duration-300 cursor-pointer hover:text-cyan-500`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Collection
                  </li>
                </Link>
                <a href={"/#roadmap"}>
                  <li
                    className={`text-lg font-normal ${
                      router.pathname === "/createraffle"
                        ? "text-cyan-500"
                        : "text-white"
                    } uppercase list-none transition-all duration-300 cursor-pointer hover:text-cyan-500`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Roadmap
                  </li>
                </a>
                <a href={"/#team"}>
                  <li
                    className={`text-lg font-normal ${
                      router.pathname === "/createraffle"
                        ? "text-cyan-500"
                        : "text-white"
                    } uppercase list-none transition-all duration-300 cursor-pointer hover:text-cyan-500`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Team
                  </li>
                </a>
                <Link href={"/mint"} passHref>
                  <li
                    className={`text-lg font-normal ${
                      router.pathname === "/mint"
                        ? "text-cyan-500"
                        : "text-white"
                    } uppercase list-none transition-all duration-300 cursor-pointer hover:text-cyan-500`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Mint
                  </li>
                </Link>
                <Link href={"/claim"} passHref>
                  <li
                    className={`text-lg font-normal ${
                      router.pathname === "/claim"
                        ? "text-cyan-500"
                        : "text-white"
                    } uppercase list-none transition-all duration-300 cursor-pointer hover:text-cyan-500`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Claim
                  </li>
                </Link>
              </div>
              {connected && publicKey && (
                <span className="ml-2 px-3 py-2 rounded-lg bg-yellow-400 text-black font-semibold text-md">
                  {publicKey.toBase58().slice(0, 4) + '...' + publicKey.toBase58().slice(-4)}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
