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

   console.log(userSearch);

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
        <Sreading userSearch={userSearch} />
      </div>
    </div>
  )
}

export default Search