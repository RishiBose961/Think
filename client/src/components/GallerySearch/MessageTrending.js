import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css';


const MessageTrending = () => {

    const [data, setData] = React.useState([])

    const getPosts = async () => {
        const res = await fetch('/api/auth/getpostsearch');
        await res.json()
            .then(result => {
                // console.log(result);
                setData(result.searchlist)
                // setLoading(true)
            })
    }

    React.useEffect(() => {
        getPosts()
    }, [])

    return (
        <>

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
                        slidesPerView: 5,
                        spaceBetween: 15
                    }
                }}>
                {data.map((item) => {
                    return (
                        <SwiperSlide>
                            <div className='bg-slate-200 h-96 w-48 mb-5 group relative rounded-lg ring-1 ring-black'>
                                <img src={item.thumbnail} alt='loading' loading='lazy'
                                    className='w-48 rounded-lg h-96 ring-1 ring-black' />
                                <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-black m-2 p-4 rounded-md'>
                                    <p className='text-white text-[14px] text-left'>{item.title.substring(0, 25)}..</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>

        </>
    )
}

export default MessageTrending