import { Badge } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
    const { user, token } = useContext(AuthContext)
    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get("/api/auth/friends/" + currentId)
            setFriends(res.data)
        }
        getFriends()
    }, [currentId])

    // console.log(friends);


    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)))
    }, [friends, onlineUsers])
    // console.log(onlineUsers);


    const handleClick = async (user) => {
        try {
            const res = await axios.get(`api/finduser/${currentId}/${user._id}`)
            setCurrentChat(res.data)

        } catch (error) {
            console.log(error);
        }
    }




    return (
        <>
            <div>
                {
                    onlineFriends.map((o) => {
                        return (
                            <div className='flex items-center mt-2 mb-4' onClick={() => handleClick(o)}>
                                <Badge color="success" variant="dot" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} overlap="circular" badgeContent=" ">
                                    <img src={o?.avatar} alt="loading" className='w-14 h-14 rounded-full bg-gradient-to-t from-cyan-500 to-blue-500' />
                                </Badge>
                                <span className='mx-2 text-md font-semibold'>{o?.username}</span>
                            </div>
                        )
                    })
                }
            </div>
        </>

    )
}

export default ChatOnline