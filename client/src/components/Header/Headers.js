import { Avatar } from '@mui/material'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import LoginRegister from '../../Layout/LoginRegister'
import photo from '../images/android-chrome-512x512.png'

const Headers = () => {
    const { isLoggedIn, user } = useContext(AuthContext)
    return (
        <nav className='p-2 bg-white shadow flex items-center justify-between'>
            <div>
                <Link to='/'>
                    <span
                        className='text-2xl font-[Poppins] cursor-pointer'>
                        <img src={photo} alt="loading"
                            className='w-12 h-12 inline rounded-full' />
                        Think
                    </span>
                </Link>
            </div>
            {
                isLoggedIn === true ? <>
                    <div className='flex justify-start ring-2 ring-black rounded-3xl'>
                        <Avatar alt="Remy Sharp" src={user.avatar} />
                        <p className='text-lg cursor-pointer mt-1 mr-1'>{user.username}</p>
                    </div>
                </> : <div className='font-bold text-xl'>
                    <LoginRegister />
                </div>
            }
        </nav>
    )
}

export default Headers