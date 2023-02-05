import React, { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import LoginRegister from '../../Layout/LoginRegister';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Avatar } from '@mui/material';

const Header = () => {
  const {isLoggedIn,user,dispatch} = useContext(AuthContext)

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

// console.log(user);
  return (
    <div className='h-14'>
      <div className='flex justify-between pt-3'>
        <div className='text-xl font-bold'>
          <NavLink to='/'>Think</NavLink>
        </div>
        <div className=''>
          <p className='font-bold text-xl underline-offset-2 underline hidden'>What You Think</p>
        </div>
        {
          isLoggedIn === true ? <>
          <div className='flex justify-start ring-2 ring-black rounded-3xl'>
          <Avatar alt="Remy Sharp" src={user.avatar} />
          <p onClick={handleClick} className='text-lg cursor-pointer mt-1 mr-1'>{user.username}</p>
          </div>
          </>:<div className='font-bold text-xl'>
          <LoginRegister/>
        </div>
        }
        
      </div>
    </div>
  )
}

export default Header