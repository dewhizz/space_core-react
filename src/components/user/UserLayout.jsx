
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import DashboardNavbar from '../DashboardNavbar';
const UserLayout = () => {
  return (
    <div className='d-flex'>
        <SideBar/>
        <div className="flex-grow-1">
            <main className='p-4 vh-100'>
              <DashboardNavbar/>
                {/*outlet renders the matched child route's element*/}
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default UserLayout