import React, { useContext, useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'
import Scrollbars from 'react-custom-scrollbars-2';

const Lnav = () => {
  const [open, setOpen] = useState(true)
  const { dispatch, isLoggedIn, user, token } = useContext(AuthContext)
  const [friends, setFriends] = useState([]);
  const [friendsFollower, setfriendsFollower] = useState([]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.get("/api/auth/signout")
      localStorage.removeItem("_appSignging")
      dispatch({ type: "SIGNOUT" })
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/api/auth/friendfollowing/" + user._id, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          }
        });
        setFriends(friendList.data.slice(0,3));
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  useEffect(() => {
    const getFriend = async () => {
      try {
        const friendList = await axios.get("/api/auth/friendfollowers/" + user._id, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          }
        });
        setfriendsFollower(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriend();
  }, [user]);

  // console.log(friends);

  return (
    <>
      <div className={`bg-stone-300 h-64 rounded-2xl ${open ? "h-auto" : "h-11 pt-2"} mb-3 `}>
        <div className={`pt-6  ${!open && "hidden"}`}>
          <p className='text-lg font-semibold cursor-pointer hover:bg-amber-400 rounded-xl'><HomeIcon sx={{ mb: 1 }} />Home</p>
          <Link to='/personal'><p className='text-lg font-semibold cursor-pointer hover:bg-amber-400 rounded-xl'><InfoIcon sx={{ mb: 1 }} />Personal</p></Link>
          <Link to='/search'><p className='text-lg font-semibold cursor-pointer hover:bg-amber-400 rounded-xl'><SearchIcon sx={{ mb: 1 }} />Search</p></Link>
          <Link to='/posts'><p className='text-lg font-semibold cursor-pointer hover:bg-amber-400 rounded-xl'><ModeEditIcon sx={{ mb: 1 }} />Posts</p></Link>
          {/* <Link to='/chats'><p className='text-lg font-semibold cursor-pointer hover:bg-amber-400 rounded-xl'><ChatIcon sx={{ mb: 1 }} />Chat</p></Link> */}
          {
            isLoggedIn === true ? <p className='text-lg font-semibold cursor-pointer hover:bg-red-500 rounded-xl' onClick={handleClick}>Logout</p> : null
          }

        </div>

        <button onClick={() => setOpen(!open)} >
          <ArrowCircleDownIcon className={`${open && "rotate-180"} mb-3 `} fontSize='medium' />
        </button>
      </div>
      {
        isLoggedIn === true ? <>
          {/* friend list */}
          <div className={`bg-gradient-to-t from-white to-amber-500 h-64 rounded-2xl mb-3`}>
            <p className='text-lg font-semibold text-left mx-3 pt-2'>Following Friends</p>
            <Scrollbars style={{ width: 'auto', height: 210 }}>
            {friends.map((item) => {
              return (
                <>
                  <div className='text-left mx-3 mb-3 ring-2 ring-black bg-zinc-100 pt-2 pb-2 rounded-2xl mt-1'>
                    <div className='flex justify-start'>
                      <img src={item.avatar} alt="loading" className='h-16 w-16 ring-1 ring-amber-400 rounded-full mx-3' />
                      <div className='grid grid-cols-1'>
                        <p className='mt-1'>{item.username}</p>
                        <p className='mb-3'>{item.email}</p>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
            <p className='text-[13px] cursor-pointer'>See More..</p>
            </Scrollbars>
            <div>
            </div>
          </div>
        </> : ""
      }
      {
        isLoggedIn === true ? <>
          {/* friend list */}
          <div className={`bg-gradient-to-t from-cyan-500 to-blue-500 h-64 rounded-2xl mb-3`}>
            <p className='text-lg font-semibold text-left mx-3 pt-2'>Yours Followers</p>
            <Scrollbars style={{ width: 'auto', height: 210 }}>
            {friendsFollower.map((item) => {
              return (
                <>
                  <div className='text-left mx-3 mb-3 ring-2 ring-black bg-zinc-100 pt-2 pb-2 rounded-2xl mt-1'>
                    <div className='flex justify-start'>
                      <img src={item.avatar} alt="loading" className='h-16 w-16 ring-1 ring-amber-400 rounded-full mx-3' />
                      <div className='grid grid-cols-1'>
                        <p className='mt-1'>{item.username}</p>
                        <p className='mb-3'>{item.email}</p>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
            <p className='text-[13px] cursor-pointer'>See More..</p>
            </Scrollbars>
            <div>

            </div>
          </div>
        </> : ""
      }

    </>

  )
}

export default Lnav