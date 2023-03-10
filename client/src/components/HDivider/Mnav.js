import React, { useContext, useEffect, useId, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { AuthContext } from '../../context/AuthContext';
import LoginRegister from '../../Layout/LoginRegister';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import LoadingScreen from '../Page/LoadingScreen';
import MessageTrending from '../GallerySearch/MessageTrending';



const Mnav = () => {
  const { token, user, isLoggedIn } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [data, setData] = React.useState([])
  const [datas, setDatas] = React.useState([])
  const [opens, setOpens] = React.useState(false);
  const [openUNLIKE, setopenUNLIKE] = React.useState(false);

  const id = useId()

  const getPosts = async () => {
    const res = await fetch('/api/auth/getallpost');
    await res.json()
      .then(result => {
        setData(result.posts.slice(0, 3))
      })
  }

  const getPost = async () => {
    const res = await fetch('/api/auth/getallpost');
    await res.json()
      .then(result => {
        setDatas(result.posts.slice(4))
      })
  }


  useEffect(() => {
    setTimeout(() => {
      getPosts()
      getPost()
      setLoading(true)
    }, 1000);

  }, [])


  //like the post from the from .slice(0,3)
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
  //like the post from the from .slice(4)
  const likePosts = (id) => {
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
        const newData = datas.map((item) => {
          if (item._id == result._id) {
            return result
          } else {
            return item
          }
        })
        setDatas(newData)
        setOpens(true);

      }).catch(err => {
        console.log(err)
      })
  }


  // console.log(data);
  //unlike the post from the from .slice(0,3)
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

  //unlike the post from the from .slice(4)
  const unlikePosts = (id) => {
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
        const newData = datas.map(item => {
          if (item._id == result._id) {
            return result
          } else {
            return item
          }
        })
        setDatas(newData)
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
          data.map((post, id) => {
            return (
              <div className='bg-gradient-to-r from-amber-200 to-white rounded-xl mb-5' key={id}>
                <div className='mx-2 pt-2 pb-2'>
                  <img src={post.thumbnail}
                    alt='loading' className='rounded-xl w-full h-96 mb-2 ring-1 ring-zinc-900' loading='lazy' />
                  <hr />
                  <div className='mt-3 flex justify-between'>
                    {/* <Link to={`usersearch/${post._id}`}> */}
                    <div className='flex justify-start'>
                      <Avatar alt="Remy Sharp" src={post.postedBy.avatar} />
                      <span className='mt-2 mx-2'>{post.postedBy.companyname}</span>
                    </div>
                    {/* </Link> */}
                    <div className='ring-2 w-32 ring-black rounded-3xl h-9 '>
                      {
                        isLoggedIn === true ? <>
                          {post.likes.includes(user._id) ? <>
                            <ThumbUpIcon sx={{ mx: 1 }}
                              className="cursor-pointer"
                              color="error" onClick={() => { unlikePost(post._id) }} />
                            <Snackbar
                              open={openUNLIKE}
                              autoHideDuration={3000}
                              onClose={handleClose}
                              message="Unlike the Post"
                            />
                          </>
                            : <>
                              <ThumbUpOffAltIcon sx={{ mx: 1 }}
                                className="cursor-pointer" onClick={() => { likePost(post._id) }} />
                              <Snackbar
                                open={opens}
                                autoHideDuration={2000}
                                onClose={handleClose}
                                message={`Like the Post ${post.postedBy.companyname}`}
                              />
                            </>
                          }<span className='mr-3 '>{formatter.format(post.likes.length)}</span>|
                          <Link to={`postview/${post._id}`}>
                            <ExitToAppIcon fontSize='large' color='info' className='cursor-pointer' /></Link>
                        </> : <LoginRegister />

                      }

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
        <hr />
        <div className='flex justify-start'>
          <p className='text-[24px] font-bold'>Trending</p>
        </div>
        <div className='flex justify-start'>
          <MessageTrending />
        </div>
        <hr />
        {
          datas.map((post, index) => {
            return (
              <div className='bg-gradient-to-r from-amber-200 to-white rounded-xl mb-5 mt-4' key={index}>
                <div className='mx-2 pt-2 pb-2'>
                  <img src={post.thumbnail}
                    alt='loading' className='rounded-xl w-full h-96 mb-2 ring-1 ring-zinc-900' loading='lazy' />
                  <hr />
                  <div className='mt-3 flex justify-between'>
                    {/* <Link to={`usersearch/${post._id}`}> */}
                    <div className='flex justify-start'>
                      <Avatar alt="Remy Sharp" src={post.postedBy.avatar} />
                      <span className='mt-2 mx-2'>{post.postedBy.companyname}</span>
                    </div>
                    {/* </Link> */}
                    <div className='ring-2 w-32 ring-black rounded-3xl h-9'>
                      {
                        isLoggedIn === true ? <>
                          {post.likes.includes(user._id) ? <>
                            <ThumbUpIcon sx={{ mx: 1 }}
                              className="cursor-pointer"
                              color="error" onClick={() => { unlikePosts(post._id) }} />
                            <Snackbar
                              open={openUNLIKE}
                              autoHideDuration={3000}
                              onClose={handleClose}
                              message="Unlike the Post"
                            />
                          </>
                            : <>
                              <ThumbUpOffAltIcon sx={{ mx: 1 }}
                                className="cursor-pointer" onClick={() => { likePosts(post._id) }} />
                              <Snackbar
                                open={opens}
                                autoHideDuration={2000}
                                onClose={handleClose}
                                message={`Like the Post ${post.postedBy.companyname}`}
                              />
                            </>
                          }<span className='mr-3'>{formatter.format(post.likes.length)}</span>|
                          <Link to={`postview/${post._id}`}><ExitToAppIcon fontSize='large' color='info' className='cursor-pointer' /></Link>
                        </> : <LoginRegister />
                      }

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

      </Scrollbars> : <LoadingScreen />}
    </>
  )
}

export default Mnav