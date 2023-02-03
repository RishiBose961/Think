import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { TabTitle } from '../NewTab/GenerateTitle';

const PostPage = () => {
  TabTitle("Trend Post - Think")

  const { token } = useContext(AuthContext)
  const { id } = useParams("");
  const [inpval, setinpval] = useState([])
  const getdata = async () => {

    const res = await fetch(`/api/auth/getsinglepost/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
    })
    const data = await res.json();
    // console.log(data);
    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setinpval(data);
      // console.log("get data");
    }
  }

  // console.log(inpval);
  useEffect(() => {

    getdata();
  }, [])


  // const unfollowUser = (id) => {
  //   fetch('/api/auth/unfollow', {
  //     method: 'put',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": token
  //     },
  //     body: JSON.stringify({
  //       unfollowId: id
  //     })
  //   }).then(res => res.json())
  //     .then(results => {
  //       const newDatas = inpval.map((items) => {
  //         if (items._id == results._id) {
  //           return results
  //         } else {
  //           return items
  //         }
  //       })
  //       setinpval(newDatas)
  //     }).catch(err => {
  //       console.log(err)
  //     })

  // }

  // console.log(inpval);

  return (
    <div>
      <div className='bg-amber-400 rounded-xl mb-4'>
        <p className='text-2xl mx-2'>{inpval.title}</p>

      </div>
      <div>
        <img className="float-left h-96 mr-4 mb-2" src={inpval.thumbnail} alt="loading" />
        <p className='lg:mx-2 bg-lime-400'>{inpval.category}</p>
        <p className='text-lg mt-2'>{inpval.description} <span className='font-bold bg-slate-300'>{inpval.createdAt}</span></p>
      </div>





      {/* <p className='text-2xl font-bold mt-3'>{inpval.title}</p>
      <div className='flex justify-center'>
        <img src={inpval.thumbnail} className="text-xl rounded-xl" />
      </div>
     
      {/* {inpval.postedBy.followers.includes(user?._id) ?
        <button className='bg-slate-500 w-24 rounded-xl uppercase' onClick={() => { unfollowUser(inpval?.postedBy._id) }}>Subscribe</button>
        : <button className='bg-amber-500 w-24 rounded-xl uppercase' onClick={() => { followUser(inpval?.postedBy._id) }}>Subscribe</button>
      } */}
      {/* <div className='bg-amber-400 mt-2 h-20 pt-6 mx-1 lg:mx-2 rounded-lg flex justify-between'>
        <div>
          
        </div>
        
      </div>
      <div>
        <p className='text-lg font-semibold mx-1 lg:mx-3 mt-2'>{inpval.createdAt}</p>
      </div>  */}
    </div>
  )
}

export default PostPage