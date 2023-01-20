import React from 'react'
import { AuthContext } from '../../context/AuthContext'
import { TextField } from '@mui/material'
import YourPost from './YourPost'
import Avaterchange from './Avaterchange'
import { TabTitle } from '../NewTab/GenerateTitle'



const Info = () => {
    TabTitle('Personal - Think')
    const { user } = React.useContext(AuthContext)
    
    return (
        <div>
            <div className='flex justify-center'>
                <Avaterchange user={user}/>
            </div>
            <p className='text-center capitalize font-semibold text-xl'>{user.username}</p>
            <div className='grid grid-cols-1 lg:grid-cols-3  gap-4 mt-4 mx-2'>
            <p className='ring-2 ring-amber-400 text-center text-xl capitalize rounded-2xl hover:bg-amber-200'>{user.username}</p>
            <p className='ring-2 ring-amber-400 text-center text-xl rounded-2xl hover:bg-amber-200'>{user.companyname}</p>
            <p className='ring-2 ring-amber-400 text-center text-xl rounded-2xl hover:bg-red-400'>{user.email}</p>
            </div>
            <div className='flex justify-end mt-3'>
                <button className='bg-red-400 w-24 h-10 rounded-2xl hover:bg-amber-300'>Update..</button>
            </div>
            <div className='flex justify-center mt-3'>
                <p className='mx-3 mt-2 font-semibold'>Follower <span>{user.followers?.length}</span></p>
                <p className='mt-2 font-semibold'>Following <span>{user.following?.length}</span></p>
            </div>
            <div>{

            }
                <YourPost />
            </div>
        </div>
    )
}

export default Info