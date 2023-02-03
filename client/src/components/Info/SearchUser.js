import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { TabTitle } from '../NewTab/GenerateTitle';


const SearchUser = () => {
    TabTitle('Search - Think')
    const { token } = useContext(AuthContext)
    // const [showFollow, setShowFollow] = useState(true)
    const { id } = useParams("");
    const [inpval, setinpval] = useState([])
    const [posts, setposts] = useState([])


    
      // currentUser.followings.includes(user?.id)

    
    useEffect(() => {
        fetch(`/api/auth/getsingleuser/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        }).then(res => res.json())
            .then(result => {
                setinpval(result.user);
                setposts(result.posts)
            })
    }, [])


   

    return (
        <div>
            <div className='flex justify-center mb-3'>
                <img src={inpval.avatar} alt="loading" className='h-48 mt-4 rounded-full' />
            </div>
            <p className='text-center capitalize font-semibold text-xl mb-2'>{inpval.username}</p>
            <hr />
            <div className='grid grid-cols-1 lg:grid-cols-3  gap-4 mt-4'>
                <p className='text-center text-xl'>Total Post : {posts?.length}</p>
                <p className='text-center text-xl'>COMPANY NAME : {inpval.companyname}</p>
                <p className='text-center text-xl'>OFFICAL EMAIL : {inpval.email} </p>
            </div>
            <div className='flex justify-center mt-3 mb-3'>

            </div>
            <div>
                <hr />
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6 mx-2 mt-2'>
                    {
                        posts.map((req) => {
                            return (
                                <>
                                    <Link to={`/postview/${req._id}`}>
                                        <div className='mt-4 hover:bg-gradient-to-tr from-slate-400 to-amber-400 relative rounded-xl cursor-pointer ring-1 ring-zinc-900 shadow-lg shadow-teal-400 h-fit '>
                                            <img src={req.thumbnail} alt='Something Went Wrong' className='text-center rounded-xl object-cover mix-blend-overlay' />
                                        </div>
                                    </Link>
                                </>
                            )
                        })
                    }

                </div>
                {/* <YourPost /> */}
            </div>
        </div>
    )
}

export default SearchUser