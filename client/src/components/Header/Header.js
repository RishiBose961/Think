import React, { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import LoginRegister from '../../Layout/LoginRegister';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

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
  return (
    <div className='h-14'>
      <div className='flex justify-between pt-3'>
        <div className='text-xl font-bold'>
          <NavLink to='/'>Think</NavLink>
        </div>
        <div>
          <p className='font-bold text-xl underline-offset-2 underline'>What You Think</p>
         
        </div>
        {
          isLoggedIn === true ? <>
          <p onClick={handleClick} className='font-bold text-xl cursor-pointer'>{user.username}</p>
          </>:<div  className='font-bold text-xl'>
          <LoginRegister/>
        </div>
        }
        
      </div>
    </div>
  )
}

export default Header