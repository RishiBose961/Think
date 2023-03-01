import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Message = ({ own ,messages}) => {
    
    return (
      
        <div className={`${own ? 'flex justify-end' : 'flex justify-start'}`}>
            <div className='flex mt-2 mb-4'>
                <img src={messages.avatar} alt="loading" className='w-14 h-14 rounded-full bg-gradient-to-t from-cyan-500 to-blue-500' />
                <div   className={`${own ? 'bg-gradient-to-t from-white to-amber-400 w-96 mx-2 ring-1 rounded-2xl' : 'bg-gradient-to-t from-white to-violet-400 w-96 mx-2 ring-1 rounded-2xl'}`}>
                    <p className='px-2 text-md pb-2 pt-1'>
                    {messages.text}
                       
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Message