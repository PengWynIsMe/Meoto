import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  image: {
    id: number;
    url: string;
    name: string;
    width: number;
    height: number;
    formats?: {
      large?: { url: string };
      medium?: { url: string };
      small?: { url: string };
    };
  };
};

interface SliderProps {
  slides: Slide[];
}

export default function Slider({ slides }: SliderProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getImageUrl = (slide: Slide) => {
    const baseUrl = "http://127.0.0.1:1337";

    if (slide.image.formats?.large) {
      return baseUrl + slide.image.formats.large.url;
    }
    if (slide.image.formats?.medium) {
      return baseUrl + slide.image.formats.medium.url;
    }

    return baseUrl + slide.image.url;
  };

  return (
    <div
      className="relative w-full h-96 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        direction="vertical"
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
          renderBullet: (index: number, className: string) => {
            return `<span class="${className} w-2 h-2 rounded-full block my-1 cursor-pointer transition-all duration-300 bg-white/50 hover:bg-white/80 hover:scale-110"></span>`;
          },
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={slides.length > 1}
        className="w-full h-full"
      >
        {slides.map((slide: Slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={getImageUrl(slide)}
                alt={slide.title || "Slide image"}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              {/* Content overlay */}
              <div className="absolute bottom-5 left-5 right-16 text-white">
                <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">
                  {slide.title}
                </h3>
                <p className="text-base opacity-90 drop-shadow-md">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={`
          swiper-button-prev absolute top-1/2 left-4 -translate-y-1/2 z-10
          w-12 h-12 min-w-[48px] min-h-[48px] bg-white text-gray-700
          rounded-full border border-gray-300 shadow-md
          flex items-center justify-center cursor-pointer
          hover:scale-110 hover:shadow-xl hover:bg-gray-50 transition-all duration-300
          ${isHovered ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        style={{ aspectRatio: "1/1" }}
      ></div>

      {/* Nút Phải (Next) - HÌNH TRÒN HOÀN HẢO */}
      <div
        className={`
          swiper-button-next absolute top-1/2 right-4 -translate-y-1/2 z-10
          w-12 h-12 min-w-[48px] min-h-[48px] bg-white text-gray-700
          rounded-full border border-gray-300 shadow-md
          flex items-center justify-center cursor-pointer
          hover:scale-110 hover:shadow-xl hover:bg-gray-50 transition-all duration-300
          ${isHovered ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        style={{ aspectRatio: "1/1" }}
      ></div>
    </div>
  );
}
