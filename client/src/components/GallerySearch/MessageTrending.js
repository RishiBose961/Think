import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AuthContext } from '../../context/AuthContext';
import LoginRegister from '../../Layout/LoginRegister';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';

const MessageTrending = () => {
    const { token, user, isLoggedIn } = useContext(AuthContext)
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

    const likePost = (id) => {
        fetch('/api/auth/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                // console.log(result);
                const newData = data.map((item) => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
                // setOpens(true);

            }).catch(err => {
                console.log(err)
            })
    }

    const unlikePost = (id) => {
        fetch('/api/auth/dislike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
                // setopenUNLIKE(true);
            }).catch(err => {
                console.log(err)
            })
    }


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
                {data.map((items) => {
                    return (
                        <SwiperSlide>
                            <div className='bg-slate-200 h-96 w-48 mb-5 group relative rounded-lg ring-1 ring-black'>
                                <img src={items.thumbnail} alt='loading' loading='lazy'
                                    className='w-48 rounded-lg h-96 ring-1 ring-black' />
                                <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-black m-2 p-4 rounded-md'>
                                    <p className='text-white text-[14px] text-left'>{items.title.substring(0, 25)}..
                                        <div className='flex justify-end  '>
                                            <Link to={`postview/${items._id}`}>
                                                <NavigateNextIcon fontSize='medium' className='bg-amber-400 rounded-full text-black' />
                                            </Link>
                                        </div>
                                    </p>
                                </div>
                                {
                                    isLoggedIn === true ? <>
                                        {items.likes.includes(user._id) ? <>
                                            <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute top-0  right-1 bg-black m-2 p-4 rounded-full'>
                                                <FavoriteBorderIcon fontSize='medium' className='text-white text-[14px] text-left' onClick={() => { unlikePost(items._id) }} />
                                            </div>
                                        </>
                                            : <>
                                                <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute top-0  right-1 bg-black m-2 p-4 rounded-full'>
                                                    <FavoriteIcon fontSize='medium' className='text-white text-[14px] text-left' onClick={() => { likePost(items._id) }} />
                                                </div>
                                            </>
                                        }
                                    </> : <LoginRegister />
                                }
                                {/* <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute top-0  right-1 bg-black m-2 p-4 rounded-full'>
                                    <FavoriteBorderIcon fontSize='medium' className='text-white text-[14px] text-left' />
                                </div> */}
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>

        </>
    )
}

export default MessageTrending