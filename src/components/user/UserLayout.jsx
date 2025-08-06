
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
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