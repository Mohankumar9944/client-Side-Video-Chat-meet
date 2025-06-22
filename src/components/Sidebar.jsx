import useAuthUser from '../hooks/useAuthUser';
import { Link, useLocation } from 'react-router-dom';
import { ShipWheelIcon, HomeIcon, UsersIcon, BellIcon } from 'lucide-react';
import '../componentStyles/Sidebar.css';

const Sidebar = () => {
  const {authUser} = useAuthUser();
  const location=useLocation();
  const currentPath = location.pathname;
  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/" className="brand-link">
            <ShipWheelIcon />
            <span>Streamify</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <Link to="/" className={`nav-link ${currentPath === '/' ? 'active' : ''}`}>
            <HomeIcon />
            <span>Home</span>
          </Link>
          <Link to="/notifications" className={`nav-link ${currentPath === '/notifications' ? 'active' : ''}`}>
            <BellIcon />
            <span>Notifications</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="profile-box">
            <img src={authUser?.profilePic} alt={authUser?.fullname} />
            <div className="profile-info">
              <p className="profile-name">{authUser?.fullname}</p>
              <p className="profile-status">
                <span className="status-dot" /> Online
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar