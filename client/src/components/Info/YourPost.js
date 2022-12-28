import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';

const YourPost = () => {
    const { token } = useContext(AuthContext)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const getPosts = async () => {
        const res = await fetch('/api/auth/getpostid', {
            headers: {
                "Authorization": token
            }
        });
        await res.json()
            .then(result => {
                setData(result.mypost)
            })
    }

    useEffect(() => {
        setTimeout(() => {
            getPosts()
            setLoading(true)
        }, 3000)
    }, [])
    // console.log(data);


    return (
        <div className='mt-4'>
            <p className='text-xl font-semibold'>Your Posts</p>
            <hr />
            {
                loading ? <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6 mx-2'>
                    {
                        data.map((req) => {
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

                </div> : <LinearProgress color='warning' />
            }

        </div>
    )
}

export default YourPost