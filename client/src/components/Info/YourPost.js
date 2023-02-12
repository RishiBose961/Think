import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const YourPost = () => {
    const { token } = useContext(AuthContext)
    const [data, setData] = useState([])
    const [datas, setDatas] = useState([])
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


    const deletePost = (profileId) => {
        console.log("delete post");
        fetch(`/api/auth/deletepost/${profileId}`, {
            method: "delete",
            headers: {
                Authorization: token
            }
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                const newData = datas.filter(item => {
                    return item._id !== result._id
                })
                setDatas(newData)
                toast("Post Deleted SuccessFully!")
                setTimeout(() => {
                    window.location.reload(false);
                }, 3000)
            })
    }



    return (
        <div className='mt-4'>
        <ToastContainer />
            <p className='text-xl font-semibold'>Your Posts</p>
            <hr />
            {
                loading ? <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6 mx-2'>
                    {
                        data.map((req) => {
                            return (
                                <>
                                    {/* <Link to={`/postview/${req._id}`}> */}
                                    <div className='mt-4 hover:bg-gradient-to-tr rounded-xl 
                                        cursor-pointer ring-1 ring-zinc-900 shadow-lg w-fit shadow-teal-400 h-fit group relative'>
                                        <img src={req.thumbnail} alt='Something Went Wrong' className='text-center ring-2 ring-black rounded-xl object-cover mix-blend-overlay' />
                                        <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-10 left-0 right-0 bg-white m-2 p-4 rounded-full'>
                                            <p className='mx-auto'>{req.title}</p>
                                        </div>
                                        <div className='flex justify-end'>
                                            <button className='mx-1 mb-2 mt-2 bg-red-500 rounded-full' onClick={() => deletePost(req._id)}><DeleteIcon /></button>
                                            <button className='mx-2 mb-2 mt-2 bg-amber-500 rounded-full'><CreateIcon /></button>
                                        </div>
                                    </div>
                                    {/* <ToastContainer /> */}
                                    {/* </Link> */}
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