import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BlurredContent from "./BlurredContent";

const CollectionSlider = () => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
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

  const nftImages = [
    "v4-slider-img.png",
    "v4-slider-img2.png",
    "v4-slider-img3.png",
    "v4-slider-img4.png",
    "v4-slider-img5.png",
    "v4-slider-img6.png",
    "v4-slider-img7.png",
    "v4-slider-img8.png",
    "v4-slider-img9.png",
    "v4-slider-img10.png",
    "v4-slider-img11.png",
    "v4-slider-img12.png",
    "v4-slider-img13.png",
    "v4-slider-img14.png",
    "v4-slider-img15.png",
  ];

  return (
    <>
      <Slider {...settings} className="my-10 slider">
        {nftImages.map((image, index) => (
          <div key={index} className="px-3">
            {/* <BlurredContent placeholder="FAT CAT" blurIntensity="heavy"> */}
              <div className="w-full p-2 border-2 border-[#FFD700] bg-white bg-opacity-10 backdrop-blur-md rounded-md">
                <img
                  src={`/img/nft/${image}`}
                  className="w-90"
                  alt="nftCollectionSlider"
                />
              </div>
            {/* </BlurredContent> */}
          </div>
        ))}
      </Slider>
    </>
  );
};

export default CollectionSlider;
