import React, { useContext, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { AuthContext } from '../../context/AuthContext';
import LoginRegister from '../../Layout/LoginRegister';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import LoadingScreen from '../Page/LoadingScreen';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css';


const SearchHome = ({datas}) => {
    const { token, user, isLoggedIn } = useContext(AuthContext)
  const [loading,setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [data, setData] = React.useState([])
  const [opens, setOpens] = React.useState(false);
  const [openUNLIKE, setopenUNLIKE] = React.useState(false);

console.log(datas);
    const getPosts = async () => {
        const res = await fetch('/api/auth/getallpost');
        await res.json()
          .then(result => {
            setData(result.posts)
          })
      }
    
      useEffect(() => {
        setTimeout(() => {
          getPosts()
          setLoading(true)
        }, 3000);
        
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
            setOpens(true);
    
          }).catch(err => {
            console.log(err)
          })
      }
    
      // console.log(data);
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
            setopenUNLIKE(true);
          }).catch(err => {
            console.log(err)
          })
      }
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpens(false);
        setopenUNLIKE(false);
      };
      const formatter = new Intl.NumberFormat('en', {
        style: 'decimal',
        useGrouping: true,
        notation: 'compact'
      })
  return (
    <div className='mt-3'>
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
        
        {
            datas.map((post, index) => {
            return (
              <SwiperSlide>
                <div>
                  <img src={post.thumbnail} alt='loading' />
                </div>
              </SwiperSlide>
          )
        })}
          
        
      </Swiper>
    </div>
  )
}

export default SearchHome