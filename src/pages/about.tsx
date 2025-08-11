import { Fade } from "react-awesome-reveal";

export default function About() {
  return (
    <section
      id="about"
      className="border-b-[1px] border-gray-800 border-dashed bg-[#141a31] bg-opacity-70 backdrop-blur-sm"
    >
      <div className="2xl:px-[300px] xl:px-[200px] lg:px-[100px] md:px-[100px] px-5 min-h-[80vh] pb-10 pt-10">
        <Fade direction="down">
          <h1 className="text-[50px] md:text-[75px] text-white text-center font-extrabold mt-10 uppercase">
            {" "}
            ABout us
          </h1>
          <p className="text-2xl text-center text-yellow-500 -mt-[70px] font-bold uppercase">
            About us
          </p>
        </Fade>
        <Fade>
          <div className="grid w-full grid-cols-1 gap-10 mt-20 md:grid-cols-2">
            <div className="rounded-lg space-y-6 bg-black/30 p-6 border border-yellow-400 shadow-2xl shadow-yellow-400/50">
              <h1 className="text-3xl font-extrabold text-center text-yellow-400 uppercase">
                What is FatCatWen?
              </h1>

              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                <span className="text-yellow-300 font-bold">$FCW</span> was created as a response to scammy meme coin culture — especially those that look sweet and cute while taking your money. FCW is a cousin of the well-known <span className="text-yellow-300">$WEN</span> cat — but this one bites back.
              </p>

              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                Born out of a passion for DeFi and countless hours adding liquidity on Jupiter and Meteora, FatCatWen is designed to absorb global liquidity and return power to everyday users — just like Bitcoin did in 2009.
              </p>

              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                <span className="font-semibold text-yellow-300">$FCW</span> is core of a Play-to-Earn ecosystem. The first game demo is already live — a 5-player competition where the highest scorer wins a pool of FCW tokens, with 5% going into the Community Pool.
              </p>

              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                FCW has real utility: it serves as the in-game currency, can be staked through liquidity provision (earning fees), and will be used for airdrops and DAO governance.
              </p>

            </div>

            <div className="flex flex-col gap-7 rounded-md">
              {/* The Mint */}
              <div className="flex flex-col gap-4 border border-yellow-400 shadow-2xl shadow-yellow-400/50 p-6 rounded-md bg-black/30">
                <p className="text-3xl font-extrabold text-yellow-400">The Mint</p>
                <p className="text-base text-gray-300 leading-relaxed">
                  Minting is open to everyone — no cap, no gatekeeping.
                  <br />
                  <span className="text-yellow-200 font-medium">Whitelist:</span> 50% discount, no limit.
                  <br />
                  <span className="text-yellow-200 font-medium">FCW Holders:</span> 
                  <ul className="list-disc pl-6 mt-1 text-red-400">
                    <li>Whitelist & 500K+ tokens → Free Mint, Once per wallet</li>
                    <li>100K+ tokens → 35% off</li>
                    <li>1M+ tokens → 75% off</li>
                  </ul>
                </p>
              </div>

              {/* Why Mint a FatCat? */}
              <div className="flex flex-col gap-4 border border-yellow-400 shadow-2xl shadow-yellow-400/50 p-6 rounded-md bg-black/30">
                <p className="text-3xl font-extrabold text-yellow-400">Why Mint a FatCat?</p>
                <p className="text-base text-gray-300 leading-relaxed">
                  By minting and holding one of our <span className="font-bold text-yellow-200">999 unique FatCat NFTs</span>, you're unlocking real utility — not just art.
                </p>
                <ul className="list-disc pl-6 text-red-400 text-base space-y-2">
                  <li>1 billion tokens – zero pre-sale, zero vesting</li>
                  <li>170M tokens in Community Pool – for growth, rewards, and DAO use</li>
                  <li>Staking = add liquidity on DEX + earn trading fees</li>
                  <li>Genesis NFT Collection (999 pcs) – ticket to DAO + Community Pool</li>
                  <li>2 FatCat games – for real income & entertainment</li>
                </ul>
              </div>
            </div>

          </div>
        </Fade>
      </div>
      <div className="absolute top-0 bottom-0 md:min-h-screen lg:min-h-[120vh] xl:min-h-[60vh] min-h-[120vh] area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </section>
  );
}
