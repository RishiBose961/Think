import React from 'react'
import Lnav from '../HDivider/Lnav'
import Mnav from '../HDivider/Mnav'
import { TabTitle } from '../NewTab/GenerateTitle'


const Home = () => {
  TabTitle('Think Home')
  return (
    <div className='mt-4'>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-center">

        <div className="lg:col-span-2">
            <Mnav />
        </div>
        <div className="">
          <Lnav />
        </div>
      </div>
    </div>

  )
}

export default Home