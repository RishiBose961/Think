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


const Mnav = () => {
  const { token, user, isLoggedIn } = useContext(AuthContext)
  const [loading,setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [data, setData] = React.useState([])
  const [opens, setOpens] = React.useState(false);
  const [openUNLIKE, setopenUNLIKE] = React.useState(false);

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
    <>
     {loading ? <Scrollbars style={{ width: 'auto', height: 950 }}>
        {
          data.map((post, index) => {
            return (
              <div className='bg-stone-300 rounded-xl mb-5' key={index}>
                <div className='mx-2 pt-2 pb-2'>
                  <img src={post.thumbnail}
                    alt='loading' className='rounded-xl w-full h-96 mb-2 ring-1 ring-zinc-900' />
                    <hr/>
                  <div className='mt-3 flex justify-between'>
                  {/* <Link to={`usersearch/${post._id}`}> */}
                    <div className='flex justify-start'>
                      <Avatar alt="Remy Sharp" src={post.postedBy.avatar} />
                      <span className='mt-2 mx-2'>{post.postedBy.companyname}</span>
                    </div>
                    {/* </Link> */}
                    <div>
                      {
                        isLoggedIn === true ? <>
                          {post.likes.includes(user._id) ? <>
                            <ThumbUpIcon sx={{ mx: 1 }} className="cursor-pointer" color="error" onClick={() => { unlikePost(post._id) }} />
                            <Snackbar
                              open={openUNLIKE}
                              autoHideDuration={3000}
                              onClose={handleClose}
                              message="Unlike the Post"
                            />
                          </>
                            : <>
                              <ThumbUpOffAltIcon sx={{ mx: 1 }} className="cursor-pointer" onClick={() => { likePost(post._id) }} />
                              <Snackbar
                              open={opens}
                              autoHideDuration={2000}
                              onClose={handleClose}
                              message={`Like the Post ${post.postedBy.companyname}`}
                            />
                            </>
                          }<span>{formatter.format(post.likes.length)}</span>
                        </> : <LoginRegister />
                      }
                      <PlaylistAddIcon fontSize='large' sx={{ mx: 1 }} />
                      <Link to={`postview/${post._id}`}><ExitToAppIcon fontSize='large' color='info' className='cursor-pointer'/></Link>
                    </div>
                  </div>

                  <div className='text-left mx-2 mt-2 '>
                  <p className='font-semibold text-xs'>{post.category}</p>
                    <p className='font-bold text-lg'>{post.title}
                      <button onClick={() => setOpen(!open)} className="text-purple-500 font-light ml-3 text-sm">see more...</button></p>
                      
                    <div className={`bg-slate-200 ${open ? "h-fit mb-3" : "h-1 mb-3"} duration-300 rounded-2xl`} >
                      <div className={`${!open && "hidden"} mx-2 pt-3 pb-3`}>
                        <p>{post.description.substring(0, 115)}
                        <Link to={`postview/${post._id}`}><span className='text-sm cursor-pointer underline ml-3 underline-offset-3 text-red-500'>Read More..</span></Link></p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </Scrollbars>:<LoadingScreen/>}
    </>
  )
}

export default Mnav