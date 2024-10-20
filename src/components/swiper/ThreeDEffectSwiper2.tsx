import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, FreeMode, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ThreeDEffectSwiper2 = () => {
  return (
    <>
      <h2 className='my-20 text-center text-4xl'>3D Swiper 2</h2>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        // navigation={true}
        // pagination={{ clickable: true }}
        modules={[EffectCards, FreeMode, Navigation, Pagination]}
        className="mySwiper h-96 md:h-80 lg:h-96"  // Responsive height
      >
        <SwiperSlide className="flex items-center justify-center bg-gradient-to-r from-red-500 to-red-700 rounded-lg shadow-lg text-xl font-bold text-white text-center transition-transform duration-300 h-full">Slide 1</SwiperSlide>
        <SwiperSlide className="flex items-center justify-center bg-gradient-to-r from-green-500 to-green-700 rounded-lg shadow-lg text-xl font-bold text-white text-center transition-transform duration-300 h-full">Slide 2</SwiperSlide>
        <SwiperSlide className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-lg text-xl font-bold text-white text-center transition-transform duration-300 h-full">Slide 3</SwiperSlide>
        <SwiperSlide className="flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-lg shadow-lg text-xl font-bold text-white text-center transition-transform duration-300 h-full">Slide 4</SwiperSlide>
        <SwiperSlide className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg shadow-lg text-xl font-bold text-white text-center transition-transform duration-300 h-full">Slide 5</SwiperSlide>
      </Swiper>
    </>
  );
};

export default ThreeDEffectSwiper2;
