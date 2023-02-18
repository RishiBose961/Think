import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { TabTitle } from '../NewTab/GenerateTitle';
import axios from 'axios';
import DoneIcon from '@mui/icons-material/Done';

const SearchUser = () => {


    TabTitle('Search - Think')
    const { token, user, dispatch } = useContext(AuthContext)
    const [userProfile, setProfile] = useState(null)

    const { id } = useParams("");
    const [isFollow, setIsFollow] = useState(false);
    const [inpval, setinpval] = useState([])
    const [posts, setposts] = useState([])

    const followUser = () => {
        fetch("/api/auth/follow", {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                followId: id,
            })
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                dispatch({
                    type: "UPDATE", payload: {
                        following: data.following,
                        followers: data.followers
                    }
                });
                localStorage.setItem("user", JSON.stringify(data))
                setProfile((prevState) => {
                    return {
                        ...prevState,
                        user: data
                    }
                })
                setIsFollow(true);
            });
    };


    const unfollowUser = () => {
        fetch("/api/auth/unfollow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                unfollowId: id
            })
        }).then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setIsFollow(false);
            });
    }


    // console.log(user);
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
                if (
                    result.user.followers.includes(
                        JSON.parse(localStorage.getItem("user"))._id
                    )
                ) {
                    setIsFollow(true);
                }
            })
    }, [isFollow])

    return (
        <div>

            
            {/* <button onClick={followUser}>
                unfollow
            </button>
             */}


            {/* {userProfile?.user.followings.length}|
            {userProfile?.user.followers.length} */}

            <div className='flex justify-center mb-3'>
                <img src={inpval.avatar} alt="loading" className='h-48 mt-4 rounded-full' />
            </div>
            <p className='text-center capitalize font-semibold text-xl mb-2'>{inpval.username}</p>
            <hr />
            <div className='grid grid-cols-1 lg:grid-cols-4  gap-4 mt-4'>
                <p className='text-center text-xl'>Total Post : {posts?.length}</p>
                <p className='text-center text-xl'>COMPANY NAME : {inpval.companyname}</p>
                <p className='text-center text-xl'>OFFICAL EMAIL : {inpval.email} </p>
                <button
                className="followBtn"
                onClick={() => {
                    if (isFollow) {
                        unfollowUser(user._id);
                    } else {
                        followUser(user._id);
                    }
                }}
            >
                {isFollow ? <div className='ring-2 rounded-3xl ring-black'>
                    <p>Subscribed<DoneIcon/></p>
                </div>
                 : <div className='ring-2 rounded-3xl ring-black'>
                    <p className='font-bold'>Subscribe</p>
                 </div>}
            </button>
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