import BlurredContent from "./BlurredContent";

export default function TeamCard() {
  return (
    <div className="relative w-full p-3">
      <div className="w-[20px] h-[20px] border-t-[1px] border-[#FFD700] absolute top-0 left-0 border-l-[1px]" />
      <div className="w-[20px] h-[20px] border-t-[1px] border-[#FFD700] absolute top-0 right-0 border-r-[1px]" />
      <div className="w-[20px] h-[20px] border-b-[1px] border-[#FFD700] absolute bottom-0 left-0 border-l-[1px]" />
      <div className="w-[20px] h-[20px] border-b-[1px] border-[#FFD700] absolute bottom-0 right-0 border-r-[1px]" />
      <div className="border-[1px] border-gray-800 p-3">
        <BlurredContent placeholder="Father" blurIntensity="heavy">
          <img
            src={`/img/nft/1.jpg`}
            className="z-10 rounded-md w-90"
            alt="nftCollectionSlider"
          />
        </BlurredContent>
        <div className="relative z-20 w-full p-3 -mt-8">
          <div className="py-4 bg-gray-800 text-[#FFD700] text-center">
            CO-Founder<span className="text-red-400">(CEO)</span>: CatFather
          </div>
        </div>
      </div>
    </div>
  );
}
