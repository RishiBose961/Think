import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { TabTitle } from '../NewTab/GenerateTitle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { format } from 'timeago.js'
import ShareModel from './ShareModel';
import LinearProgress from '@mui/material/LinearProgress';


const PostPage = () => {
  TabTitle("Trend Post - Think")

  const { token } = useContext(AuthContext)
  const { id } = useParams("");
  const [inpval, setinpval] = useState([])
  const [loading,setLoading]=useState(false)
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
    setTimeout(()=>{
      getdata();
      setLoading(true);
    },2000)
  }, [])

  const formatter = new Intl.NumberFormat('en', {
    style: 'decimal',
    useGrouping: true,
    notation: 'compact'
  })

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
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="..."></div>
        {
      loading ?
        <div class="...">
          <div className='bg-amber-400 rounded-xl mb-4'>
            <p className='text-2xl mx-2'>{inpval.title}</p>
          </div>
          <div>
            <img className="h-96 mr-4 mb-2" src={inpval.thumbnail} alt="loading" />
            <p className='lg:mx-2 bg-lime-400'>{inpval.category}</p>
            <p className='text-lg mt-2'>{inpval.description}</p>
          </div>
          <div className='ring-2 mt-10 rounded-xl ring-black'>
            <div className='flex justify-between'>
              <button className='bg-slate-300 w-full rounded-l-xl cursor-default'><ThumbUpIcon color='error'/> {formatter.format(inpval.likes?.length*1000)}</button>
              <ShareModel linku={inpval._id} description={inpval.title}/>
              <button className='hover:bg-slate-300 w-full rounded-r-xl cursor-default'>{format(inpval.createdAt)}</button>
            </div>
          </div>
        </div>:<div className='mt-20'><LinearProgress color='warning' /></div>
    }
        <div class="..."></div>
      </div>
      

    </div>
  )
}

export default PostPage