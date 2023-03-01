import { Badge } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

const Conversion = ({ conversations, currentUser }) => {
  const { user, token } = useContext(AuthContext)
  const [users, setUsers] = useState()
  const [friends, setFriends] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])

  useEffect(() => {
    const friendId = conversations.members.find((m) => m !== currentUser._id)

    const getUser = async () => {
      try {
        const res = await axios.get("/api/auth/?userId=" + friendId, {
          headers: { 'Authorization': token },
        })
        setUsers(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser()
  }, [currentUser, conversations])



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
}, [user])






  return (
    <>
     
      {
        friends.map((info) => {
          return (
            <div className='flex items-center mt-2 mb-4'>
              <img src={info?.avatar} alt="loading" className='w-14 h-14 rounded-full bg-gradient-to-t from-cyan-500 to-blue-500' />
              <span className='mx-2 text-md font-semibold'>{info?.username}</span>
            </div>
          )
        })
      }
      <div className='flex items-center mt-2 mb-4'>
              <img src={users?.avatar} alt="loading" className='w-14 h-14 rounded-full bg-gradient-to-t from-cyan-500 to-blue-500' />
              <span className='mx-2 text-md font-semibold'>{users?.username}</span>
            </div>
    </>

  )
}

export default Conversion