import React, { useContext, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'

const Lnav = () => {
  const [open, setOpen] = useState(true)
  const { dispatch ,isLoggedIn  } = useContext(AuthContext)

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
    <div className={`bg-stone-300 h-64 rounded-2xl ${open ? "h-auto" : "h-10 pt-2"} mb-3 `}>
      <div className={`pt-6  ${!open && "hidden"}`}>
        <p className='text-lg font-semibold cursor-pointer hover:bg-amber-400 rounded-xl'><HomeIcon sx={{ mb: 1 }} />Home</p>
        <Link to='/personal'><p className='text-lg font-semibold cursor-pointer hover:bg-amber-400 rounded-xl'><InfoIcon sx={{ mb: 1 }} />Personal</p></Link>
        <Link to='/search'><p className='text-lg font-semibold cursor-pointer hover:bg-amber-400 rounded-xl'><SearchIcon sx={{ mb: 1 }} />Search</p></Link>
        <Link to='/posts'><p className='text-lg font-semibold cursor-pointer hover:bg-amber-400 rounded-xl'><ModeEditIcon sx={{ mb: 1 }} />Posts</p></Link>
        {
        isLoggedIn === true ? <p className='text-lg font-semibold cursor-pointer hover:bg-red-500 rounded-xl' onClick={handleClick}>Logout</p>:null
      }
       
      </div>
     
      <button onClick={() => setOpen(!open)} >
        <ArrowCircleDownIcon className={`${open && "rotate-180"} mb-3 `} fontSize='medium' />
      </button>
    </div>
  )
}

export default Lnav