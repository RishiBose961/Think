import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';


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
        }, 2000)
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
                                        <div className='mt-4 hover:bg-gradient-to-tr rounded-xl 
                                        cursor-pointer ring-1 ring-zinc-900 shadow-lg shadow-teal-400 h-fit group relative'>
                                         <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute top-0 right-0 bg-white m-2 p-4 rounded-full'>
                                                <button><DeleteIcon/></button>
                                            </div>
                                            <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute top-0 right-16 bg-white m-2 p-4 rounded-full'>
                                                <button><CreateIcon/></button>
                                            </div>
                                            <img src={req.thumbnail} alt='Something Went Wrong' className='text-center rounded-xl object-cover mix-blend-overlay' />
                                            <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-white m-2 p-4 rounded-full'>
                                                <p className='mx-auto'>{req.title}</p>
                                            </div>
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