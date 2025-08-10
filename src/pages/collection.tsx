import { Fade } from "react-awesome-reveal";
import CollectionSlider from "../components/CollectionSlider";

export default function Collection() {
  return (
    <section id="collection" className="mt-20">
      <div className="w-full min-h-[90vh]">
        <Fade direction="down">
          <h1 className="text-[50px] md:text-[75px] text-white text-center font-extrabold uppercase">
            {" "}
            Collection
          </h1>
          <p className="text-2xl text-center text-yellow-500 md:-mt-[70px] -mt-[50px] font-bold uppercase">
            Collection
          </p>
        </Fade>
        <div className="w-full mt-20">
          <CollectionSlider />
        </div>
        <div className="2xl:px-[300px] xl:px-[200px] lg:px-[100px] md:px-[100px] px-5 w-full">
          <Fade>
            <div className="flex flex-col gap-6 items-center ">
              {/* Big Number */}
              <h1 className="md:text-[100px] text-[60px] font-black text-white text-center drop-shadow-lg">
                999
              </h1>

              {/* Description */}
              <h2 className="text-2xl text-white text-center font-semibold uppercase tracking-wide">
                Total Items in Collection
              </h2>

              {/* Traits Description (Split into bullets/grid) */}
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-4 text-yellow-200 text-center text-base font-medium mb-6">
                <div>🎨 13 Backgrounds</div>
                <div>🧍 8 Skins</div>
                <div>✋ 6 Hands</div>
                <div>👕 16 Clothes</div>
                <div>👀 9 Eyes</div>
                <div>🎩 8 Hats</div>
                <div>👄 9 Mouths</div>
                <div>🧬 7 Traits</div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}
