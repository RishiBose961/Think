import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css';

const Navpre = () => {
  return (
    <div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 15
          },
          1280: {
            slidesPerView: 7,
            spaceBetween: 15
          }
        }}
      >


        <SwiperSlide>
          <button className='bg-amber-400 w-48 rounded-lg'>NEWS</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48  rounded-lg'>CORONAVIRUS</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48  rounded-lg'>SPORT</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48  rounded-lg'>GAMING</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48  rounded-lg'>ENTERTAINMENT</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48  rounded-lg'>MONEY</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48  rounded-lg'>LIFESTYLE</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48  rounded-lg'>HEALTH</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48  rounded-lg'>TRAVELS</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48  rounded-lg'>AUTOS</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48  rounded-lg'>OTHERS</button>
        </SwiperSlide>

      </Swiper>
    </div>
  )
}

export default Navpre