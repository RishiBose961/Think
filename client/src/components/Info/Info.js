import React from 'react'
import { AuthContext } from '../../context/AuthContext'
import YourPost from './YourPost'
import { TabTitle } from '../NewTab/GenerateTitle'
import { Link } from 'react-router-dom'
import Adsvistment from '../../Ads/Adsvistment'
import SearchUser from './SearchUser'


const Info = () => {
  TabTitle('Personal - Think')

  const { user } = React.useContext(AuthContext)

  return (
    <div>

      <div className='flex justify-center'>
        <img src={user.avatar} alt="loading" className='h-48 mt-4 w-48 rounded-full ring-2 ring-black bg-slate-300' />
      </div>
      <p className='text-center capitalize font-semibold text-xl'>{user.username}</p>
      <div className='grid grid-cols-1 lg:grid-cols-3  gap-4 mt-4 mx-2'>
        <p className='ring-2 ring-amber-400 text-center text-xl capitalize rounded-2xl hover:bg-amber-200'>{user.username}</p>
        <p className='ring-2 ring-amber-400 text-center text-xl rounded-2xl hover:bg-amber-200'>{user.companyname}</p>
        <p className='ring-2 ring-amber-400 text-center text-xl rounded-2xl hover:bg-red-400'>{user.email}</p>
      </div>
      <div className='flex justify-center mt-3'>
      <p className='text-xl mx-1'>Followers {user.followers?.length}</p>
        <p className='text-xl mx-2'>Following {user.following?.length}</p>
      </div>
      <div className='flex justify-end mt-3'>
        <Link to='#'>
          <Adsvistment />
        </Link>
      </div>
      <div>{

      }
        <YourPost />
      </div>
    </div>
  )
}

export default Info