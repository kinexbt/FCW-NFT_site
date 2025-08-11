import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Fade } from "react-awesome-reveal";
import BlurredContent from "../components/BlurredContent";

export default function RoadMap() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    autoplaySpeed: 1,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 370,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
        },
      },
    ],
  };
  return (
    <section
      id="roadmap"
      className="border-b-[1px] border-gray-800 border-dashed bg-[#141a31] bg-opacity-70 backdrop-blur-sm pb-10"
    >
      <div className="w-full min-h-[70vh] 2xl:px-[300px] xl:px-[200px] lg:px-[100px] md:px-[100px] px-5 pb-5">
        <Fade direction="down">
          <h1 className="text-[50px] md:text-[75px] text-white text-center font-extrabold py-20 uppercase z-20">
            {" "}
            RoadMap
          </h1>
          <p className="text-2xl text-center text-yellow-500 -mt-[130px] md:-mt-[150px] font-bold uppercase z-10">
            ROADMAP OF COMPANY
          </p>
        </Fade>

        <div className="flex flex-col gap-5 mt-10">
          <h1 className="text-xl text-center text-gray-400 uppercase md:text-3xl">
            Our goal is healthy, organic growth – driven by real utility and a strong, engaged community, not just hype or speculation.
          </h1>
        </div>
        <div className="z-50 mt-10">
          <Slider {...settings} className="z-50">
            <div className="px-3">
              <div className="w-full border-[1px] border-[#FFD700] shadow-2xl shadow-[#22B78F80] flex min-h-[30vh] lg:flex-row flex-col rounded-md">
                <div className="border-r-[1px] border-[#FFD700]">
                  <h1 className="flex items-center justify-center h-full p-3 text-3xl font-bold text-white lg:justify-start lg:-rotate-90 lg:transform">
                    Idea
                  </h1>
                </div>
                <div className="flex items-center justify-center">
                  {/* <BlurredContent placeholder="FAT CAT" blurIntensity="heavy"> */}
                    <img
                      src={`/img/nft/v4-slider-img2.png`}
                      className="w-[300px]"
                      alt="nftCollectionSlider"
                    />
                  {/* </BlurredContent> */}
                </div>
                <div className="flex flex-col items-start justify-start h-full gap-5 p-10">
                  <h3 className="text-white text-[30px] font-bold">
                    Concept development & Team building:
                  </h3>
                  <h4 className="text-[#FFD700]">Q6 2025</h4>
                  <p className="text-lg text-gray-400">
                    - 1 billion tokens – zero pre-sale, zero vesting
                  </p>
                  <p className="text-lg text-gray-400">
                    - Analyze successful NFT projects for inspiration and best practices.
                  </p>
                  <p className="text-lg text-gray-400">
                    - Staking = adding liquidity on DEX and earning fees from trading volume
                  </p>
                  <p className="text-lg text-gray-400">
                    - Genesis NFT Collection (999 pieces) – ticket to DAO + access to Community
                  </p>
                </div>
              </div>
            </div>
            <div className="px-3">
              <div className="w-full border-[1px] border-[#FFD700] shadow-2xl shadow-[#22B78F80] flex min-h-[30vh] lg:flex-row flex-col">
                <div className="border-r-[1px] border-[#FFD700]">
                  <h1 className="flex items-center justify-center h-full p-3 text-3xl font-bold text-white lg:justify-start lg:-rotate-90 lg:transform">
                    Design
                  </h1>
                </div>
                <div className="flex items-center justify-center p-5">
                  <BlurredContent placeholder="FAT CAT" blurIntensity="heavy">
                      <img
                        src={`/img/nft/v4-slider-img3.png`}
                        className="w-[300px]"
                        alt="nftCollectionSlider"
                      />
                    </BlurredContent>
                </div>
                <div className="flex flex-col items-start justify-start h-full gap-5 p-10">
                  <h3 className="text-white md:text-[30px] text-[20px] font-bold">
                    FatCat Games
                  </h3>
                  <h4 className="text-[#FFD700]">Q7 2025</h4>
                  <p className="text-lg text-gray-400">
                    -  Game 1 (demo live): 5 players enter, winner takes the FCW pot, 5% goes to Community Pool

                  </p>
                  <p className="text-lg text-gray-400">
                    -  Game 2 (coming soon): FatCat flies to the Moon – win FCW each round
                  </p>
                  <p className="text-lg text-gray-400">
                    - FCW = in-game currency, used for staking, governance, airdrops & rewards

                  </p>
                  <p className="text-lg text-gray-400">
                    - No VC bullshit – built by the people, for the people
                  </p>
                </div>
              </div>
            </div>
            <div className="px-3">
              <div className="w-full border-[1px] border-[#FFD700] shadow-2xl shadow-[#22B78F80] flex min-h-[30vh] lg:flex-row flex-col">
                <div className="border-r-[1px] border-[#FFD700]">
                  <h1 className="flex items-center justify-center h-full p-3 text-3xl font-bold text-white lg:justify-start lg:-rotate-90 lg:transform">
                    Mint
                  </h1>
                </div>
                <div className="flex items-center justify-center p-5">
                  <BlurredContent placeholder="FAT CAT" blurIntensity="heavy">
                      <img
                        src={`/img/nft/v4-slider-img4.png`}
                        className="w-[300px]"
                        alt="nftCollectionSlider"
                      />
                    </BlurredContent>
                </div>
                <div className="flex flex-col items-start justify-start h-full gap-5 p-10">
                  <h3 className="text-white text-[30px] font-bold">
                    Tokenomics
                  </h3>
                  <h4 className="text-[#FFD700]">Q7 2025</h4>
                  <p className="text-lg text-gray-400">
                    - Blockchain: Solana
                  </p>
                  <p className="text-lg text-gray-400">
                    - Launchpad: Meteora.ag (M3M3 model)
                  </p>
                  <p className="text-lg text-gray-400">
                    - Total supply: 1,000,000,000 FCW
                  </p>
                  <p className="text-lg text-gray-400">
                    - No presale, no vesting, no VC – 100% transparent
                  </p>
                </div>
              </div>
            </div>
            <div className="px-3">
              <div className="w-full border-[1px] border-[#FFD700] shadow-2xl shadow-[#22B78F80] flex min-h-[30vh] lg:flex-row flex-col">
                <div className="border-r-[1px] border-[#FFD700]">
                  <h1 className="flex items-center justify-center h-full p-3 text-3xl font-bold text-white lg:justify-start lg:-rotate-90 lg:transform">
                    Organization
                  </h1>
                </div>
                <div className="flex items-center justify-center p-5">
                  <BlurredContent placeholder="FAT CAT" blurIntensity="heavy">
                      <img
                        src={`/img/nft/v4-slider-img5.png`}
                        className="w-[300px]"
                        alt="nftCollectionSlider"
                      />
                    </BlurredContent>
                </div>
                <div className="flex flex-col items-start justify-start h-full gap-5 p-10">
                  <h3 className="text-white text-[30px] font-bold">
                    Community Pool
                  </h3>
                  <h4 className="text-[#FFD700]">Q8 2025</h4>
                  <p className="text-lg text-gray-400">
                    - Reward contributors, creators, and community leaders

                  </p>
                  <p className="text-lg text-gray-400">
                    - Pay real people for real work
                  </p>
                  <p className="text-lg text-gray-400">
                    - Support NFT launch, game development, influencer deals, and long-term incentives
                  </p>
                  <p className="text-lg text-gray-400">
                    - Reward contributors, creators, and community leaders, support NFT launch
                  </p>
                </div>
              </div>
            </div>
            <div className="px-3">
              <div className="w-full border-[1px] border-[#FFD700] shadow-2xl shadow-[#22B78F80] flex min-h-[30vh] lg:flex-row flex-col">
                <div className="border-r-[1px] border-[#FFD700]">
                  <h1 className="flex items-center justify-center h-full p-3 text-3xl font-bold text-white lg:justify-start lg:-rotate-90 lg:transform">
                    Coming
                  </h1>
                </div>
                <div className="flex items-center justify-center p-5">
                  <BlurredContent placeholder="FAT CAT" blurIntensity="heavy">
                      <img
                        src={`/img/nft/v4-slider-img6.png`}
                        className="w-[300px]"
                        alt="nftCollectionSlider"
                      />
                    </BlurredContent>
                </div>
                <div className="flex flex-col items-start justify-start h-full gap-5 p-10">
                  <h3 className="text-white text-[30px] font-bold">
                    FatCatWen combines:
                  </h3>
                  <h4 className="text-[#FFD700]">Q8 2025</h4>
                  <p className="text-lg text-gray-400">
                    - Community energy and financial education
                  </p>
                  <p className="text-lg text-gray-400">
                    - Entertainment
                  </p>
                  <p className="text-lg text-gray-400">
                    - Real decentralized market access
                  </p>
                  <p className="text-lg text-gray-400">
                    - Merch shop, plush FatCat, cap’s, t-shirts,
                  </p>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <div className="absolute top-0 bottom-0 md:min-h-screen lg:min-h-[120vh] xl:min-h-[60vh] min-h-[120vh] area z-10">
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
