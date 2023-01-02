import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css';
import useFetch from './useFetch';
import SearchHome from './SearchHome';


const Navpre = () => {
  const [destination, setDestination] = React.useState("");
  const [shows,setShows] = React.useState(false)

  const { data:datas, loading } = useFetch(`/api/auth/getpost/?search=${destination}`)


  const showsHandle = (e) =>{
    setDestination(e.target.value)
    setShows(true)
  }

  // console.log(datas);


  // console.log(data);
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
          <button className='bg-orange-400 w-48 rounded-lg' value={'HIDE'} onClick={showsHandle}>HIDE</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48 rounded-lg' value={'NEWS'} onClick={showsHandle}>NEWS</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48  rounded-lg' value={'CORONAVIRUS'} onClick={showsHandle}>CORONAVIRUS</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48  rounded-lg' value={'SPORT'} onClick={showsHandle}>SPORT</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48  rounded-lg' value={'GAMING'} onClick={showsHandle}>GAMING</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48  rounded-lg' value={'ENTERTAINMENT'} onClick={showsHandle}>ENTERTAINMENT</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48  rounded-lg'  value={'MONEY'} onClick={showsHandle}>MONEY</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48  rounded-lg' value={'LIFESTYLE'} onClick={showsHandle}>LIFESTYLE</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48  rounded-lg'  value={'HEALTH'} onClick={showsHandle}>HEALTH</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48  rounded-lg' value={'TRAVELS'} onClick={showsHandle}>TRAVELS</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48  rounded-lg' value={'AUTOS'} onClick={showsHandle}>AUTOS</button>
        </SwiperSlide>
        <SwiperSlide>
          <button className='bg-amber-400 w-48  rounded-lg' value={'OTHERS'} onClick={showsHandle}>OTHERS</button>
        </SwiperSlide>

      </Swiper>
      {
        shows?<SearchHome datas={datas}/>:null
      }
      
    </div>
  )
}

export default Navpre