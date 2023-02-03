import React, { useState } from 'react'
import { TabTitle } from '../NewTab/GenerateTitle'
import Sreading from './Sreading'


const Search = () => {
  TabTitle('Search - Think')
  const [search, setSearch] = useState('')
  const [userSearch, setUserSearch] = useState([])

  const fetchUsers = (query) => {
    setSearch(query)
    fetch('/api/auth/searchuser', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query
      })
    }).then(res => res.json())
      .then(results => {
        setUserSearch(results.user)
      })
  }

  return (
    <div className=''>
      <div className='mt-2 bg-amber-300 rounded-xl'>
        <input
          type="text"
          name='search'
          value={search}
          onChange={(e) => fetchUsers(e.target.value)}
          placeholder='Search What You Think'
          className='text-lg bg-transparent w-full
          text-black focus:outline-none h-16 mx-2' />
      </div>
      <div>
      {
        search.length > 0 ? <Sreading userSearch={userSearch} />:
        <div className='flex justify-center'>
        <p className='mt-3 font-semibold text-[20px]'>Search to Found Think</p>
        </div>
        
      }
       
      </div>
    </div>
  )
}

export default Search