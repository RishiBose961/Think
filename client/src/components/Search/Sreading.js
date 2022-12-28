import * as React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';


export default function Sreading({ userSearch }) {
  return (
    <>
      <ul>
        {
          userSearch.map((row) => {
            return (
              <>
                <li>
                <Link to={`/usersearch/${row._id}`}>
                  <div className='flex justify-start'>
                    <Avatar alt={row.username} src={row.avatar} sx={{ mt: 2 }} />
                    <p className='mt-6 mx-2'>{row.username}</p>
                    <p className='mt-6 mx-2'>{row.email}</p>
                  </div>
                  </Link>
                </li>
              </>
            )
          })
        }
      </ul>
    </>

  );
}