import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div className='d-flex'>
        <SideBar/>
        <div className="flex-grow-1">
            <main className='p-4 vh-100'>
                {/*outlet renders the matched child route's element*/}
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default UserLayout